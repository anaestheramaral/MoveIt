import styles from "../styles/components/CompletedChallenges.module.css";
import {ChallengesContext} from "../contexts/ChallengesContext";
import { useContext } from "react";

export function CompletedChallenges(){
  const {challengesCompleted} = useContext(ChallengesContext)
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Completed Challenges</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}
