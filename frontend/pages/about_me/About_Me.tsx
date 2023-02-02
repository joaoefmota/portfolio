import React, { Component } from "react";
import Image from "next/image";

{
  /* IMAGES */
}
import profile from "@/assets/images/profile.jpg";
import github from "@/assets/images/github.png";
import cv from "@/assets/images/cv.png";
import linkedin from "@/assets/images/linkedin.png";
import Link from "next/link";

const clickables = [
  {
    id: 1,
    image: github,
    name: "github",
    link: "https://github.com/joaoefmota",
  },
  {
    id: 2,
    image: cv,
    name: "CV",
    link: "https://www.linkedin.com/in/joaoefmota/",
  },
  {
    id: 3,
    image: linkedin,
    name: "LinkedIn",
    link: "https://www.canva.com/design/DAFW_UEc9tY/wNVf68Dv7MIGOHtpJ8Osuw/view?utm_content=DAFW_UEc9tY&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink",
  },
];

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
                <p
                  className={`${"text-paragraph leading-relaxed"} ${"paragraph"}`}
                >
                  My interest in web development started when I was completing
                  my Multimedia masters.
                </p>
                <p
                  className={`${"text-paragraph leading-relaxed"} ${"paragraph"}`}
                >
                  Being a “full stack” creative that can hands-on things, from
                  the concept to the practice, is something that deeply
                  interests me. I consider myself as someone with a versatile
                  profile, that is always cheering and loves teamwork.
                </p>
                <p
                  className={`${"text-paragraph leading-relaxed mt-5"} ${"paragraph"}`}
                >
                  I enjoy:
                </p>
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
                <div className="flex flex-row gap-5 mt-9">
                  {clickables.map((item) => (
                    <div key={item.id}>
                      <Link href={item.link}>
                        <Image
                          src={item.image}
                          width={50}
                          height={50}
                          alt={item.name}
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <Image
                src={profile}
                alt="profile"
                className={"rounded-xl profile"}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}
