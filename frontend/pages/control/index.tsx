import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import useFadeIn from "@/hooks/useFadeIn";
import axios, { AxiosError } from "axios";
import ReactLoading from "react-loading";
import jwtDecode from "jwt-decode";

import back from "@/assets/images/back_dark.png";

import styles from "@/styles/control.module.scss";

import Projects_Dashboard from "./components/Projects_Dashboard";
import Playground_Dashboard from "./components/Playground_Dashboard";

export default function Control() {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false); // To ensure that the 401 does not overlapse
  const { componentRef, isVisible } = useFadeIn(0.1);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [playgroundOpen, setPlaygroundOpen] = useState(false);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [loginStatus, setLoginStatus] = useState<number | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState("");
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const controlRef = useRef(null);
  const router = useRouter();
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    let storedToken: string | undefined;
    if (window.localStorage.token) {
      storedToken = window.localStorage.token as string;
    } else {
      storedToken = window.sessionStorage.token as string;
    }
    setToken(storedToken);
    if (storedToken) setHasAccess(true);

    const authUser = async () => {
      if (hasAccess && token) {
        try {
          const result = await axios.get(`${APIURL}/dashboard`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (result == undefined) {
            console.log("No data received from the server");
            return;
          }
          setLoading(false);
          setLoginStatus(result.status);
        } catch (err: AxiosError | unknown) {
          if (err instanceof Error) {
            console.log("Error: ", err.message);
            setHasAccess(false);
            setLoginStatus((err as AxiosError).response?.status);
            setLoading(false);
            setErrorMsg("Token is sick");
          } else if (err && (err as AxiosError).response?.status === 401) {
            // Token is invalid or has expired - redirect to login page or display error message
            console.log("Error code 401: Token is invalid or has expired");
            setLoading(false);
            setLoginStatus((err as AxiosError).response?.status);
            setErrorMsg("Token is invalid or has expired");
            setHasAccess(false);
          } else if (err && (err as AxiosError).code == "ERR_DUP_ENTRY") {
            console.log("The project with that name already exists.");
            setErrorMsg("The project with that name already exists.");
            setHasAccess(false);
          } else if (err && (err as AxiosError).code == "ERR_BAD_REQUEST") {
            console.log("Unauthorized");
            setErrorMsg("Unauthorized");
            setHasAccess(false);
          }
        }
      }
    };
    authUser();
  }, [APIURL, hasAccess, router, token]);

  useEffect(() => {
    componentRef.current = controlRef.current;
  }, [componentRef, controlRef]);

  const handleClick = (event: string) => {
    if (event == "projects") {
      setProjectsOpen(true);
      setPlaygroundOpen(false);
      if (projectsOpen) {
        setProjectsOpen(false);
      }
    } else if (event == "playground") {
      setPlaygroundOpen(true);
      setProjectsOpen(false);
      if (playgroundOpen) {
        setPlaygroundOpen(false);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsTokenExpired(true);
      setTimeout(() => {
        router.push("/auth");
      }, 3000);
      return;
    }

    const decodedToken = jwtDecode(token) as { exp: number };

    const intervalId = setInterval(() => {
      if (decodedToken.exp < Date.now() / 1000) {
        setIsTokenExpired(true);
        localStorage.removeItem("token");
      }
    }, 60 * 1000);

    return () => clearInterval(intervalId);
  }, [router]);

  if (loginStatus === 401) {
    localStorage.clear();
    sessionStorage.clear();
    return (
      <div className="flex flex-col justify-center items-center gap-5 h-screen w-screen">
        <h2 className="subtitle">Error: {errorMsg}.</h2>
        <p className="paragraph">
          You don&apos;t have clearance to see this page.
        </p>

        <button type="button" onClick={() => router.push("/auth")}>
          Back to Login
        </button>
        <button type="button" onClick={() => router.push("/#Home")}>
          Back to Home
        </button>
      </div>
    );
  }
  if (isTokenExpired === true) {
    setTimeout(() => {
      router.push("/auth");
    }, 3000);
    {
      return (
        <div className="flex flex-col justify-center items-center gap-5 h-screen w-screen">
          <ReactLoading
            type={"bubbles"}
            color="#222823"
            height={200}
            width={200}
          />
          <h2 className="subtitle">Your Token has expired</h2>
          <p className="paragraph">
            You&apos;ll be redirect to the login page in 3 seconds.
          </p>
        </div>
      );
    }
  }
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center gap-5 h-screen w-screen">
        <ReactLoading type={"cylon"} color="#222823" height={200} width={200} />
        <h2 className="subtitle">The content is being loaded.</h2>
        <p className="paragraph"> If it takes too long, please log in again</p>
        <button type="button" onClick={() => router.push("/auth")}>
          Back to Login
        </button>
      </div>
    );
  }
  return (
    <section
      id={"Control"}
      className={`${"sectionBg1"} ${styles.Control} ${
        isVisible ? "fade-in " : ""
      }`}
      ref={componentRef}
    >
      <h1 className={"title self-start mb-10"}>Control Dashboard</h1>

      <ul className="flex flex-row gap-5">
        <li onClick={() => handleClick("projects")} className="cursor-pointer">
          <p className="paragraph">Projects</p>
        </li>
        <li
          onClick={() => handleClick("playground")}
          className="cursor-pointer"
        >
          <p className="paragraph">Playground</p>
        </li>
      </ul>

      {playgroundOpen && <Playground_Dashboard authToken={token} />}
      {projectsOpen && <Projects_Dashboard authToken={token} />}

      <Link href={"/"} className={styles.back}>
        <Image src={back} width={25} alt={"go-back"} />
      </Link>
    </section>
  );
}
