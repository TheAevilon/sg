'use client';

import { useEffect, useRef } from "react";
import { useAudio } from "./AudioContext";

export default function LofiBackground() {
  const { audio } = useAudio();
  const playerRef = useRef(null);
  const ytPlayer = useRef(null);
  const videoId = "hxkuVG2GmSM";

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = createPlayer;
      document.body.appendChild(tag);
    }

    function createPlayer() {
      if (!playerRef.current) return;

      ytPlayer.current = new window.YT.Player(playerRef.current, {
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: videoId,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          disablekb: 1,
          className: "w-full h-full"
        },
        events: {
          onReady: (event) => {
            event.target.mute();
            event.target.playVideo();
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    if (ytPlayer.current && ytPlayer.current.mute) {
      audio ? ytPlayer.current.unMute() : ytPlayer.current.mute();
    }
  }, [audio]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div ref={playerRef} className="absolute top-0 left-0 w-full h-[120vh] scale-125 pointer-events-none"
        style={{
          transform: "translateY(-10vh)",
        }} />
    </div>
  );
}
