import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/playground.module.scss";
import Link from "next/link";
import Image from "next/image";

import folder from "../../assets/images/folder.png";
import git from "../../assets/images/github-mark-white.png";
import useFadeIn from "../../hooks/useFadeIn";
import useAxios from "../../hooks/useAxios";
import seeMore from "@/assets/images/arrowMore.png";
import seeLess from "@/assets/images/arrowLess.png";

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
  const [isOpen, setIsOpen] = useState(false);

  const APIURL = "http://localhost:5005";

  const project = useAxios<any>({
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

  function handleClick(event: string) {
    if (event === "open") return setIsOpen(true);
    if (event === "close") return setIsOpen(false);
  }

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
        <div className={styles.mainContainer}>
          <div className={styles.gridColumn}>
            {playgroundInfo &&
              playgroundInfo.slice(0, 6).map((playground: PlaygroundProps) => (
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
                      {paragraphedString(playground.tools).map(
                        (tool, index) => (
                          <li key={index}>{tool}</li>
                        )
                      )}
                    </ul>
                  </div>
                </Link>
              ))}

            {isOpen === true &&
              playgroundInfo &&
              playgroundInfo.slice(6).map((playground: PlaygroundProps) => (
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
                      {paragraphedString(playground.tools).map(
                        (tool, index) => (
                          <li key={index}>{tool}</li>
                        )
                      )}
                    </ul>
                  </div>
                </Link>
              ))}
          </div>
          {isOpen === false ? (
            <Image
              src={seeMore}
              alt={"see-more"}
              width={200}
              height={200}
              className={styles.buttonMore}
              onClick={() => handleClick("open")}
            />
          ) : (
            <Image
              src={seeLess}
              alt={"see-more"}
              width={200}
              height={200}
              className={styles.seeLess}
              onClick={() => handleClick("close")}
            />
          )}
        </div>
      </section>
    </>
  );
}

export default Playground;
