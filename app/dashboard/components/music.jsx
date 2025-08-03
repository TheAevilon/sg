'use client';

import { useState } from 'react';

export default function BandcampEmbed() {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className="p-9">
      {!showPlayer ? (
        <button
          onClick={() => setShowPlayer(true)}
          className="px-4 py-2 rounded border border-white hover:text-black hover:bg-white transition duration-200 cursor-pointer text-white"
        >
          Load Music
        </button>
      ) : (
        <iframe
          width="300"
          height="225"
          src="https://bandcamp.com/EmbeddedPlayer/album=2928402265/size=large/bgcol=333333/linkcol=0f91ff/artwork=small/transparent=true/"
          seamless
          style={{ border: '0' }}
        >
          <a href="https://bltx.bandcamp.com/album/royalty-free-lo-fi-music-pack-1">
            Royalty Free Lo-fi Music Pack 1 by BLTX
          </a>
        </iframe>
      )}
    </div>
  );
}
