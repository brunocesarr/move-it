import { useEffect, useState } from 'react';
import styles from './Countdown.module.css';

export function Countdown() {
  const [time, setTime] = useState(25 *60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive && time > 0){
      setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    }
  }, [isActive, time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  const startCountdown = () => {
    setIsActive(true);
  }

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

      {isActive ?(
        <button
          type="button"
          className={styles.countdownButton}
          onClick={startCountdown}
        >
          Abandonar ciclo
        </button>
      ): (
        <button
          type="button"
          className={styles.countdownButton}
          onClick={startCountdown}
        >
          Iniciar um ciclo
        </button>  
      )}
    </>
  );
}