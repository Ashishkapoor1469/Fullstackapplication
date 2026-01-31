import { useState } from "react";
import { Camera } from "lucide-react";
import { useAuth } from "../../context/authContext";
import { PostUser } from "../../auth/auth";
import { useToast } from "../../context/ToastContext";

export default function EditProfile() {
  const { user, token, setUser } = useAuth();
  const { showToast } = useToast();

  const [fullname, setFullname] = useState(user?.fullname || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState("");
  const [preview, setPreview] = useState(user?.avatar.url || user.avatar);
  const [imageUploading, setImageUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  /* IMAGE → COMPRESSED BASE64 */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("Max 5MB allowed", "error");
      return;
    }

    setImageUploading(true);

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Resize to max 800x800
      const MAX_SIZE = 800;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_SIZE) {
          height = (height * MAX_SIZE) / width;
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width = (width * MAX_SIZE) / height;
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Compress to 70% quality JPEG
      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

      setAvatar(compressedBase64);
      setPreview(compressedBase64);
      setImageUploading(false);
    };

    img.onerror = () => {
      showToast("Image processing failed", "error");
      setImageUploading(false);
    };

    reader.onerror = () => {
      showToast("Image upload failed", "error");
      setImageUploading(false);
    };

    reader.readAsDataURL(file);
  };

  /* UPDATE PROFILE */
  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await PostUser(
        "user/update",
        { fullname, bio, avatar },
        token,
      );

      setUser(res.updatedUser);
      showToast(res.message || "Profile updated successfully", "success");
    } catch (err) {
      console.error(err);
      showToast(`Profile update failed`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-gray-800 px-4 py-3">
        <h2 className="text-lg font-bold">Edit profile</h2>
      </div>

      <div className="max-w-xl mx-auto px-4 py-6">
        {/* Avatar */}
        <div className="relative w-28 h-28 mb-6">
          <img
            src={preview || "/avatar.png"}
            alt="avatar"
            className={`w-full h-full rounded-full object-cover border-4 border-black ${
              imageUploading ? "opacity-50" : ""
            }`}
          />

          {imageUploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60">
              <span className="text-xs text-white animate-pulse">
                Uploading...
              </span>
            </div>
          )}

          <label className="absolute bottom-1 right-1 bg-black/80 p-2 rounded-full cursor-pointer border border-gray-700 hover:bg-gray-900">
            <Camera size={16} />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              disabled={imageUploading}
            />
          </label>
        </div>

        {/* Full Name */}
        <div className="mb-5">
          <label className="text-xs text-gray-500 mb-1 block">Name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded px-3 py-3 focus:outline-none focus:border-[#1DA1F2]"
          />
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label className="text-xs text-gray-500 mb-1 block">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={160}
            rows={3}
            className="w-full bg-black border border-gray-700 rounded px-3 py-3 resize-none focus:outline-none focus:border-[#1DA1F2]"
          />
          <p className="text-right text-xs text-gray-500 mt-1">
            {bio.length} / 160
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full bg-[#1DA1F2] hover:bg-[#1A8CD8] transition text-black font-bold py-3 rounded-full disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}