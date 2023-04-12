import React from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.scss";

function Home() {
  function handleClick(event: string) {
    if (event) {
      const element = document.getElementById(event as string);
      // console.log("element", element);
      if (element) {
        // 👇 Will scroll smoothly to the top of the next section
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <section
      id={"Home"}
      className={`${styles.Home} ${"sectionBg1 fade-in"} ${"animContainer"}`}
    >
      <div className={`${"mainBlock"}`}>
        <article className={`${styles.textContainer}`}>
          <h3 className={"subtitle"}>Hello,</h3>

          <h3 className="subtitle">
            I&apos;m <span>João Mota,</span>
          </h3>

          <h2 className={"subtitle"}>
            a <span>Web Developer</span>, and I build things.
          </h2>
          <p
            className={`${"text-paragraph leading-relaxed mt-2"} ${"paragraph"}`}
          >
            While coding, I like to build great user experiences with a keen eye
            to details!
          </p>
          <p
            className={`${"text-paragraph leading-relaxed mt-2"} ${"paragraph"}`}
          >
            I enjoy the most clean code, creativity, and autonomy to solve
            problems.
          </p>
        </article>
        <button
          type="button"
          className="mt-10"
          onClick={() => {
            handleClick("Projects");
          }}
        >
          Check out my Projects!
        </button>
      </div>
    </section>
  );
}

export default Home;
