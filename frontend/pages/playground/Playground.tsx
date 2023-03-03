import React, { useEffect, useRef } from "react";
import styles from "@/styles/playground.module.scss";
import Link from "next/link";
import Image from "next/image";

import folder from "../../assets/images/folder.png";
import git from "../../assets/images/github-mark-white.png";
import useFadeIn from "../hooks/useFadeIn";

const playTiles = [
  {
    id: 1,
    title: "Database fetch",
    description:
      "A modelized fullstack application, with a restfull API implementation (backend-frontend sinergy).",
    tool1: "Express.js",
    tool2: "React.js",
    tool3: "SQL",
    linkGit: "",
  },
  {
    id: 2,
    title: "SocketIO dummy",
    description:
      "SocketIo implementation, for a website with real-time chat online between two users.",
    tool1: "Express.js",
    tool2: "Vite.js",
    tool3: "SocketIO",
    linkGit: "",
  },
  {
    id: 3,
    title: "Hackathon AWS",
    description:
      "Hackathon under the AWS challenge, to create a car rental service website with user login.",
    tool1: "Express.js",
    tool2: "SQL",
    tool3: "NextJs",
    linkGit: "",
  },
  {
    id: 4,
    title: "Checkpoint 3",
    description:
      "One of the several tests I did while studying. It involves manipulating the frontend with backend post requets",
    tool1: "Express.js",
    tool2: "React.js",
    tool3: "Javascript",
    linkGit: "",
  },
  {
    id: 5,
    title: "CV Portfolio",
    description:
      "The repo for this very-same website, where I employed most of what I liked the most to learn.",
    tool1: "Express.js",
    tool2: "NextJs",
    tool3: "jsonwebtoken",
    linkGit: "",
  },
  {
    id: 6,
    title: "Musique redo",
    description:
      "The redo of Musique's project, to continue from the point our group finished with improved content",
    tool1: "Vite.js",
    tool2: "Javascript",
    tool3: "API",
    linkGit: "",
  },
];

function Playground() {
  const { componentRef, isVisible } = useFadeIn(0.25);
  const playgroundRef = useRef(null);

  useEffect(() => {
    componentRef.current = playgroundRef.current;
  }, [componentRef, playgroundRef]);

  return (
    <>
      <section
        id={"Playground"}
        className={`${"sectionBg2"} ${styles.Playground} ${
          isVisible ? "fade-in " : ""
        }`}
        ref={playgroundRef}
      >
        <h1 className={"title titleAlt mb-10"}>03: Playground</h1>

        <div className="grid grid-cols-3 gap-3 h-full w-full">
          {playTiles.map((tile) => (
            <Link href={tile.linkGit} key={tile.id} className={styles.tile}>
              <div className={styles.tileHeader}>
                <Image src={folder} alt={"folder-icon"} />
                <Image src={git} alt={"git-icon"} />
              </div>
              <h3 className={styles.tileTitle}>{tile.title}</h3>
              <div className={styles.tileDescription}>{tile.description}</div>

              <div>
                <ul className={styles.techList}>
                  <li>{tile.tool1}</li>
                  <li>{tile.tool2}</li>
                  <li>{tile.tool3}</li>
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Playground;
