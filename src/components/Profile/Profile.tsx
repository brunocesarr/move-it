import styles from './Profile.module.css';

export function Profile () {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/brunocesarr.png" alt="Bruno Cesar"/>
      <div>
        <strong>Bruno César Silva</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}