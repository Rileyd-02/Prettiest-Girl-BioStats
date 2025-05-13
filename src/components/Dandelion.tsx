
import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DandelionProps {
  onWishMade: () => void;
}

const Dandelion: React.FC<DandelionProps> = ({ onWishMade }) => {
  const [seeds, setSeeds] = useState<Array<{ id: number, x: number, y: number, r: number }>>([]);
  const [isBlown, setIsBlown] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showWishText, setShowWishText] = useState(false);
  const dandelionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Show prompt after a short delay
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleTap = () => {
    if (isBlown) return;
    
    setIsBlown(true);
    setShowPrompt(false);
    
    // Generate 20 seeds with random directions
    const seedCount = isMobile ? 12 : 20;
    const newSeeds = Array.from({ length: seedCount }, (_, i) => ({
      id: i,
      x: Math.random() * 300 - 150, // Random x between -150 and 150
      y: -Math.random() * 200 - 50,  // Random y upward and to the sides
      r: Math.random() * 360          // Random rotation
    }));
    
    setSeeds(newSeeds);
    
    // Show wish text after seeds start flying
    setTimeout(() => {
      setShowWishText(true);
    }, 500);

    // Proceed to next step after animation
    setTimeout(() => {
      onWishMade();
    }, 4500);
  };

  const svgSize = isMobile ? 150 : 180;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center nyc-background p-4 sm:p-6 relative overflow-hidden">
      <div className="text-center mb-6 sm:mb-8 z-10">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6 animate-fadeIn" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
          Make a Wish
        </h1>
        
        {showPrompt && !isBlown && (
          <p className="text-base sm:text-lg md:text-xl text-white opacity-0 animate-fadeIn" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
            Tap the dandelion
          </p>
        )}
        {showWishText && (
          <div className="opacity-0 animate-fadeIn" style={{animationDelay: '1s', animationFillMode: 'forwards'}}>
            <p className="text-xl sm:text-2xl md:text-3xl text-white font-bold mb-2 sm:mb-3">
              Wish made!
            </p>
            <p className="text-base sm:text-lg text-white">
              May it come true...
            </p>
          </div>
        )}
      </div>
      
      <div 
        ref={dandelionRef}
        className={`relative cursor-pointer ${isBlown ? '' : 'animate-float'}`} 
        onClick={handleTap}
      >
        <svg width={svgSize} height={svgSize} viewBox="0 0 100 100" className={isBlown ? 'opacity-50' : ''}>
          {/* Stem */}
          <line x1="50" y1="90" x2="50" y2="60" stroke="green" strokeWidth="2" />
          
          {/* Dandelion center */}
          <circle cx="50" cy="50" r="8" fill="#f0f0f0" />
          
          {/* Dandelion seeds/fluff */}
          {!isBlown && Array.from({ length: isMobile ? 12 : 18 }).map((_, i) => {
            const angle = (i * (isMobile ? 30 : 20)) * Math.PI / 180;
            const x2 = 50 + Math.cos(angle) * 30;
            const y2 = 50 + Math.sin(angle) * 30;
            
            return (
              <g key={i}>
                <line 
                  x1="50" 
                  y1="50" 
                  x2={x2} 
                  y2={y2} 
                  stroke="white" 
                  strokeWidth="1" 
                />
                <circle 
                  cx={x2} 
                  cy={y2} 
                  r="3" 
                  fill="white" 
                />
              </g>
            );
          })}
        </svg>
        
        {/* Flying seeds animation */}
        {seeds.map((seed) => (
          <div
            key={seed.id}
            className="dandelion-seed"
            style={{
              '--x': `${seed.x}px`,
              '--y': `${seed.y}px`,
              '--r': `${seed.r}deg`,
              animation: 'float-seed 4s ease-out forwards',
              animationDelay: `${Math.random() * 0.5}s`,
              top: '50px',
              left: '50px',
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
};

export default Dandelion;
