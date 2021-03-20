import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';
import React from 'react';

import Home from './Home';
import Login from './Login';

interface AppProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function App({
  level,
  currentExperience,
  challengesCompleted,
}: AppProps): JSX.Element {
  const [session] = useSession();

  if (!session) return <Login />;

  return (
    <Home
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
      userInfo={session.user}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const { level, currentExperience, challengesCompleted } = req.cookies;
  const session = await getSession({ req });

  return {
    props: {
      session: session,
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
