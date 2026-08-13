'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';

const BASE = 'https://res.cloudinary.com/dneuyu9wi/video/upload';
const ASSET = 'v1786509797/deal-origination_z4hegb';

/* Frame at 20s: a clean, mouth-closed portrait. */
const poster = (w: number) => `${BASE}/so_20,f_auto,q_auto,w_${w}/${ASSET}.jpg`;

const POSTER = poster(1280);
const POSTER_SRCSET = [640, 960, 1280, 1600]
  .map((w) => `${poster(w)} ${w}w`)
  .join(', ');

/* ~2.8 MB VP9 / ~4.8 MB H.264, down from 527 MB. */
const WEBM = `${BASE}/vc_vp9,q_auto:eco,w_1280/${ASSET}.webm`;
const MP4 = `${BASE}/vc_h264,q_auto:eco,w_1280/${ASSET}.mp4`;

export function HeroVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className='mx-auto mt-12 w-full max-w-3xl'>
      <div className='relative aspect-video w-full overflow-hidden bg-secondary/10 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)] ring-1 ring-secondary/15'>
        {playing ? (
          <video
            className='h-full w-full object-cover'
            poster={POSTER}
            controls
            autoPlay
            playsInline
            preload='auto'
          >
            <source src={WEBM} type='video/webm' />
            <source src={MP4} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ) : (
          <button
            type='button'
            onClick={() => setPlaying(true)}
            aria-label='Play video: Buy side deal origination by Blackmont Advisory'
            className='group absolute inset-0 h-full w-full cursor-pointer'
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={POSTER}
              srcSet={POSTER_SRCSET}
              sizes='(min-width: 768px) 768px, 100vw'
              alt=''
              width={1280}
              height={720}
              decoding='async'
              className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]'
            />

            <span
              aria-hidden
              className='absolute inset-0 bg-secondary/25 transition-colors duration-300 group-hover:bg-secondary/15'
            />

            <span
              aria-hidden
              className='absolute inset-0 grid place-items-center'
            >
              <span className='grid h-16 w-16 place-items-center bg-accent shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20'>
                <Play className='h-6 w-6 fill-primary text-primary sm:h-7 sm:w-7' />
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
