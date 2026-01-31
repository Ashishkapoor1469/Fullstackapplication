import { useRef, useState } from "react";
import { ImageIcon, Loader, Mic, MicOff, Upload, XCircle } from "lucide-react";
import { useAuth } from "../../context/authContext";
import { API } from "../../auth/auth";
import { useToast } from "../../context/ToastContext";
import { useTranslation } from "react-i18next";

export default function TweetComposer() {
  const { token, loadUser, feedClear } = useAuth();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioType, setAudioType] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioInputRef = useRef(null);
  const imageInputRef = useRef(null);

  /* RECORD AUDIO */
  const toggleRecording = async () => {
    if (recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      setAudioBlob(blob);
      setAudioType("recorded");
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  /* UPLOAD HANDLERS */
  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAudioBlob(file);
    setAudioType("uploaded");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast("Max 5MB allowed", "error");
      return;
    }
    setImageFile(file);
  };

  const cancelAudio = () => {
    if (recording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
    audioChunksRef.current = [];
    setAudioBlob(null);
    setAudioType(null);
  };

  const cancelImage = () => setImageFile(null);

  /* POST TWEET */
  const postTweet = async () => {
    if (!title && !text && !audioBlob && !imageFile) return;

    setLoading(true);

    try {
      setUploadProgress(1);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", text);
      if (audioBlob) formData.append("audio", audioBlob);
      if (imageFile) formData.append("image", imageFile);

      const endpoint = audioBlob
        ? `${API}/api/tweet/create`
        : `${API}/api/tweet/post`;

      const xhr = new XMLHttpRequest();
      xhr.open("POST", endpoint);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress(Math.round((e.loaded / e.total) * 100));
        }
      };

      // ✅ FIX: async added here
      xhr.onload = async () => {
        setUploadProgress(0);

        try {
          const res = JSON.parse(xhr.responseText);

          if (res.success) {
            showToast(res.message || "Post created successfully", "success");

            // 🔄 refresh user profile
            feedClear();
            await loadUser();
          } else {
            showToast(
              res.message || "Failed to post only post image less than",
              "error",
            );
          }
        } catch {
          showToast("Unexpected server response", "error");
        }

        setTitle("");
        setText("");
        setAudioBlob(null);
        setAudioType(null);
        setImageFile(null);
      };

      xhr.onerror = () => {
        showToast("Upload failed", "error");
        setUploadProgress(0);
      };

      xhr.send(formData);
    } catch (err) {
      console.error(err);
      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-b border-gray-800">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-black text-white border-b border-neutral-900 mb-1 px-2 py-1 outline-none"
        placeholder={t("home.titlePlaceholder")}
      />

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-black resize-none outline-none text-lg px-2 py-1"
        placeholder={t("home.whatHappening")}
      />

      {uploadProgress > 0 && (
        <p className="text-sm text-blue-400">Uploading: {uploadProgress}%</p>
      )}

      <div className="flex gap-4 mt-2 items-center">
        <button onClick={() => imageInputRef.current.click()}>
          <ImageIcon />
        </button>
        <input
          ref={imageInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />

        <button onClick={toggleRecording}>
          {recording ? (
            <MicOff className="text-red-500 animate-pulse" />
          ) : (
            <Mic />
          )}
        </button>

        <button onClick={() => audioInputRef.current.click()}>
          <Upload />
        </button>
        <input
          ref={audioInputRef}
          type="file"
          hidden
          accept="audio/*"
          onChange={handleAudioUpload}
        />

        {(audioBlob || imageFile) && (
          <button
            onClick={() => {
              cancelAudio();
              cancelImage();
            }}
          >
            <XCircle className="text-yellow-400" />
          </button>
        )}
      </div>

      <div className="flex justify-end mt-2">
        <button
          disabled={loading}
          onClick={postTweet}
          className="bg-[#1DA1F2] px-4 py-1 rounded-full font-bold flex items-center gap-2"
        >
          {loading ? (
            <Loader className="animate-spin w-4 h-4" />
          ) : (
            t("common.post")
          )}
        </button>
      </div>
    </div>
  );
}
