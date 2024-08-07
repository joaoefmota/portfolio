import Head from "next/head";
import Home from "./home/Home";
import NavBar from "../components/NavBar";
import About_Me from "./about_me/About_Me";
import Projects from "./projects/Projects";
import Contact_Me from "./contacts/Contact_Me";
import Playground from "./playground/Playground";

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
      </div>
    </>
  );
}