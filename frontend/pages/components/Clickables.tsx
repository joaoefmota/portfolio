import React, { Component } from "react";
import Link from "next/link";
import Image from "next/image";

import github from "@/assets/images/github.png";
import cv from "@/assets/images/cv.png";
import linkedin from "@/assets/images/linkedin.png";

import styles from "@/styles/clickables.module.scss";

export default class Clickables extends Component {
  render() {
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
        link: "https://www.canva.com/design/DAFW_UEc9tY/wNVf68Dv7MIGOHtpJ8Osuw/view?utm_content=DAFW_UEc9tY&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink",
      },
      {
        id: 3,
        image: linkedin,
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/joaoefmota/",
      },
    ];
    return (
      <div className={`${"flex flex-col gap-5 mt-9"} ${styles.container}`}>
        {clickables.map((item) => (
          <div key={item.id}>
            <Link href={item.link}>
              <Image
                src={item.image}
                width={50}
                height={50}
                alt={item.name}
                className={styles.icons}
              />
            </Link>
          </div>
        ))}
      </div>
    );
  }
}
