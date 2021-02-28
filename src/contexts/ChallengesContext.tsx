import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from '../data/challenges.json';

interface IChallenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface IChallengesProviderData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: IChallenge,
  levelUp: () => void;
  startNewChallenge: () => void; 
  resetChallenge: () => void; 
  completeChallenge: () => void;
}

interface IChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as IChallengesProviderData);

export function ChallengesProvider({ children }: IChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = ((level + 1) * 4) ** 2;

  useEffect(() => {
    Notification.requestPermission();
  }, []);
  
  const levelUp = () : void => {
    setLevel(level + 1);
  }

  const startNewChallenge = () : void => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('New challenge 😎🔥', {
        body: `Earn ${challenge.amount}xp!`,
      });
    }
  }

  const resetChallenge = (): void => {
    setActiveChallenge(null);
  }

  const completeChallenge = (): void => {
    if (!activeChallenge) {
      return;
    }

    const {amount} = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        levelUp,
        currentExperience,
        experienceToNextLevel,
        activeChallenge,
        challengesCompleted,
        startNewChallenge,
        resetChallenge, 
        completeChallenge
      }}
    >
      { children }
    </ChallengesContext.Provider>
  )
}