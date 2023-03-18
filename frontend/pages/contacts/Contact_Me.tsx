import React, { use, useEffect, useRef, useState } from "react";
import styles from "@/styles/contact.module.scss";
import axios from "axios";
import Link from "next/link";
import useFadeIn from "../../hooks/useFadeIn";

function Contact_Me() {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmited] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>();

  const { componentRef, isVisible } = useFadeIn(0.25);

  const contactRef = useRef(null);

  useEffect(() => {
    componentRef.current = contactRef.current;
  }, [componentRef, contactRef]);

  const handleInputFields = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // const { name, value } = event.target;
    setData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
    console.log("Data", data);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    axios
      .post("http://localhost:5005/contact", data, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          setIsSubmited(true);
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
          const serverErrors = error.response.data.validationErrors;
          const errors = {} as { [key: string]: string };
          serverErrors.forEach((error: { field: string; message: string }) => {
            errors[error.field] = error.message;
          });
          setErrors(errors);
          setIsSubmited(false);
        }
      });
  };

  return (
    <>
      <section
        id={"Contact"}
        className={`${styles.Contact} ${"sectionBg1"} ${
          isVisible ? "fade-in " : ""
        }`}
        ref={contactRef}
      >
        <h1 className={"title self-start"}>04: Contact</h1>
        <p className="paragraph">
          Do you have a question or a proposal at hand? Maybe just drop by to
          write an hello? Then feel free to use the form down bellow.
        </p>
        <div
          className={`${"flex flex-col justify-center w-full justify-between"}`}
        >
          <form className="flex flex-row sm:flex-wrap gap-5 h-full w-full mt-16 mb-16">
            <div className="w-1/2 sm:w-full">
              <div className={styles.firstName}>
                <label htmlFor="first-name">First name*</label>
                <input
                  onChange={handleInputFields}
                  placeholder="John/Johanna"
                  value={data.first_name}
                  name="first_name"
                  type="text"
                />
              </div>
              <div className={styles.lastName}>
                <label htmlFor="last-name">Last name*</label>
                <input
                  onChange={handleInputFields}
                  placeholder="Doe"
                  value={data.last_name}
                  name="last_name"
                  type="text"
                />
              </div>
              <div className={styles.email}>
                <label htmlFor="email">Email*</label>
                <input
                  onChange={handleInputFields}
                  placeholder="email@email.com"
                  value={data.email}
                  name="email"
                  type="text"
                />
              </div>
              <div>
                <h2 className="paragraph">Or contact directly to:</h2>
                <Link
                  href={"mailto:joaoefmota@gmail.com"}
                  className="text-2xl font-extrabold"
                >
                  joaoefmota@gmail.com
                </Link>
              </div>
            </div>

            <div className={styles.message}>
              <label htmlFor="message">Your message*</label>
              <textarea
                placeholder="Hello João, how are you?"
                onChange={handleInputFields}
                value={data.message}
                className={`${"h-32 p-8"}`}
                name="message"
              />
              <button
                onClick={handleSubmit}
                className={styles.submit}
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        {isSubmitted && (
          <div
            className={
              "w-fit mx-auto mt-1 py-4 px-6  rounded-3xl bg-slate-700 "
            }
          >
            <p
              className={
                "text-white text-center sm:text-xl md:text-2xl xl:text-2xl"
              }
            >
              Message sent ✔
            </p>
            <p
              className={
                "text-white text-center sm:text-xl md:text-2xl xl:text-2xl"
              }
            >
              You are awesome!
            </p>
          </div>
        )}
      </section>
    </>
  );
}

export default Contact_Me;
