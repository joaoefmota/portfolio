import Head from "next/head";
import Home from "./home/Home";
import NavBar from "./components/NavBar";
import About_Me from "./about_me/About_Me";
import Projects from "./projects/Projects";
import Contact_Me from "./contacts/Contact_Me";
import Playground from "./playground/Playground";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>João Mota</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="app">
        <header>
          <NavBar />
        </header>
        <main tabIndex={-1}>
          <Home />
          <About_Me />
          <Projects />
          <Playground />
          <Contact_Me />
        </main>
        <Footer />
      </div>
    </>
  );
}

{
  /*
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  const handleWheel = (event) => {
    const deltaY = event.deltaY;
    const sectionIndex =
      deltaY > 0
        ? Math.ceil(window.scrollY / window.innerHeight)
        : Math.floor(window.scrollY / window.innerHeight);
    const sections = document.querySelectorAll("section");
    const section = sections[sectionIndex];
    console.log(section.offsetTop, section.clientHeight);
    if (section) {
      const yPosition =
        section.offsetTop + section.clientHeight / 2 - window.innerHeight / 2;
      setScrollPosition({ x: window.scrollX, yPosition });
      window.scrollTo({ top: yPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  console.log("scrollPosition", scrollPosition);


        <div
        className="cursor"
        style={{
          transform: `translate(${scrollPosition.x}px, ${scrollPosition.y}px)`,
        }}
      />
*/
}
