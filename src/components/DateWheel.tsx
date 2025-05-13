
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Turtle, Star, Map, Sun, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DateWheelProps {
  dates: string[];
  onDateSelected: (date: string) => void;
}

const DateWheel: React.FC<DateWheelProps> = ({ dates, onDateSelected }) => {
  const [spinning, setSpinning] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const [confetti, setConfetti] = useState<Array<{id: number, x: number, y: number, size: number, color: string, speed: number}>>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Create confetti particles
    const newConfetti = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random x position (percent)
      y: -(Math.random() * 20) - 10, // Start above the screen
      size: Math.random() * 8 + 4, // Random size between 4-12px
      color: getRandomColor(),
      speed: 2 + Math.random() * 3 // Random fall speed
    }));
    
    setConfetti(newConfetti);
  }, []);
  
  // Get a random confetti color
  const getRandomColor = () => {
    const colors = ['#9b87f5', '#7E69AB', '#D6BCFA', '#8B5CF6', '#E5DEFF', '#6E59A5'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getIcon = (dateIdea: string) => {
    if (dateIdea.includes("turtle")) return <Turtle className="h-5 w-5 inline-block ml-1" />;
    if (dateIdea.includes("Stargaze")) return <Star className="h-5 w-5 inline-block ml-1" />;
    if (dateIdea.includes("Road trip")) return <Map className="h-5 w-5 inline-block ml-1" />;
    if (dateIdea.includes("south")) return <Sun className="h-5 w-5 inline-block ml-1" />;
    return null;
  };

  const spinWheel = () => {
    if (spinning) return;
    
    setSpinning(true);
    setSelectedDate(null);
    
    // Calculate random rotation (minimum 2 full rotations + random position)
    const spinDegrees = 720 + Math.floor(Math.random() * 360);
    setRotation(spinDegrees);
    
    // Determine the selected date based on final rotation
    setTimeout(() => {
      const normalizedRotation = spinDegrees % 360;
      const segmentSize = 360 / dates.length;
      const selectedIndex = Math.floor(normalizedRotation / segmentSize);
      const selected = dates[selectedIndex];
      
      setSelectedDate(selected);
      setSpinning(false);
      
      setTimeout(() => {
        onDateSelected(selected);
      }, 1500);
    }, 3000); // Wait for animation to finish
  };

  const wheelSize = isMobile ? "w-56 h-56" : "w-64 h-64";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-purple-100 to-blue-100 relative overflow-hidden">
      {/* Falling confetti */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-sm pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animation: `fall ${particle.speed}s linear infinite`,
            zIndex: 5
          }}
        />
      ))}
      
      <div className="w-full max-w-lg relative z-10 px-2 sm:px-0">
        <Card className="bg-white shadow-xl p-4 sm:p-6">
          <CardContent className="flex flex-col items-center p-2 sm:p-4">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 mb-2" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 sm:mb-4 font-montserrat">
              Spin to Claim Graduation Gift in December
            </h2>
            <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8 font-montserrat">
              Let's see what adventure awaits us...
            </p>
            
            <div className={`relative ${wheelSize} mb-6 sm:mb-8`}>
              {/* The pointer triangle */}
              <div 
                className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-2xl z-10"
                style={{ color: '#6d28d9' }}
              >
                ▼
              </div>
              
              {/* The wheel */}
              <div
                ref={wheelRef}
                className="w-full h-full rounded-full border-4 border-primary overflow-hidden relative transition-all duration-3000 ease-out"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: spinning ? 'transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)' : ''
                }}
              >
                {dates.map((date, index) => {
                  const segmentSize = 360 / dates.length;
                  const rotate = index * segmentSize;
                  
                  return (
                    <div
                      key={date}
                      className="absolute w-full h-full top-0 left-0 flex items-center justify-center text-center"
                      style={{ 
                        transform: `rotate(${rotate}deg)`,
                        clipPath: 'polygon(50% 50%, 50% 0%, 100% 0, 100% 100%, 50% 100%)',
                        backgroundColor: index % 2 === 0 ? '#e9d5ff' : '#c4b5fd',
                      }}
                    >
                      <span
                        className="absolute font-medium font-montserrat text-xs sm:text-sm"
                        style={{
                          left: '75%',
                          transform: 'translateX(-50%) rotate(-90deg)',
                          width: '100px'
                        }}
                      >
                        {date}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <Button
              onClick={spinWheel}
              disabled={spinning}
              className="px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg font-montserrat"
            >
              {spinning ? "Spinning..." : "Spin the Wheel"}
            </Button>
            
            {selectedDate && (
              <p className="mt-6 text-base sm:text-lg font-medium text-primary animate-fadeIn font-montserrat">
                You got: <span className="font-bold">{selectedDate}</span> {getIcon(selectedDate)}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DateWheel;
