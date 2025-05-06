
import React from 'react';

interface GreetingProps {
  onContinue: () => void;
}

const Greeting: React.FC<GreetingProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-purple-100 to-blue-100">
      <div 
        className="opacity-0 animate-fadeIn" 
        style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-8 italic">
          To the prettiest graduate in biostats
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-lg mx-auto">
          I've prepared something special just for you. Tap to continue...
        </p>
        
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
