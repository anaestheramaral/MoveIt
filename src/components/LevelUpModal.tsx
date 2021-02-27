import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/LevelUpModal.module.css";

export function LevelUpModal(){
  const {level, closeModalLevelUp} = useContext(ChallengesContext);
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>
        <main>
          <strong>Congrats</strong>
          <p>You reached a new level!</p>
          <button onClick={closeModalLevelUp} type="button">
            <img src="icons/close.svg" alt="close "/>
          </button>
        </main>
        {/* <footer>
          <button type="button">
            Share on Twitter
            <img src="icons/twitter.svg" alt="twitter"/>
          </button>
        </footer> */}
      </div>
    </div>
  )
}
