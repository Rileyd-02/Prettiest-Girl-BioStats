
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Turtle, Star, Map, Sun } from 'lucide-react';

interface DateWheelProps {
  dates: string[];
  onDateSelected: (date: string) => void;
}

const DateWheel: React.FC<DateWheelProps> = ({ dates, onDateSelected }) => {
  const [spinning, setSpinning] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-100 to-blue-100">
      <div className="max-w-lg w-full">
        <Card className="bg-white shadow-xl p-6">
          <CardContent className="flex flex-col items-center p-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Spin for your date idea!
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Let's see what adventure awaits us...
            </p>
            
            <div className="relative w-64 h-64 mb-8">
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
                        className="absolute font-medium"
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
              className="px-8 py-6 text-lg"
            >
              {spinning ? "Spinning..." : "Spin the Wheel"}
            </Button>
            
            {selectedDate && (
              <p className="mt-6 text-lg font-medium text-primary animate-fadeIn">
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
