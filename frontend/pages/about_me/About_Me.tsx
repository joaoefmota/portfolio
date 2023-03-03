import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import styles from "@/styles/about.module.scss";
import fade from "@/styles/fade.module.scss";

{
  /* IMAGES */
}
import profile from "@/assets/images/profile.jpg";
import useFadeIn from "../hooks/useFadeIn";

const enjoy = [
  { id: 1, name: "NextJs" },
  { id: 2, name: "SQL" },
  { id: 3, name: "Node.js" },
  { id: 4, name: "Tailwind" },
  { id: 5, name: "Typescript" },
  { id: 6, name: "Copywriting" },
  { id: 7, name: "Photography" },
  { id: 8, name: "Editing" },
];

export default function About_Me() {
  const { componentRef, isVisible } = useFadeIn(0.5);
  const aboutRef = useRef(null);

  useEffect(() => {
    componentRef.current = aboutRef.current;
  }, [componentRef, aboutRef]);

  return (
    <section
      id="About_Me"
      className={`${"sectionBg2"} ${styles.About} ${
        isVisible ? "fade-in " : ""
      }`}
      ref={aboutRef}
    >
      <h1 className={"title titleAlt mb-10 self-start"}>01: About me</h1>
      <div className="flex sm:flex-col flex-row w-full items-center justify-center">
        <article className="sm:w-full w-3/4">
          <p
            className={`${"text-paragraph leading-relaxed paragraph paragraphAlt mb-5"}`}
          >
            I was born in the beautiful city of{" "}
            <span className="span2">Porto, in Portugal</span>, but I'm currently
            embracing my new adventure in{" "}
            <span className="span2">Frankfurt am Main, Germany</span>. When I am
            far from the keyboard, you can find me cooking, watching films/TV
            shows, or traveling around!
          </p>
          <p
            className={`${"text-paragraph leading-relaxed paragraph paragraphAlt mb-5"}`}
          >
            I can say that it was only natural to follow a digital life. Since I
            was a kid that technology was up there in the top of my interests.
            The
            <span className="span2"> Web Developer</span> "bug" got a biger
            spark when I was completing my Multimedia masters, as I heads-on got
            to know programming. Above all, I would describe myself as a
            problem-solving type person, hence the emphasis on a
            <span className="span2"> versatile profile</span>. I value autonomy,
            and once working with others, you'll find I am the first to cheer
            others as I love <span className="span2">teamwork</span>.
          </p>

          <div className="flex flex-row gap-5 items-center">
            <div className="flex flex-col gap-2">
              <p
                className={`${"text-paragraph leading-relaxed paragraph paragraphAlt"}`}
              >
                A few examples of what I like to work with:
              </p>
              <div className="grid grid-rows-2 grid-flow-col">
                {enjoy.map((item) => (
                  <p key={item.id} className={`${"paragraph paragraphAlt mr-10"}`}>
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
