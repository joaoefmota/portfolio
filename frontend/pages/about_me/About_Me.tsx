import React, { Component } from "react";
import Image from "next/image";

import styles from "@/styles/about.module.scss";

{
  /* IMAGES */
}
import profile from "@/assets/images/profile.jpg";

const enjoy = [
  { id: 1, name: "NextJs" },
  { id: 2, name: "SQL" },
  { id: 3, name: "Node.js" },
  { id: 4, name: "Tailwind" },
  { id: 5, name: "Typescript" },
  { id: 6, name: "CSS" },
  { id: 7, name: "Copywriting" },
  { id: 8, name: "Photography" },
  { id: 9, name: "Editing" },
  { id: 10, name: "Video" },
];

export default class About_Me extends Component {
  render() {
    return (
      <section id="About_Me" className={`${"sectionBg2"} ${styles.About}`}>
        <h1 className={"title titleAlt mb-10 self-start"}>01: About me</h1>
        <div className="flex sm:flex-col flex-row w-full items-center justify-center">
          <article className="sm:w-full w-3/4">
            <p
              className={`${"text-paragraph leading-relaxed"} ${"paragraph paragraphAlt"}`}
            >
              My interest in <span className="span2">web development</span>{" "}
              started when I was completing my Multimedia masters. Being a{" "}
              <span className="span2">“full stack”</span>
              creative that can hands-on things, from the concept to the
              practice, is something that deeply interests me. I consider myself
              as someone with a <span className="span2">versatile profile</span>
              , that is always cheering and loves teamwork.
            </p>

            <div className="flex flex-row gap-5 items-center">
              <div className="flex flex-col gap-2">
                <p
                  className={`${"text-paragraph leading-relaxed mt-5"} ${"paragraph paragraphAlt"}`}
                >
                  A few examples of the technologies I work with:
                </p>
                <div className="grid grid-rows-5 grid-flow-col">
                  {enjoy.map((item) => (
                    <p
                      key={item.id}
                      className={`${"text-paragraph leading-relaxed"} ${"paragraph paragraphAlt"}`}
                    >
                      ▹{item.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </article>
          <div className={`${styles.pic}`}>
            <Image src={profile} alt={"profile"} className="rounded" />
          </div>
        </div>
      </section>
    );
  }
}
