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

export default function NavBar() {
  const [menuColor, setMenuColor] = useState("#222823");
  function useHamburgerMenuColor() {
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

        if (currentSection) {
          const backgroundColor =
            getComputedStyle(currentSection).getPropertyValue(
              "background-color"
            );
          const isLight = tinycolor(backgroundColor).isLight();
          setMenuColor(isLight ? "#222823" : "#e8e8e8");
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
    }, []);

    return menuColor;
  }

  const color = useHamburgerMenuColor();
  const router = useRouter();
  const [isOpen, setisOpen] = useState(false);
  const [backToTop, setBackToTop] = useState(false);

  function handleToggle(event: string | boolean) {
    const html = document.querySelector("html");
    setisOpen(!isOpen);
    const hamburgerReactDiv = document.querySelectorAll(".hamburger-react div");
    if (!isOpen && html != null) {
      html.style.overflow = "hidden";
      for (let i = 0; i < hamburgerReactDiv.length; i++) {
        (hamburgerReactDiv[i] as HTMLElement).style.background = "#222823";
      }
    } else {
      html!.style.overflow = "overlay";
      for (let i = 0; i < hamburgerReactDiv.length; i++) {
        (hamburgerReactDiv[i] as HTMLElement).style.background = menuColor;
      }
    }
    if (event) {
      const element = document.getElementById(event as string);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  const links = [
    {
      id: 1,
      name: "01: About me",
      link: "About_Me",
    },
    {
      id: 2,
      name: "02: Projects",
      link: "Projects",
    },
    { id: 3, name: "03: Playground", link: "Playground" },
    { id: 4, name: "04: Contact", link: "Contact" },
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
    router.push("/");
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
                <p
                  className={styles.menuTitles}
                  onClick={() => {
                    handleToggle(item.link);
                  }}
                >
                  {item.name}
                </p>
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
