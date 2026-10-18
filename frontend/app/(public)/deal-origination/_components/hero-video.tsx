'use client';

import { useEffect, useRef, useState } from 'react';
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
  const playerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (playing) playerRef.current?.focus({ preventScroll: true });
  }, [playing]);

  return (
    <div className='w-full min-w-0'>
      <div className='relative aspect-video w-full overflow-hidden border border-advisory-rule bg-midnight'>
        {playing ? (
          <video
            ref={playerRef}
            aria-label='Buy side deal origination by Blackmont Advisory'
            tabIndex={0}
            className='h-full w-full object-contain focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'
            poster={POSTER}
            controls
            autoPlay
            playsInline
            preload='metadata'
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
            className='group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gilt'
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={POSTER}
              srcSet={POSTER_SRCSET}
              sizes='(max-width: 680px) calc(100vw - 38px), (max-width: 930px) calc(100vw - 72px), (max-width: 1444px) 52vw, 730px'
              alt=''
              width={1280}
              height={720}
              decoding='async'
              fetchPriority='high'
              className='h-full w-full object-cover transition-transform duration-[900ms] ease-out motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none'
            />

            <span
              aria-hidden
              className='absolute inset-0 bg-midnight/20 transition-colors duration-200 group-hover:bg-midnight/10 motion-reduce:transition-none'
            />

            <span
              aria-hidden
              className='absolute inset-0 grid place-items-center'
            >
              <span className='inline-flex min-h-[51px] items-center justify-center gap-3 border border-gilt bg-gilt px-5 py-3 font-advisory-body text-sm leading-[1.45] font-bold text-midnight transition-colors duration-200 group-hover:bg-white group-focus-visible:bg-white motion-reduce:transition-none'>
                <Play className='size-[18px] fill-current' />
                Watch the video
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
