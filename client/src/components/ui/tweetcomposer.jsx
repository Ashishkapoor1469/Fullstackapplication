import { useRef, useState } from "react";
import { ImageIcon, Mic, MicOff, Upload, XCircle } from "lucide-react";
import { useAuth } from "../../context/authContext";
import { API } from "../../auth/auth";
import { useToast } from "../../context/ToastContext";

export default function TweetComposer() {
  const { token } = useAuth();
  const { showToast } = useToast();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  /* AUDIO STATE */
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioType, setAudioType] = useState(null);

  /* IMAGE STATE */
  const [imageFile, setImageFile] = useState(null);

  /* UPLOAD STATE */
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

  /* AUDIO UPLOAD */
  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAudioBlob(file);
    setAudioType("uploaded");
  };

  /* IMAGE UPLOAD */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
  };

  /* CANCEL MEDIA */
  const cancelAudio = () => {
    if (recording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
    audioChunksRef.current = [];
    setAudioBlob(null);
    setAudioType(null);
  };

  const cancelImage = () => {
    setImageFile(null);
  };

  /* POST TWEET */
  const postTweet = async () => {
    if (!title && !text && !audioBlob && !imageFile) return;

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

      xhr.onload = () => {
        setUploadProgress(0);

        try {
          const res = JSON.parse(xhr.responseText);
          if (res.success) {
            showToast(res.message || "Post created successfully", "success");
          } else {
            showToast(res.message || "Failed to post", "error");
          }
        } catch (err) {
          showToast("Unexpected server response", "error");
        }

        // Reset state
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
      setUploadProgress(0);
    }
  };

  return (
    <div className="p-4 border-b border-gray-800">
      {/* TITLE INPUT */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-black text-white border-b border-neutral-900 mb-1 px-2 py-1 outline-none"
        placeholder="Title"
      />

      {/* CONTENT TEXTAREA */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-black resize-none outline-none text-lg px-2 py-1"
        placeholder="What is happening?"
      />

      {/* Upload Progress */}
      {uploadProgress > 0 && (
        <p className="text-sm text-blue-400 mt-1">
          Uploading: {uploadProgress}%
        </p>
      )}

      {/* SHOW AUDIO/IMAGE ONLY IF text OR title is empty */}
     {/* MEDIA BUTTONS: always visible */}
<div className="flex px-3 justify-between items-center mt-2">
  <div className="flex gap-4 items-center">
    {/* IMAGE */}
    <button onClick={() => imageInputRef.current.click()}>
      <ImageIcon />
    </button>
    <input
      ref={imageInputRef}
      type="file"
      accept="image/*"
      hidden
      onChange={handleImageUpload}
    />

    {/* RECORD AUDIO */}
    <button onClick={toggleRecording}>
      {recording ? (
        <MicOff className="text-red-500 animate-pulse" />
      ) : (
        <Mic />
      )}
    </button>

    {/* AUDIO UPLOAD */}
    <button onClick={() => audioInputRef.current.click()}>
      <Upload />
    </button>
    <input
      ref={audioInputRef}
      type="file"
      accept="audio/*"
      hidden
      onChange={handleAudioUpload}
    />

    {/* CANCEL MEDIA */}
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

    {/* STATUS */}
    {audioType && (
      <span className="text-green-500 text-sm">
        🎵 {audioType === "recorded" ? "Recorded audio" : "Uploaded audio"}
      </span>
    )}
    {imageFile && (
      <span className="text-blue-400 text-sm">🖼 Image added</span>
    )}
  </div>
</div>

{/* Upload Progress: only show if audio or image is being uploaded */}
{uploadProgress > 0 && (audioBlob || imageFile) && (
  <p className="text-sm text-blue-400 mt-1">
    Uploading: {uploadProgress}%
  </p>
)}


      <div className="flex justify-end mt-2">
        <button
          onClick={postTweet}
          className="bg-[#1DA1F2] px-4 py-1 rounded-full font-bold"
        >
          Post
        </button>
      </div>
    </div>
  );
}
