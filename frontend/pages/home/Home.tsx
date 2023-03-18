import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/home.module.scss";

function Home() {
  const router = useRouter();
  
  return (
    <>
      <section
        id={"Home"}
        className={`${styles.Home} ${"sectionBg1 fade-in"} ${"animContainer"}`}
      >
        <div className={`${"mainBlock"}`}>
          <article className={`${styles.textContainer}`}>
            <h3 className={"subtitle"}>Hello,</h3>

            <h3 className="subtitle">
              I'm <span>João Mota,</span>
            </h3>

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
          <button className="mt-10" onClick={() => router.push("/#Projects")}>
            Check out my Projects!
          </button>
        </div>
      </section>
    </>
  );
}

export default Home;
