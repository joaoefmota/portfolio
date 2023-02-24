import React, { useEffect, useState } from "react";
import Link from "next/link";
import $ from "jquery";
import tinycolor from "tinycolor2";
import debounce from "lodash/debounce";

{
  /* COMPONENTS */
}
import Clicabkles_Nav from "./Clickables_Nav";
import Hamburger from "hamburger-react";

{
  /* STYLES */
}
import styles from "@/styles/NavBar.module.scss";

export default function NavBar() {
  const [isOpen, setisOpen] = useState(false);
  const [backToTop, setBackToTop] = useState(false);

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

  useEffect(() => {
    function checkBackgroundColor() {
      let currentSection = null;

      // Loop through all the sections and determine the current section
      $(".sectionBg1, .sectionBg2").each(function () {
        const sectionTop = $(this).offset()?.top;
        const sectionHeight = $(this).outerHeight();
        const scrollPosition = $(window).scrollTop();
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          currentSection = this;
          return false; // Exit the loop
        }
      });
      console.log("currentSEction", currentSection);
      // Get the background color of the current section
      const backgroundColor = $(currentSection).css("background-color");
      console.log("backgroundColor", backgroundColor);

      // Determine if the background color is light or dark
      const isLight = tinycolor(backgroundColor).isLight();
      console.log("isLight", isLight);
      const colorClass = isLight ? "light" : "dark";

      // Update the hamburger menu's class
      $(".hamburger-react").removeClass("dark light").addClass(colorClass);
    }

    // debounce to prevent the icon from changing all of a sudden
    // const debouncedCheckBackgroundColor = debounce(checkBackgroundColor, 100);

    checkBackgroundColor();

    // Add event listeners to the window object
    $(window).on("resize", checkBackgroundColor);
    $(window).on("scroll", checkBackgroundColor);

    // Clean up function to remove event listeners
    return () => {
      $(window).off("resize", checkBackgroundColor);
      $(window).off("scroll", checkBackgroundColor);
    };
  }, []);

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
