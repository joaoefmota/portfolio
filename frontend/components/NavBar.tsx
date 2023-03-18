import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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

function useHamburgerMenuColor() {
  const router = useRouter();
  const [menuColor, setMenuColor] = useState("#222823");

  useEffect(() => {
    function handleScroll() {
      const sections = document.querySelectorAll(".sectionBg1, .sectionBg2");
      const currentPosition = window.scrollY;

      const currentSection = Array.from(sections).find((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        return (
          currentPosition >= sectionTop &&
          currentPosition < sectionTop + sectionHeight
        );
      });

      // console.log("currentSection", currentSection);

      if (currentSection) {
        const backgroundColor =
          getComputedStyle(currentSection).getPropertyValue("background-color");
        console.log("backgroundColor", backgroundColor);
        const isLight = tinycolor(backgroundColor).isLight();
        console.log("isLight", isLight);
        setMenuColor(isLight ? "#222823" : "#e8e8e8");
        console.log("menu color", menuColor);

        const sectionId = currentSection.getAttribute("id");
        const url = new URL(window.location.href);
        url.hash = sectionId ?? "";
        window.history.pushState(null, "", url);
      }
    }
    handleScroll();
    const debouncedHandleScroll = debounce(handleScroll, 40);

    window.addEventListener("resize", debouncedHandleScroll);
    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("resize", debouncedHandleScroll);
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return menuColor;
}

export default function NavBar() {
  const color = useHamburgerMenuColor();
  const router = useRouter();
  const [isOpen, setisOpen] = useState(false);
  const [backToTop, setBackToTop] = useState(false);

  function handleToggle() {
    const html = document.querySelector("html");
    setisOpen(!isOpen);
    if (!isOpen && html != null) {
      html.style.overflow = "hidden";
    } else {
      html!.style.overflow = "auto";
    }
  }

  const links = [
    {
      id: 1,
      name: "01: About me",
      link: "/#About_Me",
    },
    {
      id: 2,
      name: "02: Projects",
      link: "/#Projects",
    },
    { id: 3, name: "03: Playground", link: "/#Playground" },
    { id: 4, name: "04: Contact", link: "/#Contact" },
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
    router.push("/#Home");
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
            color={color}
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
              <li key={item.id} className="w-fit">
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
          <button
            type="button"
            onClick={() => {
              router.push("/auth");
              document.querySelector("html")!.style.overflow = "auto";
            }}
            className={styles.loginButton}
          >
            Log in
          </button>
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
