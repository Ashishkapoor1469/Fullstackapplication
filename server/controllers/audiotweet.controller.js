import AudioTweet from "../models/audioModel.js";

export const createTweet = async (req, res) => {
  try {
    const text = req.body.text || "";
    let audioUrl = "";

    // If an audio file exists, use it
    if (req.file) {
      audioUrl = req.file.path;
    }

    const tweet = await AudioTweet.create({
      user: req.userId,
      text,
      audioUrl, // will be empty string if no audio
    });

    res.status(201).json({
      success: true,
      tweet,
    });
  } catch (error) {
    console.error("Audio Tweet Error:", error);
    res.status(500).json({
      success: false,
      message: "Audio upload failed",
    });
  }
};

