import React, { use, useEffect, useRef, useState } from "react";
import styles from "@/styles/contact.module.scss";
import axios from "axios";
import Link from "next/link";
import useFadeIn from "../../hooks/useFadeIn";
import Footer from "@/components/Footer";

function Contact_Me() {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );
  const { componentRef, isVisible } = useFadeIn(0.25);

  const contactRef = useRef(null);

  useEffect(() => {
    componentRef.current = contactRef.current;
  }, [componentRef, contactRef]);

  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    axios
      .post(`${APIURL}/contact`, data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          setIsSubmitted(true);
          setData({
            first_name: "",
            last_name: "",
            email: "",
            message: "",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          console.log(error.response.data.validationErrors.details); // handle validation errors
          const serverErrors = error.response.data.validationErrors.details;
          const errors = {} as { [key: string]: string };
          serverErrors.forEach(
            (error: { path: [][number]; message: string }) => {
              errors[error.path[0]] = error.message;
            }
          );
          setErrorMessages(errors);
          setIsSubmitted(false);
        } else {
          console.log(
            "Unexpected error response status:",
            error.response.status
          );
        }
      });
  };

  const handleInputFields = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // const { name, value } = event.target;
    setData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
    // console.log("Data", data);
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
        id={"Contact"}
        className={`${styles.Contact} ${"sectionBg1"} ${
          isVisible ? "fade-in " : ""
        }`}
        ref={componentRef}
      >
        <h1 className={"title self-start"}>04: Contact</h1>
        <p className="paragraph">
          Do you have a question or a proposal at hand? Then feel free to use
          the form down bellow.
        </p>
        <div
          className={`${"flex flex-col justify-center w-full justify-between"}`}
        >
          <form className="flex flex-row sm:flex-wrap gap-3 h-full w-full mt-5">
            <div className="w-1/2 sm:w-full">
              <div className={"firstName flex flex-col mb-3 sm:w-full"}>
                <label htmlFor="first-name">First name*</label>
                <input
                  onChange={handleInputFields}
                  placeholder="John/Johanna"
                  value={data.first_name}
                  name="first_name"
                  type="text"
                />
                {errorMessages.first_name && !isSubmitted && (
                  <p className={"errorMessage"}>{errorMessages.first_name}</p>
                )}
              </div>
              <div className={"lastName flex flex-col mb-3"}>
                <label htmlFor="last-name">Last name*</label>
                <input
                  onChange={handleInputFields}
                  placeholder="Doe"
                  value={data.last_name}
                  name="last_name"
                  type="text"
                />
                {errorMessages.last_name && !isSubmitted && (
                  <p className={"errorMessage"}>{errorMessages.last_name}</p>
                )}
              </div>
              <div className={"email flex flex-col mb-3"}>
                <label htmlFor="email">Email*</label>
                <input
                  onChange={handleInputFields}
                  placeholder="email@email.com"
                  value={data.email}
                  name="email"
                  type="text"
                />
                {errorMessages.email && !isSubmitted && (
                  <p className={"errorMessage"}>{errorMessages.email}</p>
                )}
              </div>
            </div>

            <div className={"w-full min-h-full"}>
              <label htmlFor="message">Your message*</label>
              <textarea
                placeholder="Hello João, how are you?"
                onChange={handleInputFields}
                value={data.message}
                className={`${"h-32 p-8"}`}
                name="message"
              />
              {errorMessages.message && !isSubmitted && (
                <p className={"errorMessage"}>{errorMessages.message}</p>
              )}
              <div className="flex flex-row justify-between">
                <div className="mt-2">
                  <h2 className="paragraph">Or contact directly to:</h2>
                  <Link
                    href={"mailto:joaoefmota@gmail.com"}
                    className="paragraph font-extrabold"
                  >
                    joaoefmota@gmail.com
                  </Link>
                </div>
                <button
                  onClick={handleSubmit}
                  className={styles.submit}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        {isSubmitted ? (
          <div className={styles.submitButton}>
            <p className={`${"paragraph"} ${styles.submitText}`}>
              Message sent ✔
            </p>
            <p className={`${"paragraph"} ${styles.submitText}`}>
              You are awesome!
            </p>
          </div>
        ) : null}
      </section>
      <Footer />
    </>
  );
}

export default Contact_Me;
