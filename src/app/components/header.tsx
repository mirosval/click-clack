import { Cog6ToothIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { Difficulty } from "../page";

type HeaderProps = {
  difficulty: Difficulty;
  level: number;
  speed: number;
  onClickSettings: () => void;
  onClickAbout: () => void;
}

export default function Header(props: HeaderProps) {
  return <div className="w-full px-5 py-3 flex flex-row font-black content-place-center items-center shrink-0 gap-4">
    <h1 className="text-2xl grow"><a href="/">Click Clack</a></h1>
    <div className="cursor-default">Difficulty: <span className="uppercase text-blue-300">{props.difficulty}</span></div>
    <div className="cursor-default">Level <span className="text-green-300">{props.level} / 10</span></div>
    <div className="cursor-default">Speed <span className="text-pink-300">{props.speed}ms</span></div>
    <div>
      <a href="#" onClick={props.onClickSettings}>
        <motion.div
          whileHover={{
            rotate: 30,
            transition: {
              duration: 0.2
            }
          }}
          >
          <Cog6ToothIcon className="h-6 w-6 dark:text-gray-300 text-gray-700" aria-hidden={true} />
        </motion.div>
        <span className="sr-only">Settings</span>
      </a>
    </div>
    <div>
      <a href="#" onClick={props.onClickAbout}>
        <motion.div
          whileHover={{
            rotate: 30,
            transition: {
              duration: 0.2
            }
          }}
          >
          <QuestionMarkCircleIcon className="h-6 w-6 dark:text-gray-300 text-gray-700" aria-hidden={true} />
        </motion.div>
        <span className="sr-only">About</span>
      </a>
    </div>
  </div>;
}
