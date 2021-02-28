import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './CompleteChallenges.module.css';

export function CompleteChallenges() {
  const { challengesCompleted } = useContext(ChallengesContext)
  return  (
    <div className={styles.completeChallengesContainer}>
      <span>Challenges Completed</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}