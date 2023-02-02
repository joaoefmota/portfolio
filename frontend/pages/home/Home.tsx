import React from "react";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  return (
    <>
      <section>
        <div className={`${"mainBlock"} ${"flex flex-col justify-center"}`}>
          <h1 className={"title"}>Hello there! I am João.</h1>
          <h2 className={"subtitle"}>I build stuff on the web.</h2>
          <p className={`${"text-paragraph leading-relaxed"} ${"paragraph"}`}>
            A super optimistic junior web developer, waiting to change the world
            with awesome ideas!
          </p>
          <div className="flex flex-row items-center gap-5 justify-between mt-2 w-full">
            <button
              type="button"
              className="bg-paragraph w-72 h-12 self-end text-white text-2xl mt-5 rounded"
              onClick={() => router.push("#Projects")}
            >
              Projects
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
