import Head from 'next/head';
import React from 'react';

import { ChallengeBox } from '../../components/ChallengeBox/ChallengeBox';
import { CompleteChallenges } from '../../components/CompleteChallenges/CompleteChallenges';
import { Countdown } from '../../components/Countdown/Countdown';
import { ExperienceBar } from '../../components/ExperienceBar/ExperienceBar';
import { Profile } from '../../components/Profile/Profile';
import { ChallengesProvider } from '../../contexts/ChallengesContext';
import { CountdownProvider } from '../../contexts/CountdownContext';
import styles from './Home.module.css';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export function Home({
  level,
  currentExperience,
  challengesCompleted,
}: HomeProps): JSX.Element {
  return (
    <ChallengesProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Home | Move.It</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompleteChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}
