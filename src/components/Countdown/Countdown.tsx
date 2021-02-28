import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { CountdownContext } from '../../contexts/CountdownContext';
import styles from './Countdown.module.css';

let countdownTimeout : NodeJS.Timeout;

export function Countdown() {
  const { 
    hasFinished, 
    minutes, 
    seconds, 
    isActive, 
    resetCountdown, 
    startCountdown
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Cicle Finished
        </button>
      ) : (
        <>
          {isActive ?(
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Skip cicle
            </button>
          ): (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Start cicle
            </button>  
          )}
        </>
      )}
    </>
  );
}