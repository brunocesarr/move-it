import Cookies from 'js-cookie';
import { User } from 'next-auth';
import { signOut } from 'next-auth/client';
import React, { createContext, ReactNode, useEffect, useState } from 'react';

import { LevelUpModal } from '../components/LevelUpModal/LevelUpModal';
import challenges from '../data/challenges.json';
import Login from '../pages/Login';

interface IChallenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface IChallengesProviderData {
  profileInfo: Profile;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: IChallenge;
  levelUp: () => void;
  closeLevelUpModal: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  clearSession: () => void;
}

interface Profile {
  name: string;
  email: string;
  image: string;
}

interface IChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  userInfo: User;
}

export const ChallengesContext = createContext({} as IChallengesProviderData);

export function ChallengesProvider({
  children,
  ...rest
}: IChallengesProviderProps): JSX.Element {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0,
  );
  const [challengesCompleted, setChallengesCompleted] = useState(
    rest.challengesCompleted ?? 0,
  );

  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const [profileInfo, setProfileInfo] = useState<Profile>(
    rest.userInfo
      ? {
          name: rest.userInfo.name,
          email: rest.userInfo.email,
          image: rest.userInfo.image,
        }
      : null,
  );

  const experienceToNextLevel = ((level + 1) * 4) ** 2;

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    if (rest.userInfo) {
      setProfileInfo({
        name: rest.userInfo.name,
        email: rest.userInfo.email,
        image: rest.userInfo.image,
      });
    }
  }, [rest.userInfo]);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  const levelUp = (): void => {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  };

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  const startNewChallenge = (): void => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('New challenge 😎🔥', {
        body: `Earn ${challenge.amount}xp!`,
      });
    }
  };

  const resetChallenge = (): void => {
    setActiveChallenge(null);
  };

  const completeChallenge = (): void => {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  };

  const clearSession = (): void => {
    setLevel(1);
    setCurrentExperience(0);
    setChallengesCompleted(0);
    setActiveChallenge(null);

    setProfileInfo(null);
    signOut();
  };

  if (!profileInfo) return <Login />;

  return (
    <ChallengesContext.Provider
      value={{
        profileInfo,
        level,
        currentExperience,
        experienceToNextLevel,
        activeChallenge,
        challengesCompleted,
        levelUp,
        closeLevelUpModal,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        clearSession,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
}
