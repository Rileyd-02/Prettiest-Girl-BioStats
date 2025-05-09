
import React, { useEffect, useState } from 'react';
import { Flower } from 'lucide-react';

interface GreetingProps {
  onContinue: () => void;
}

const Greeting: React.FC<GreetingProps> = ({ onContinue }) => {
  const [flowers, setFlowers] = useState<Array<{id: number, x: number, y: number, size: number, delay: number, duration: number}>>([]);
  
  useEffect(() => {
    // Create 20 falling flowers with random positions and sizes
    const newFlowers = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random x position (percent)
      y: -10 - (Math.random() * 20), // Start above the screen with variation
      size: 16 + Math.random() * 16, // Random size between 16px and 32px
      delay: Math.random() * 3, // Random delay between 0-3s
      duration: 5 + Math.random() * 5 // Animation duration between 5-10s
    }));
    
    setFlowers(newFlowers);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative overflow-hidden">
      {/* Purple sunset background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-purple-700 to-pink-500 z-0"></div>
      
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/20 z-1"></div>
      
      {/* Falling flowers */}
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute pointer-events-none"
          style={{
            left: `${flower.x}%`,
            top: `${flower.y}%`,
            animation: `fall ${flower.duration}s linear infinite`,
            animationDelay: `${flower.delay}s`,
            zIndex: 5
          }}
        >
          <Flower 
            size={flower.size} 
            className="text-secondary/80" 
            style={{ 
              animation: `spin ${flower.duration / 2}s ease-in-out infinite alternate`,
              animationDelay: `${flower.delay}s`
            }} 
          />
        </div>
      ))}
      
      <div 
        className="opacity-0 animate-fadeIn z-10" 
        style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 italic">
          To the prettiest graduate in biostats
        </h1>
        
        <button 
          onClick={onContinue}
          className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all shadow-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Greeting;
