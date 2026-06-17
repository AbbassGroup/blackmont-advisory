'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { ScrollIndicator } from '@/components/global/scroll-indicator';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [hover, setHover] = useState(false);

  const handlePlayClick = () => {
    if (!videoRef.current) return;

    // Automatically unmute if it's the first time playing via click
    if (!playing && videoRef.current.muted) {
      videoRef.current.muted = false;
      setMuted(false);
    }

    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <section className='relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] text-white pt-[120px] pb-[80px] lg:pt-[80px] lg:pb-0'>
      {/* Decorative Floating Shapes */}
      <div className='absolute w-[350px] h-[350px] rounded-full bg-brand-primary opacity-15 blur-3xl animate-pulse top-[5%] left-[5%] pointer-events-none' />
      <div className='absolute w-[200px] h-[200px] rounded-full bg-red-500 opacity-15 blur-3xl animate-pulse bottom-[10%] right-[10%] pointer-events-none' />

      <div className='max-w-[1400px] mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10'>
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className='flex-1 max-w-[650px] text-center lg:text-left'
        >
          <h1 className='text-4xl md:text-5xl xl:text-6xl font-extrabold leading-[1.15] tracking-tight mb-6'>
            Your Initial Consultation with ABBASS Business Brokers
          </h1>
          <p className='text-lg md:text-xl text-gray-300 leading-relaxed max-w-[550px] mx-auto lg:mx-0'>
            Thank you for scheduling your consultation. This page outlines what
            you can expect during the meeting, how to prepare, and the next
            steps in our process.
          </p>
        </motion.div>

        {/* Right Content - Video */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className='flex-1 w-full max-w-[700px] flex justify-center'
        >
          <div
            className='relative w-full rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] group transition-transform duration-500 hover:scale-[1.02] cursor-pointer bg-black/50 aspect-video'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handlePlayClick}
          >
            <video
              ref={videoRef}
              poster='/businessbrokers/abbass-intro-bg.webp'
              className='w-full h-full object-cover'
              preload='metadata'
              playsInline
            >
              <source
                src='/businessbrokers/abbass-intro.mp4'
                type='video/mp4'
              />
              Your browser does not support the video tag.
            </video>

            {/* Huge Play Button Overlay */}
            {!playing && (
              <motion.div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center z-20'>
                <div className='w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg pl-1'>
                  <Play
                    className='w-6 h-6 text-brand-black'
                    fill='currentColor'
                  />
                </div>
              </motion.div>
            )}

            {/* Bottom Controls */}
            <div
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 transition-opacity duration-300 z-30 ${
                hover || !playing ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <button
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayClick();
                }}
                className='w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors'
              >
                {playing ? (
                  <Pause className='w-4 h-4' fill='currentColor' />
                ) : (
                  <Play className='w-4 h-4 pl-0.5' fill='currentColor' />
                )}
              </button>
              <button
                type='button'
                onClick={toggleMute}
                className='w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors'
              >
                {muted ? (
                  <VolumeX className='w-4 h-4' />
                ) : (
                  <Volume2 className='w-4 h-4' />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
