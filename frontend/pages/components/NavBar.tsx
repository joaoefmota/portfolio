import React, { useEffect, useState } from "react";
import Link from "next/link";

import Clicabkles_Nav from "./Clickables_Nav";
import Hamburger from "hamburger-react";

import styles from "@/styles/NavBar.module.scss";

export default function NavBar() {
  const [isOpen, setisOpen] = useState(false);

  function handleToggle() {
    const html = document.querySelector("html");
    setisOpen(!isOpen);
    const hamburger = document.getElementsByClassName("hamburger-react");
    console.log("Hamburger", hamburger);
    if (!isOpen) {
      html.style.overflow = "hidden";
    } else {
      html.style.overflow = "auto";
    }
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

  const [backToTop, setBackToTop] = useState(false);

  useEffect(() => {
    const scrollListener = () => {
      if (window.pageYOffset > 100) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    };
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };
  return (
    <>
      <div className="flex flex-row justify-between items-center w-full">
        <div id={styles.burger}>
          <Hamburger
            easing="ease-in"
            onToggle={handleToggle}
            toggled={isOpen}
            toggle={setisOpen}
          />
        </div>
        {backToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className={`${styles.backToTop} ${"mr-1 mt-2 z-50 scroll-to-top"}`}
          >
            To top
          </button>
        )}
      </div>
      {isOpen ? (
        <nav id={`${styles.menuContainer}`}>
          <ul className={"flex flex-col items-left justify-between"}>
            {links.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className={styles.menuTitles}
                  onClick={handleToggle}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.clickablesNav}>
            <h1>Visit my pages at:</h1>
            <Clicabkles_Nav />
          </div>
          <div className={styles.sayHello}>
            <h1>Say hello directly at:</h1>
            <Link href={"mailto:joaoefmota@gmail.com"}>
              joaoefmota@gmail.com
            </Link>
          </div>
        </nav>
      ) : null}
    </>
  );
}
