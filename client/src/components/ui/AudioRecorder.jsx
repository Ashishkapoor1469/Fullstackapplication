import { useRef, useState } from "react";

export default function AudioRecorder({ setAudio }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    chunks.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(chunks.current, { type: "audio/webm" });
      setAudio(audioBlob);
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div>
      {!recording ? (
        <button onClick={startRecording}>🎙 Start Recording</button>
      ) : (
        <button onClick={stopRecording}>⏹ Stop Recording</button>
      )}
    </div>
  );
}
