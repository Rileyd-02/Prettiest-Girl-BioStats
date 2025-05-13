
import React, { useEffect, useRef, useState } from 'react';
import { Music, VolumeX, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface BackgroundMusicProps {
  songUrl: string;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ songUrl }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (audioRef.current) {
      // Attempt to autoplay (may be blocked by browser)
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(error => {
            // Autoplay was prevented, need user interaction
            console.log('Autoplay prevented:', error);
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const buttonSize = isMobile ? "w-7 h-7" : "w-8 h-8";
  const iconSize = isMobile ? "h-3 w-3" : "h-4 w-4";

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 flex items-center gap-1 sm:gap-2 bg-white/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-lg">
      <audio ref={audioRef} src={songUrl} loop />
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={togglePlay}
        className={`rounded-full ${buttonSize}`}
      >
        <Music className={`${iconSize} ${isPlaying ? 'text-primary' : 'text-gray-400'}`} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className={`rounded-full ${buttonSize}`}
      >
        {isMuted ? (
          <VolumeX className={`${iconSize} text-gray-400`} />
        ) : (
          <Volume2 className={`${iconSize} text-primary`} />
        )}
      </Button>
    </div>
  );
};

export default BackgroundMusic;
