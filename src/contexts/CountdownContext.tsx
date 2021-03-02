import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ChallengesContext } from './ChallengesContext';

interface CountdownContextProps {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextProps);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({
  children,
}: CountdownProviderProps): JSX.Element {
  const { startNewChallenge } = useContext(ChallengesContext);

  const BASE_TIME = 0.1 * 60;

  const [time, setTime] = useState(BASE_TIME);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startCountdown = (): void => {
    setIsActive(true);
  };

  const resetCountdown = (): void => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(BASE_TIME);
    setHasFinished(false);
  };

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time, startNewChallenge]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
