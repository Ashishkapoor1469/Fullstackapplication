import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export default function AudioPlayer({ src }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoaded = () => {
    setDuration(audioRef.current.duration || 0);
  };

  const formatTime = (time = 0) => {
    if (!time || isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full bg-neutral-900 rounded-xl p-4 border border-neutral-800">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoaded}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-4">
        {/* PLAY BUTTON */}
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-[#1DA1F2] flex items-center justify-center hover:scale-105 transition"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        {/* PROGRESS */}
        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            step="0.01"
            onChange={(e) => {
              const value = Number(e.target.value);
              audioRef.current.currentTime = value;
              setCurrentTime(value);
            }}
            className="w-full accent-[#1DA1F2] cursor-pointer"
          />

          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
