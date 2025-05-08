import React, { useState } from 'react';
import Greeting from '@/components/Greeting';
import Dandelion from '@/components/Dandelion';
import BirthdayQuiz from '@/components/BirthdayQuiz';
import Letter from '@/components/Letter';
import DateWheel from '@/components/DateWheel';
import ClaimButton from '@/components/ClaimButton';
import BackgroundMusic from '@/components/BackgroundMusic';

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string>('');
  
  // Configuration (you can update these values as needed)
  const correctBirthday = "November 11th"; // Updated to Riley's birthday
  const letterMessage = `To the prettiest girl in biostats,

Congratulations, grad!!! 🎓❤️ I’m so happy for you and beyond proud of you. 
You’ve worked so hard for this and absolutely deserve to celebrate like the queen of Coachella you are 👑 
You’re the smartest, prettiest person I know, and I’m so lucky to have met you.
Cant wait to see you again - see you soon 😘`;

  const dateIdeas = [
    "Go see turtles", 
    "Stargaze", 
    "Road trip", 
    "Spend a night down south (If we're lucky)", 
    "PowerBi Training",
    "Walk"
  ];
  
  // Music URL - replace with your own music URL
  const songUrl = "https://cdn.gpteng.co/samples/music/romantic-song.mp3";
  
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
      {currentStep === 4 && <DateWheel dates={dateIdeas} onDateSelected={handleDateSelected} />}
      {currentStep === 5 && <ClaimButton date={selectedDate} onReset={handleReset} />}
      
      <BackgroundMusic songUrl={songUrl} />
    </div>
  );
};

export default Index;
