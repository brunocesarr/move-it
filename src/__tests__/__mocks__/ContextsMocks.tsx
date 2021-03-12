import { ReactNode } from 'react';
import { ChallengesProvider } from '../../contexts/ChallengesContext';
import { CountdownProvider } from '../../contexts/CountdownContext';

export function CountdownProviderMock(children: ReactNode): JSX.Element {
  return <CountdownProvider>{children}</CountdownProvider>;
}

export function ChallengesProviderMock(
  children: ReactNode,
  level = 0,
  currentExperience = 0,
  challengesCompleted = 0,
): JSX.Element {
  return (
    <ChallengesProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      {children}
    </ChallengesProvider>
  );
}
