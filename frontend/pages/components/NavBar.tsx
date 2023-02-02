import React, { useState } from "react";
import Hamburger from "hamburger-react";
import styles from "@/styles/NavBar.module.scss";
import Menu from "./Menu";
import Link from "next/link";

export default function NavBar() {
  const [isOpen, setisOpen] = useState(false);

  function handleToggle() {
    setisOpen(!isOpen);
    console.log(isOpen);
  }

  const links = [
    {
      id: 1,
      name: "01: About me",
      link: "#About_Me",
    },
    {
      id: 2,
      name: "02: Projects",
      link: "#Projects",
    },
    { id: 3, name: "03: Playground", link: "#Playground" },
    { id: 4, name: "04: Contact", link: "#Contact" },
  ];
  return (
    <>
      <Hamburger easing="ease-in" onToggle={handleToggle} />
      {isOpen ? (
        <div
          className={`${
            styles.menu
          } ${"flex flex-col items-left justify-center"}`}
        >
          {links.map((item) => (
            <Link
              href={item.link}
              className="font-bold"
              onClick={handleToggle}
              key={item.id}
            >
              <h1>{item.name}</h1>
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
}
