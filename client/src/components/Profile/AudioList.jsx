import AudioPlayer from "./AudioPlayer";

export default function AudioList({ audios }) {
  if (!audios.length) {
    return (
      <p className="text-center text-gray-500 py-10">No audio posts yet</p>
    );
  }

  return (
    <>
      {audios.map((audio) => (
        <div
          key={audio._id}
          className="p-4 border-b border-gray-800 hover:bg-gray-900 transition"
        >
          <p className="text-sm mb-2">{audio.text || "Audio post"}</p>

          <AudioPlayer src={audio.audioUrl} />

          <p className="text-xs text-gray-500 mt-2">
            {new Date(audio.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </>
  );
}
