import { GetServerSideProps } from 'next';
import React from 'react';
import Home from './Home/Home';

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
  return (
    <Home
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
