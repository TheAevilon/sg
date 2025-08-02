'use client';

import React, { useRef, useEffect } from "react";
import YouTube from "react-youtube";
import { useSettings } from "./settingsContext";

export default function LofiBackground() {
  const { audio, video, volume, source, pictureURL } = useSettings(); // volume ∈ [0, 1]
  const playerRef = useRef(null);
  const videoId = video || "hxkuVG2GmSM";

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    event.target.setLoop(true); // YouTube will loop if playlist is also set
    event.target.playVideo();

    const scaledVolume = Math.round((volume ?? 0.5) * 100);
    event.target.setVolume(scaledVolume);

    if (!audio) {
      event.target.mute();
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      audio ? playerRef.current.unMute() : playerRef.current.mute();
    }
  }, [audio]);

  useEffect(() => {
    if (playerRef.current && typeof volume === 'number') {
      const scaledVolume = Math.round(volume * 100);
      playerRef.current.setVolume(scaledVolume);
    }
  }, [volume]);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      playlist: videoId,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      disablekb: 1,
    },
  };
  if (source === 'youtube') {


    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className="bg-yt"
        >
          <YouTube
            videoId={videoId}
            key={videoId}
            opts={opts}
            onReady={onPlayerReady}
            className="w-full h-full"
          />
        </div>
      </div>
    );
  }


  console.log(pictureURL)
  if (source === 'picture') {
    return (
      <div
        className="fixed inset-0 -z-10 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('${pictureURL}')`,
        }}
      >
      </div>
    );
  }
}
