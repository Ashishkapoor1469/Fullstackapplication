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
          <div className="flex justify-between">
            <p className="text-sm mb-2">{audio.text || "Audio Created by"}</p>
             <p className="text-xs text-gray-500 mt-2">
           {audio?.createdAt
                ? new Date(audio.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "no data"}
          </p>
          </div>

         <p className="text-sm mb-2">{audio.content || "Audio Content"}</p>
          <AudioPlayer src={audio.audioUrl} />

         
        </div>
      ))}
    </>
  );
}
