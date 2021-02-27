import {createContext, ReactNode, useEffect, useState} from "react";
import challenges from "../../challenges.json";
import Cookies from "js-cookie";
import { LevelUpModal } from "../components/LevelUpModal";

interface Challenge {
  type: "body" | "eye",
  description: string,
  amount: number
}

interface ChallengeContextData {
  level: number,
  experience: number,
  challengesCompleted: number,
  activeChallenge: Challenge,
  experienceToNextLevel: number,
  startNewChallenge: () => void,
  levelUp: () => void,
  resetChallenge: () => void,
  handleCompleteChallenge: () => void,
  closeModalLevelUp: () => void,
}

interface ChallengesProviderProps {
  children: ReactNode,
  level: number,
  experience: number,
  challengesCompleted: number,
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({children, ...rest}:ChallengesProviderProps){
  const [level, setLevel] =useState(rest.level ?? 1);
  const [experience, setExperience] = useState(rest.experience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(()=>{
    Notification.requestPermission();
  },[])

  useEffect(()=>{
    Cookies.set("level", String(level))
    Cookies.set("experience", String(experience))
    Cookies.set("challengesCompleted", String(challengesCompleted))
  },[level, experience, challengesCompleted])

  function levelUp(){
      setLevel(level+1);
      setIsLevelUpModalOpen(true)
  }

  function closeModalLevelUp(){
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    console.log("new challenge")

    const randomChallengeIndex= Math.floor(Math.random()*challenges.length);
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)

    new Audio("/notification.mp3").play()
    if(Notification.permission === "granted"){
      new Notification("New Challenge! 🎉", {
        body: `Get ${challenge.amount} xp`,

      })
    }
  }

  function resetChallenge(){
    setActiveChallenge(null);
  }

  function handleCompleteChallenge(){
    if (!activeChallenge) {
      return;
    }
    const {amount} = activeChallenge;
    let finalExperience = experience + amount
    setExperience(finalExperience)
    setActiveChallenge(null);

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp();
      setChallengesCompleted(challengesCompleted +1);
    }

  }

  return (
  <ChallengesContext.Provider value={{
    level,
    levelUp,
    experience,
    challengesCompleted,
    startNewChallenge,
    activeChallenge,
    resetChallenge,
    experienceToNextLevel,
    handleCompleteChallenge,
    closeModalLevelUp
  }}>
    {children}
    {isLevelUpModalOpen && <LevelUpModal />}
  </ChallengesContext.Provider>)

}


