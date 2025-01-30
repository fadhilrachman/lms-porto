import React from "react";
import YouTube from "react-youtube";

const getVideoId = (url: string) => {
  const urlObj = new URL(url);
  return urlObj.searchParams.get("v"); // Ambil parameter `v` dari URL
};

export default function VideoRender({ url }: { url: string }) {
  const videoId = getVideoId(url);

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 0, // Aktifkan autoplay (opsional)
    },
  };

  return videoId ? (
    <YouTube opts={opts} videoId={videoId} onEnd={() => {}} />
  ) : (
    <p>Invalid YouTube URL</p>
  );
}
