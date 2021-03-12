import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './CompleteChallenges.module.css';

export function CompleteChallenges(): JSX.Element {
  const { challengesCompleted } = useContext(ChallengesContext);
  return (
    <div className={styles.completeChallengesContainer}>
      <span>Challenges completed</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
