import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import folder from "../../assets/images/folder.png";
import git from "../../assets/images/github-mark-white.png";
import useFadeIn from "../../hooks/useFadeIn";
import useAxios from "../../hooks/useAxios";

import back from "@/assets/images/back_dark.png";
import styles from "@/styles/playground.module.scss";

export interface PlaygroundProps {
  playground_id: number;
  name: string;
  content: string;
  tools: string;
  link: string;
}

function paragraphedString(string: string) {
  return string.split(" ");
}

function Playground() {
  const { componentRef, isVisible } = useFadeIn(0.25);
  const playgroundRef = useRef(null);
  const [playgroundInfo, setPlaygroundInfo] = useState<[]>([]);

  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  useAxios<any>({
    url: `${APIURL}/api/playground`,
    initialValue: [],
    transform: (playground) => {
      if (playground === null) return undefined;
      setPlaygroundInfo(playground);
      return playground;
    },
  });

  useEffect(() => {
    componentRef.current = playgroundRef.current;
  }, [componentRef, playgroundRef]);

  return (
    <>
      <section
        id={"Playground"}
        className={`${"sectionBg1"} ${styles.Playground} ${
          isVisible ? "fade-in " : ""
        }`}
        ref={playgroundRef}
      >
        <h1 className={"title self-start mb-10"}>03: Playground</h1>

        <div className="grid grid-cols-3 gap-3 h-full w-full">
          {playgroundInfo &&
            playgroundInfo.map((playground: PlaygroundProps) => (
              <Link
                href={playground.link}
                key={playground.playground_id}
                className={styles.tile}
              >
                <div className={styles.tileHeader}>
                  <Image src={folder} alt={"folder-icon"} />
                  <Image src={git} alt={"git-icon"} />
                </div>
                <h3 className={styles.tileTitle}>{playground.name}</h3>
                <div className={styles.tileDescription}>
                  {playground.content}
                </div>

                <div>
                  <ul className={styles.techList}>
                    {paragraphedString(playground.tools).map((tool, index) => (
                      <li key={index}>{tool}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
        </div>
        <Link href={"/#Playground"} className={styles.back}>
          <Image src={back} width={25} alt={"go-back"} />
        </Link>
      </section>
    </>
  );
}

export default Playground;
