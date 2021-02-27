import { useState, useEffect, useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/CountDown.module.css";




export function CountDown(){

  const {minutes, seconds, isActive, resetCountdown, handleStart, hasFinished} = useContext(CountdownContext)
  const [minutesLeft, minutesRight] = String(minutes).padStart(2, "0").split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, "0").split('');


  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minutesLeft}</span>
          <span>{minutesRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>
      {hasFinished ? (<button
          disabled
          className={styles.countdownButton}
        >
          Finished
          <img src="icons/check_circle.svg" alt="check_circle"/>
        </button>)
        :
      (
        <>
          {
            isActive ?
            <button
              type="button"
              onClick={resetCountdown}
              className={`${styles.countdownLeaveButton} ${styles.countdownButton}`}
            >
              Leave cycle
              <img src="icons/close.svg" alt="close"/>
            </button>
            :
            <button
              type="button"
              className={styles.countdownButton}
              onClick={handleStart}
            >
              START
            </button>
      }
        </>
      )
      }


    </div>
  )
}
