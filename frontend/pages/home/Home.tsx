import React from "react";
import { useRouter } from "next/router";
import styles from "@/styles/home.module.scss";
import profile from "@/assets/images/profile.jpg";
import Image from "next/image";

function Home() {
  const router = useRouter();
  return (
    <>
      <section id={`${"Home"}`} className={styles.Home}>
        <div className={`${"mainBlock"}`}>
          <article className={`${styles.textContainer}`}>
            <h3 className={"subtitle"}>Hello, I'm</h3>
            <h1 className={`${"title"}`}>João Mota,</h1>
            <h2 className={"subtitle"}>
              a <span>Web Developer</span>, and I build things.
            </h2>
            <p
              className={`${"text-paragraph leading-relaxed mt-2"} ${"paragraph"}`}
            >
              While coding, I like to build great user experiences with a keen
              eye to details!
            </p>
            <p
              className={`${"text-paragraph leading-relaxed mt-2"} ${"paragraph"}`}
            >
              I enjoy the most clean code, creativity, and autonomy to solve
              problems.
            </p>
          </article>
          <button
            className="mt-10"
            onClick={() => router.push("/#Projects")}
            smooth={true}
          >
            Check out my projects!
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;

{
  /* 
          <div className="flex flex-row items-center gap-5 justify-between mt-2 w-full">
            <button
              type="button"
              className="bg-paragraph w-40 h-12 self-end text-white text-2xl mt-5 rounded text-center"
              onClick={() => router.push("#Projects")}
            >
              Projects
            </button>
          </div>
*/
}
