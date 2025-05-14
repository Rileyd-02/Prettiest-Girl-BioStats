
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Calendar } from 'lucide-react';

interface ClaimButtonProps {
  date: string;
  onReset: () => void;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({ date, onReset }) => {
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    setClaimed(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="w-full max-w-md">
        <Card className="bg-white shadow-xl">
          <CardContent className="p-4 sm:p-6">
            {!claimed ? (
              <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-primary" />
                
                <h2 className="text-xl sm:text-2xl font-bold text-center">Date Selected!</h2>
                
                <p className="text-center text-gray-600 mb-2 sm:mb-4">
                  You've selected: <span className="font-semibold text-primary">{date}</span>
                </p>
                
                <Button 
                  onClick={handleClaim} 
                  className="w-full py-6 text-lg"
                >
                  Claim Your Date
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                <div className="w-full mb-2 sm:mb-4 overflow-hidden rounded-lg">
                  <AspectRatio ratio={16/9} className="bg-muted">
                    <img 
                      src="/lovable-uploads/8b63da97-21b5-4f95-97e6-1ad62bd3d8ab.png" 
                      alt="Selfie" 
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
                
                <h2 className="text-xl sm:text-2xl font-bold text-center text-primary">
                  Your date is confirmed!
                </h2>
                
                <div className="prose max-w-none">
                  <p className="text-center text-gray-700">
                    Can't wait to see you again and missing you everyday.
                  </p>
                </div>
                
                <Button 
                  onClick={onReset} 
                  variant="outline" 
                  className="mt-4 sm:mt-6"
                >
                  Start Over
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClaimButton;
