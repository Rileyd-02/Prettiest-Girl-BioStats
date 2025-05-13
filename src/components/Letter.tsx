
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flower } from 'lucide-react';

interface LetterProps {
  message: string;
  onClose: () => void;
}

const Letter: React.FC<LetterProps> = ({ message, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="w-full max-w-lg">
        {!isOpen ? (
          <Card className="bg-secondary/50 backdrop-blur-sm border-2 border-secondary shadow-xl animate-float relative overflow-hidden">
            <CardContent className="p-4 sm:p-8 flex flex-col items-center relative z-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent_70%)] z-0"></div>
              <Flower className="h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4 sm:mb-6 relative z-10" />
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 relative z-10">
                A note for you
              </h3>
              <Button 
                onClick={handleOpen} 
                className="px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg relative z-10"
              >
                Open Note
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white p-4 sm:p-8 shadow-xl animate-scaleIn">
            <CardContent className="p-3 sm:p-4">
              <div className="bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center h-32 sm:h-48 -mt-3 sm:-mt-4 -mx-3 sm:-mx-4 mb-4 sm:mb-6 rounded-t-lg opacity-90" />
              
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary">
                Super Proud of You!
              </h3>
              
              <div className="prose max-w-none mb-6 sm:mb-8">
                <p className="whitespace-pre-line text-sm sm:text-base text-gray-700">
                  {message}
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-base sm:text-lg font-bold text-gray-700">With all my love,</p>
              </div>
              
              <div className="mt-6 sm:mt-8 text-center">
                <Button 
                  onClick={handleClose} 
                  variant="outline" 
                  className="px-4 sm:px-6"
                >
                  Close &amp; Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Letter;
