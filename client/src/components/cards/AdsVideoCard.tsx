'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import playVideoIcon from '@/public/assets/images/play-video-icon.svg?url';
import { Button } from '../ui/button';

function AdsDetailVideo({
  className,
  onClose,
}: {
  className?: string;
  onClose: () => void;
}) {
  return (
    <div className={`bg-[rgba(14,16,22,.85)] fixed inset-0 z-10 ${className}`}>
      <div className='rounded-t-lg md:rounded-b-lg md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[640px] md:inset-auto fixed bottom-0 left-0 flex max-h-dvh w-full flex-col justify-between bg-background'>
        {/* Header */}
        <div className="relative mx-6 mt-4 flex justify-center px-10 pb-5 pt-2 text-center after:border after:border-border after:absolute after:bottom-0 after:border-b after:content-[''] after:inset-x-0">
          <h2 className=''>Which MacBook processor should I choose?</h2>
          <Button
            size='icon'
            className='hover:bg-icon-button-hover bg-transparent dark:hover:bg-gray-700 transition-colors ease-in absolute right-0 top-0'
            onClick={onClose}
          >
            <Image
              src='/assets/images/x-icon.svg'
              alt='Close Button'
              width={24}
              height={24}
              className='dark:invert'
            />
          </Button>
        </div>

        {/* Video */}
        <div className='grow p-6 scrollbar-none'>
          <video
            className='m-auto block w-full aspect-square mb-6'
            autoPlay
            controls
            poster='https://images.ctfassets.net/mmeshd7gafk1/3SUpjp1sdBFmbwGgsEuagN/920b70b98155f3eed3a1197faf27332e/Myths_about_your_tech_-_Thumbnail_-_US.jpg'
            preload='none'
          >
            <source
              src='https://videos.ctfassets.net/mmeshd7gafk1/4485chiQjBtxRPdrtKZBzO/b3174bb047d70a1a9b2f7f34a1e2946d/Vertical_EN_Myths-mobile.mp4'
              type='video/mp4'
            />
          </video>
        </div>
      </div>
    </div>
  );
}

function AdsVideoCard({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetailVideo, setShowDetailVideo] = useState(false);

  const handleMouseEnter = async () => {
    if (videoRef.current) {
      try {
        // Wait for any pending play promise to resolve
        if (playPromiseRef.current) {
          await playPromiseRef.current;
        }

        playPromiseRef.current = videoRef.current.play();
        await playPromiseRef.current;
        setIsPlaying(true);
      } catch (error) {
        // Handle play interruption gracefully
        console.log('Play interrupted:', error);
      }
    }
  };

  const handleMouseLeave = async () => {
    if (videoRef.current) {
      try {
        // Wait for any pending play promise to resolve before pausing
        if (playPromiseRef.current) {
          await playPromiseRef.current;
        }

        videoRef.current.pause();
        setIsPlaying(false);
      } catch (error) {
        // Handle any errors gracefully
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleShowDetailVideo = () => {
    setShowDetailVideo(true);
  };

  const handleCloseDetailVideo = () => {
    setShowDetailVideo(false);
  };

  return (
    <>
      <div className={` h-full ${className} `}>
        <div
          className='relative rounded-lg overflow-hidden w-full h-full cursor-pointer'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleShowDetailVideo}
        >
          <div
            className={`bg-background-secondary rounded-full absolute left-1/2 top-1/2 content-center size-15 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
              isPlaying ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Image
              src={playVideoIcon}
              alt='Play Video'
              width={40}
              height={40}
              className='dark:invert'
            />
          </div>
          <video
            ref={videoRef}
            className='m-auto block rounded-lg h-full w-full object-cover'
            loop
            muted
            poster='https://images.ctfassets.net/mmeshd7gafk1/3SUpjp1sdBFmbwGgsEuagN/920b70b98155f3eed3a1197faf27332e/Myths_about_your_tech_-_Thumbnail_-_US.jpg'
            preload='none'
          >
            <source
              src='https://videos.ctfassets.net/mmeshd7gafk1/4485chiQjBtxRPdrtKZBzO/b3174bb047d70a1a9b2f7f34a1e2946d/Vertical_EN_Myths-mobile.mp4'
              type='video/mp4'
            />
          </video>
        </div>
      </div>

      {showDetailVideo &&
        createPortal(
          <AdsDetailVideo onClose={handleCloseDetailVideo} />,
          document.body,
        )}
    </>
  );
}

export default AdsVideoCard;
