import Head from 'next/head';
import React from 'react';
import { CompleteChallenges } from '../../components/CompleteChallenges/CompleteChallenges';
import { Countdown } from '../../components/Countdown/Countdown';
import { ExperienceBar } from '../../components/ExperienceBar/ExperienceBar';
import { Profile } from '../../components/Profile/Profile';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home | Move.It</title>
      </Head>
      <ExperienceBar />
      <section>
        <div>
          <Profile />
          <CompleteChallenges />
          <Countdown />
        </div>
        <div>
          
        </div>
      </section>
    </div>
  )
}
