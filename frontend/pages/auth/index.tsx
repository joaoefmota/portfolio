import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import useFadeIn from "../../hooks/useFadeIn";
import axios, { AxiosResponse } from "axios";

import back from "@/assets/images/back_dark.png";
import styles from "@/styles/login.module.scss";
import { useRouter } from "next/router";

export interface PlaygroundProps {}

function Login() {
  const { componentRef, isVisible } = useFadeIn(0.25);
  const loginRef = useRef(null);
  const [login, setLogin] = useState({ username: "", email: "", password: "" });
  const [authToken, setAuthToken] = useState<string>();
  // Error message for credential check
  const [errorMsg, setErrorMsg] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const APIURL = "http://localhost:5005";

  function submissionHandler(
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>
  ) {
    event.preventDefault();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    axios
      .post(`${APIURL}/api/login`, login, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
      .then(
        (
          res: AxiosResponse<{
            token: string | undefined;
            error: string | undefined;
          }>
        ) => {
          setLogin({ username: "", email: "", password: "" });
          if (res.data.token == null) {
            console.error("No authentication token", res.data.error);
            return;
          } else {
            setAuthToken(res.data.token);
            console.log("Login successful", authToken);
            // router.push("/control");
          }
        }
      )
      .catch((err: any) => {
        if (err.response.status === 403) {
          const serverErrors = err.response.data.validationErrors;
          const errors = {} as { [key: string]: string };

          serverErrors.forEach((error: { field: string; message: string }) => {
            errors[error.field] = error.message;
          });
          setErrorMsg(errors);
        }
      });
  }

  useEffect(() => {
    componentRef.current = loginRef.current;
  }, [componentRef, loginRef]);

  const loginHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLogin((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    console.log("login", login);
  };

  return (
    <>
      <section
        id={"Login"}
        className={`${"sectionBg1"} ${styles.Login} ${
          isVisible ? "fade-in " : ""
        }`}
        ref={loginRef}
      >
        <article className={styles.loginContainer}>
          <div className="flex flex-col items-center py-5 w-full">
            <h1 className={"title mb-10 "}>Login</h1>
            <form className="flex flex-col items-center sm:flex-wrap h-full w-full">
              <div>
                <label htmlFor="username" />
                <input
                  placeholder="username"
                  type="text"
                  name="username"
                  value={login.username}
                  onChange={loginHandler}
                ></input>
              </div>
              <div>
                <label htmlFor="email" />
                <input
                  placeholder="email"
                  type="text"
                  name="email"
                  value={login.email}
                  onChange={loginHandler}
                ></input>
              </div>
              <div>
                <label htmlFor="password" />
                <input
                  placeholder="password"
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={loginHandler}
                ></input>
              </div>
              <button type="submit" onClick={submissionHandler}>
                Login
              </button>
            </form>
          </div>
        </article>

        <Link href={"/#Home"} className={styles.back}>
          <Image src={back} width={25} alt={"go-back"} />
        </Link>
      </section>
    </>
  );
}

export default Login;
