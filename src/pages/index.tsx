import ExperienceBar from "../components/ExperienceBar";
import {GetServerSideProps} from "next";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges"
import styles from "../styles/pages/Home.module.css"
import { CountDown } from "../components/Countdown";

import Head from "next/head"
import { ChallengeBox } from "../components/ChallengeBox";
import {ChallengesProvider} from "../contexts/ChallengesContext"
import {CountdownProvider} from "../contexts/CountdownContext"

interface HomeProps{
  level: number,
  experience: number,
  challengesCompleted: number,
}

export default function Home(props: HomeProps) {
  console.log(props, "props")
  return (
    <ChallengesProvider
      level={props.level}
      experience={props.experience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Move.it</title>
        </Head>

        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <CountDown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {level, experience, challengesCompleted} = ctx.req.cookies;
  // req = request
  // inside the cst you have access to all the cookies of you aplication
  return {
    props: {
      level: Number(level),
      experience: Number(experience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}
