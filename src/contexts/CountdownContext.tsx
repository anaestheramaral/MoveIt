import {useState, createContext, ReactNode, useContext, useEffect} from "react"
import { ChallengesContext } from "./ChallengesContext";

interface CountdownProviderProps {
  children: ReactNode
}

interface CountdownProviderData {
  minutes: number,
  seconds: number,
  isActive: boolean,
  hasFinished: boolean,
  handleStart: () => void,
  resetCountdown: () => void,
}

export const CountdownContext = createContext({} as CountdownProviderData)

export function CountdownProvider({children}: CountdownProviderProps){
  const {startNewChallenge} = useContext(ChallengesContext)
  const [time, setTime] = useState(25*60);

  const minutes = Math.floor(time/60);
  const seconds = time % 60;
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  //stop the countDown - otherwise it is going to play one more second
  let countdownTimeout: NodeJS.Timeout

  function handleStart() {
    setIsActive(true)
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(25*60)
    setHasFinished(false)
  }

  useEffect(() => {
    if (isActive){
      if (time > 0) {
        countdownTimeout = setTimeout(()=>{
          setTime(time -1 )
        },1000)
      }
      else if (time === 0) {
        setHasFinished(true);
        setIsActive(false);
        startNewChallenge();
      }
    }
  }, [isActive, time]);

  return(
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      isActive,
      hasFinished,
      handleStart,
      resetCountdown,
    }}>
      {children}
    </CountdownContext.Provider>
  )
}
