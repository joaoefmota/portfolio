import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import axios, { AxiosResponse } from "axios";

{
  /* STYLES */
}
import styles from "@/styles/login.module.scss";
{
  /* HOOKS */
}
import useFadeIn from "../../hooks/useFadeIn";

{
  /* IMAGES */
}
import back from "@/assets/images/back_dark.png";
import loginImg from "@/assets/images/login.png";
import jwtDecode from "jwt-decode";

export interface PlaygroundProps {}

function Login() {
  const { componentRef, isVisible } = useFadeIn(0.25);
  const loginRef = useRef(null);
  const [login, setLogin] = useState({ username: "", email: "", password: "" });
  const [authToken, setAuthToken] = useState<string>();
  // Error message for credential check
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const APIURL = process.env.NEXT_PUBLIC_API_URL;

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
            setIsSubmitted(false);
            return;
          } else {
            setAuthToken(() => {
              const token = res.data.token;
              localStorage.setItem("token", token!);
              return token;
            });
            setIsSubmitted(true);
            setTimeout(() => {
              router.push("/control");
            }, 1000);
          }
        }
      )
      .catch((error) => {
        if (error.response.status === 422) {  
          setIsSubmitted(false);
          const serverErrors = error.response.data.validationErrors;
          const errors = {} as { [key: string]: string };
          serverErrors.forEach((error: { field: string; message: string }) => {
            errors[error.field] = error.message;
          });
          setErrorMessages(errors);
        } else {
          setIsSubmitted(false);
          console.log(
            "Unexpected error response status:",
            error.response.status
          );
        }
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${APIURL}/validateToken?token=${token}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          if (result.status === 200) {
            router.push("/control");
          } else {
            return;
          }
        })
        .catch((err) => {
          console.log("error validate", err);
          return;
        });
    } else {
      return;
    }
  }, [APIURL, router]);

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
  };

  useEffect(() => {
    if (isSubmitted) {
      const intervalId = setInterval(() => {
        setIsSubmitted(false);
        clearInterval(intervalId);
      }, 3 * 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isSubmitted]);

  return (
    <>
      <section
        id={"Login"}
        className={`${"sectionBg1"} ${styles.Login} ${
          isVisible ? "fade-in " : ""
        }`}
        ref={componentRef}
      >
        <h1 className={"title self-start"}>Login</h1>
        <article className={styles.loginContainer}>
          <div className="flex flex-col items-center w-1/2 sm:w-full">
            <form className="flex flex-col items-center sm:flex-wrap gap-3 h-full w-full">
              <div>
                <label htmlFor="username" />
                <input
                  placeholder="username"
                  type="text"
                  name="username"
                  value={login.username}
                  onChange={loginHandler}
                />
                {errorMessages.username && !isSubmitted && (
                  <p className={"errorMessage"}>{errorMessages.username}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" />
                <input
                  placeholder="email"
                  type="text"
                  name="email"
                  value={login.email}
                  onChange={loginHandler}
                />
                {errorMessages.email && !isSubmitted && (
                  <p className={"errorMessage"}>{errorMessages.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" />
                <input
                  placeholder="password"
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={loginHandler}
                />
                {errorMessages.password && !isSubmitted && (
                  <p className={"errorMessage"}>{errorMessages.password}</p>
                )}
              </div>
              <button
                type="submit"
                onClick={submissionHandler}
                className="sm:mb-5"
              >
                Login
              </button>
            </form>
          </div>
          <div className="flex flex-col items-center gap-3 w-1/2">
            <Image src={loginImg} alt={"login"} className="w-1/2" />
            {isSubmitted ? (
              <div className={styles.submitButton}>
                <p className={`${"paragraph"} ${styles.submitText}`}>
                  You&apos;re loged in✔
                </p>
                <p className={`${"paragraph"} ${styles.submitText}`}>
                  Welcome!
                </p>
              </div>
            ) : null}
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
