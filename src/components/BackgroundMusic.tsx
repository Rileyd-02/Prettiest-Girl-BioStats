
import React, { useEffect, useRef, useState } from 'react';
import { Music, VolumeX, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BackgroundMusicProps {
  songUrl: string;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ songUrl }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

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

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg">
      <audio ref={audioRef} src={songUrl} loop />
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={togglePlay}
        className="rounded-full w-8 h-8"
      >
        <Music className={`h-4 w-4 ${isPlaying ? 'text-primary' : 'text-gray-400'}`} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="rounded-full w-8 h-8"
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4 text-gray-400" />
        ) : (
          <Volume2 className="h-4 w-4 text-primary" />
        )}
      </Button>
    </div>
  );
};

export default BackgroundMusic;
