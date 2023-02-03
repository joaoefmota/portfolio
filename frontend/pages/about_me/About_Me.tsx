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
  { id: 3, name: "Node" },
  { id: 4, name: "Tailwind" },
  { id: 5, name: "Typescript" },
  { id: 6, name: "Copywriting" },
  { id: 7, name: "Editing" },
  { id: 8, name: "Video" },
];

export default class About_Me extends Component {
  render() {
    return (
      <section id={"About_Me"} className="relative">
        <div className={`${"mainBlock"}`}>
          <div className="flex flex-col items-left">
            <h1 className={"title"}>01: About me</h1>
            <div className="flex flex-row gap-10">
              <div className="flex flex-col">
                <div>
                  <p
                    className={`${"text-paragraph leading-relaxed"} ${"paragraph"}`}
                  >
                    My interest in web development started when I was completing
                    my Multimedia masters. Being a “full stack” creative that
                    can hands-on things, from the concept to the practice, is
                    something that deeply interests me. I consider myself as
                    someone with a versatile profile, that is always cheering
                    and loves teamwork.
                  </p>
                </div>
                <div>
                  <p
                    className={`${"text-paragraph leading-relaxed mt-5"} ${"paragraph"}`}
                  >
                    I enjoy:
                  </p>
                </div>

                <div className="grid grid-rows-2 grid-flow-col">
                  {enjoy.map((item) => (
                    <p
                      key={item.id}
                      className={`${"text-paragraph leading-relaxed"} ${"paragraph"}`}
                    >
                      ▹{item.name}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <Image
                  src={profile}
                  alt="profile"
                  className={`${"rounded-xl profile"} ${styles.profile1}`}
                />
              </div>
            </div>
            <div>
              <Image
                src={profile}
                alt="profile"
                className={`${"rounded-xl profile"} ${styles.profile2}`}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
