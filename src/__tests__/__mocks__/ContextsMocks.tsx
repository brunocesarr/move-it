import { Session, User } from 'next-auth';
import { ReactNode } from 'react';
import { ChallengesProvider } from '../../contexts/ChallengesContext';
import { CountdownProvider } from '../../contexts/CountdownContext';

export function CountdownProviderMock(children: ReactNode): JSX.Element {
  return <CountdownProvider>{children}</CountdownProvider>;
}

export function ChallengesProviderMock(
  children: ReactNode,
  level = 1,
  currentExperience = 0,
  challengesCompleted = 0,
  userInfo = mockSession,
): JSX.Element {
  return (
    <ChallengesProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
      userInfo={userInfo}
    >
      {children}
    </ChallengesProvider>
  );
}

export const mockSession: User = {
  email: 'email@email.com',
  name: 'Teste',
  image: 'TesteImage',
};
