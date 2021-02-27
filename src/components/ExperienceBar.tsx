import React, { useContext } from 'react';
import styles from "../styles/components/ExperienceBar.module.css";
import {ChallengesContext} from "../contexts/ChallengesContext"

function ExperienceBar() {
  const {experience, experienceToNextLevel} = useContext(ChallengesContext)
  const percentToNextLevel = Math.round(experience * 100) / experienceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{width: `${percentToNextLevel}%`}} />
        <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}}>{experience} xp</span>
      </div>

      <span>{experienceToNextLevel} xp</span>

    </header>
  );
};

export default ExperienceBar;
