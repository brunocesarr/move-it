import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './Profile.module.css';

export function Profile(): JSX.Element {
  const { profileInfo, level, clearSession } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src={profileInfo.image} alt={profileInfo.name} />
      <div>
        <strong>{profileInfo.name} </strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          Level {level}
        </p>
        <button className={styles.buttonSignOut} onClick={clearSession}>
          SingOut
        </button>
      </div>
    </div>
  );
}
