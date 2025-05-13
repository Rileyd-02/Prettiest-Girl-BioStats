
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface BirthdayQuizProps {
  correctAnswer: string;
  onCorrectAnswer: () => void;
}

const BirthdayQuiz: React.FC<BirthdayQuizProps> = ({ correctAnswer, onCorrectAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // These should be modified to include the correct answer and 3 wrong options
  const options = [
    "January 20th",
    "November 11th", 
    "December 5th",
    "October 15th"
  ];

  const handleOptionClick = (option: string) => {
    setSelectedAnswer(option);
    setIsCorrect(option === correctAnswer);
    setShowFeedback(true);
    
    if (option === correctAnswer) {
      setTimeout(() => {
        onCorrectAnswer();
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-purple-100 to-pink-100">
      <div className="max-w-md w-full bg-white p-5 sm:p-8 rounded-2xl shadow-lg">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6">
          Quick question...
        </h2>
        
        <p className="text-base sm:text-lg text-center mb-6 sm:mb-8">
          When is Riley's birthday?
        </p>
        
        <div className="space-y-3 sm:space-y-4">
          {options.map((option) => (
            <Button
              key={option}
              variant={selectedAnswer === option 
                ? (isCorrect ? "default" : "destructive") 
                : "outline"}
              className={`w-full justify-between py-4 sm:py-6 text-base sm:text-lg ${
                selectedAnswer && selectedAnswer !== option ? 'opacity-60' : ''
              }`}
              onClick={() => !selectedAnswer && handleOptionClick(option)}
              disabled={!!selectedAnswer && selectedAnswer !== option}
            >
              {option}
              <ArrowDown className={`ml-2 h-4 w-4 ${selectedAnswer === option ? 'opacity-100' : 'opacity-50'}`} />
            </Button>
          ))}
        </div>
        
        {showFeedback && (
          <div className={`mt-4 sm:mt-6 text-center text-base sm:text-lg ${isCorrect ? 'text-green-600' : 'text-red-600'} animate-scaleIn`}>
            {isCorrect 
              ? "That's correct! Opening a special message..." 
              : "Not quite right. Try again!"}
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayQuiz;
