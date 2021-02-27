import {useContext} from "react";
import styles from '../styles/components/ChallengeBox.module.css';
import {ChallengesContext} from '../contexts/ChallengesContext';
import { CountdownContext } from "../contexts/CountdownContext";

export function ChallengeBox(){
  const {activeChallenge, resetChallenge, handleCompleteChallenge} = useContext(ChallengesContext);
  const {resetCountdown} = useContext(CountdownContext);

  function handleChallengeSucceeded(){
    handleCompleteChallenge();
    resetCountdown();
  }

  function handleChallengeFailed(){
    resetChallenge();
    resetCountdown();
  }

  return(
    <div className={styles.ChallengeBoxContainer}>
      {activeChallenge ?
        (<div className={styles.challengeBoxtActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main >
            {activeChallenge.type === "body" ? (<img src="icons/body.svg" alt="body"/>) : <img src="icons/eye.svg" alt="body"/>}
            <strong>Exercise!</strong>
            <p>{activeChallenge.description}</p>
          </main>

            <footer>
              <button
                onClick={handleChallengeFailed}
                type="button"
              >Failed
              </button>
              <button
                type="button"
                onClick={handleChallengeSucceeded}
              >All done!</button>
            </footer>
        </div>)
      :
        (<div className={styles.challengeBoxNotActive}>
          <strong>Inicie um ciclo para receber desafios a serem completados</strong>
          <div>

            <p>
              <img src="icons/level-up.svg" alt="level up"/>
              Complete-os e ganhe experiência e avance de leve.
            </p>
          </div>
        </div>)
      }
    </div>
  )
}
