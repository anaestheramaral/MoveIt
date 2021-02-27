import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/Profile.module.css";

export function Profile() {
  const {level} = useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img src="http://github.com/anaestheramaral.png" alt="Ana Esther"/>
      <div>
        <strong>Ana Esther Silva Amaral</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}</p>
      </div>
    </div>
  )
}
