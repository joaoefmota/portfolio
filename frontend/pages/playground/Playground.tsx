import React from "react";
import styles from "@/styles/playground.module.scss";
import Link from "next/link";

const playTiles = [
  {
    id: 1,
    title: "Database fetch",
    description:
      "A modelized fullstack application, with a restfull API implementation (backend-frontend sinergy).",
    tool1: "Express.js",
    tool2: "React.js",
    tool3: "SQL",
    link: "",
  },
  {
    id: 2,
    title: "SocketIO dummy",
    description:
      "SocketIo implementation, for a website with real-time chat online between two users.",
    tool1: "Express.js",
    tool2: "Vite.js",
    tool3: "SocketIO",
    link: "",
  },
  {
    id: 3,
    title: "Hackathon AWS",
    description:
      "Hackathon under the AWS challenge, to create a car rental service website with user login.",
    tool1: "Express.js",
    tool2: "SQL",
    tool3: "Typescript",
    link: "",
  },
];

function Playground() {
  return (
    <>
      <section id={"Playground"} className="relative sectionAlt">
        <div className={`${"mainBlock"} ${"flex flex-col justify-center"}`}>
          <h1 className={"title"}>03: Playground</h1>

          <div className="flex flex-row gap-4 flex-wrap">
            {playTiles.map((tile) => (
              <Link href={tile.link} key={tile.id}>
                <div className={styles.tile}>
                  <div>
                    <h3 className={styles.tileTitle}>{tile.title}</h3>
                    <div className={styles.tileDescription}>
                      {tile.description}
                    </div>
                  </div>
                  <div>
                    <ul className={styles.techList}>
                      <li>{tile.tool1}</li>
                      <li>{tile.tool2}</li>
                      <li>{tile.tool3}</li>
                    </ul>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Playground;
