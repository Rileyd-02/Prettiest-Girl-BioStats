
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-pink-100 to-purple-100">
      <div className="w-full max-w-lg">
        {!isOpen ? (
          <Card className="bg-secondary/50 backdrop-blur-sm border-2 border-secondary shadow-xl animate-float">
            <CardContent className="p-8 flex flex-col items-center">
              <Gift className="h-16 w-16 text-primary mb-6" />
              <h3 className="text-2xl font-bold text-center mb-6">
                A letter for you
              </h3>
              <Button 
                onClick={handleOpen} 
                className="px-8 py-6 text-lg"
              >
                Open Letter
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white p-8 shadow-xl animate-scaleIn">
            <CardContent className="p-4">
              <div className="bg-[url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center h-40 -mt-4 -mx-4 mb-6 rounded-t-lg opacity-80" />
              
              <h3 className="text-2xl font-bold mb-6 text-primary">
                Congratulations, Love!
              </h3>
              
              <div className="prose max-w-none mb-8">
                <p className="whitespace-pre-line text-gray-700">
                  {message}
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-bold text-gray-700">With all my love,</p>
                <p className="italic text-gray-600">Your long-distance love</p>
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  onClick={handleClose} 
                  variant="outline" 
                  className="px-6"
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
