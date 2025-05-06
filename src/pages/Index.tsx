
import React, { useState } from 'react';
import Greeting from '@/components/Greeting';
import Dandelion from '@/components/Dandelion';
import BirthdayQuiz from '@/components/BirthdayQuiz';
import Letter from '@/components/Letter';
import DateWheel from '@/components/DateWheel';
import ClaimButton from '@/components/ClaimButton';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  // Configuration (you can update these values as needed)
  const correctBirthday = "May 22nd"; // Replace with the correct birthday
  const letterMessage = `My dearest graduate,

I am so incredibly proud of you for achieving this milestone in your biostats journey. Your dedication, intelligence, and perseverance have been truly inspiring to watch.

Even though we're physically apart, my heart is with you celebrating this special moment. You've worked so hard for this, and I want you to know that your accomplishments mean the world to me.

I can't wait to celebrate with you in person this December. I've planned something special just for us, and I hope you're as excited as I am.

You're not just the prettiest graduate in biostats - you're the most brilliant, passionate, and amazing person I know. I love you more than words can express.`;

  const decemberDates = [
    "Dec 10th", 
    "Dec 15th", 
    "Dec 20th", 
    "Dec 25th", 
    "Dec 30th"
  ];
  
  const handleGreetingContinue = () => {
    setCurrentStep(1); // Move to Dandelion step
  };
  
  const handleWishMade = () => {
    setCurrentStep(2); // Move to Quiz step
  };
  
  const handleCorrectAnswer = () => {
    setCurrentStep(3); // Move to Letter step
  };
  
  const handleLetterClose = () => {
    setCurrentStep(4); // Move to DateWheel step
  };
  
  const handleDateSelected = (date: string) => {
    setSelectedDate(date);
    setCurrentStep(5); // Move to ClaimButton step
  };
  
  const handleReset = () => {
    setCurrentStep(0); // Reset to beginning
  };

  return (
    <div>
      {currentStep === 0 && <Greeting onContinue={handleGreetingContinue} />}
      {currentStep === 1 && <Dandelion onWishMade={handleWishMade} />}
      {currentStep === 2 && <BirthdayQuiz correctAnswer={correctBirthday} onCorrectAnswer={handleCorrectAnswer} />}
      {currentStep === 3 && <Letter message={letterMessage} onClose={handleLetterClose} />}
      {currentStep === 4 && <DateWheel dates={decemberDates} onDateSelected={handleDateSelected} />}
      {currentStep === 5 && <ClaimButton date={selectedDate} onReset={handleReset} />}
    </div>
  );
};

export default Index;
