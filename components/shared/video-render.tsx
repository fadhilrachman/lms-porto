import React from "react";
import YouTube from "react-youtube";

const getVideoId = (url: string) => {
  const urlObj = new URL(url);

  return urlObj.searchParams.get("v"); // Ambil parameter `v` dari URL
};

export default function VideoRender({ url }: { url: string }) {
  const videoId = getVideoId(url);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1, // Aktifkan autoplay (opsional)
    },
  };

  return videoId ? (
    <YouTube
      opts={opts}
      style={{ position: "relative", width: "100%" }}
      videoId={videoId}
      onEnd={() => {
        console.log("cuyyyyyyy");
      }}
    />
  ) : (
    <p>Invalid YouTube URL</p>
  );
}
