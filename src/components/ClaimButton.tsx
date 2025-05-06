
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Confetti, Flower } from 'lucide-react';

interface ClaimButtonProps {
  date: string;
  onReset: () => void;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({ date, onReset }) => {
  const [claimed, setClaimed] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number, x: number, y: number, color: string, size: number }>>([]);
  
  const handleClaim = () => {
    setClaimed(true);
    // Create confetti effect
    const newConfetti = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random x position (%)
      y: Math.random() * 100, // Random y position (%)
      color: ['#9333ea', '#e879f9', '#c084fc', '#d8b4fe', '#f0abfc'][Math.floor(Math.random() * 5)],
      size: Math.random() * 10 + 5
    }));
    setConfetti(newConfetti);
  };

  useEffect(() => {
    if (claimed) {
      const timer = setTimeout(() => {
        // Clear confetti after 5 seconds
        setConfetti([]);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [claimed]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 relative overflow-hidden">
      {/* Confetti elements */}
      {confetti.map((item) => (
        <div
          key={item.id}
          className="absolute animate-fadeIn"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            backgroundColor: item.color,
            width: `${item.size}px`,
            height: `${item.size}px`,
            borderRadius: '50%',
            opacity: claimed ? 1 : 0,
            transition: 'opacity 0.5s',
            zIndex: 10,
          }}
        />
      ))}
      
      <div className="text-center z-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {claimed ? "It's a date! 💕" : "Claim Your Date"}
        </h2>
        
        <Card className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg max-w-md mx-auto mb-8">
          <p className="text-xl text-center mb-8">
            {claimed
              ? "I can't wait to see you on this special day!"
              : `You've selected: ${date}`}
          </p>
          
          {!claimed ? (
            <Button 
              onClick={handleClaim}
              className="px-8 py-6 text-lg gap-2 animate-pulse"
            >
              <Confetti className="mr-2" />
              Claim This Date
              <Flower className="ml-2" />
            </Button>
          ) : (
            <>
              <p className="text-lg text-center text-primary font-medium mb-6">
                Your date has been claimed! I'll make it special for you.
              </p>
              <Button 
                onClick={onReset}
                variant="outline"
                className="px-6 py-4"
              >
                Start Over
              </Button>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

const Card = ({ children, className = "", ...props }) => {
  return (
    <div className={`rounded-lg ${className}`} {...props}>
      {children}
    </div>
  );
};

export default ClaimButton;
