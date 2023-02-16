import React, { use, useState } from "react";
import styles from "@/styles/contact.module.scss";
import axios from "axios";

function Contact_Me() {
  const [field, setField] = useState({
    first_name: " ",
    last_name: " ",
    email: " ",
    message: " ",
  });

  const [isSubmitted, setIsSubmited] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>();

  const handleInputFields = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // const { name, value } = event.target;
    setField((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    axios
      .post("http://localhost:5005/contact", field, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          setIsSubmited(true);
          setField({
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
      <section id={"Contact"} className="relative">
        <div className={`${"mainBlock"} ${"flex flex-col justify-center"}`}>
          <h1 className={"title"}>04: Contact</h1>
          {isSubmitted && (
            <div
              className={
                "container mb-16 mt-1 py-6 px-4 rounded-3xl bg-slate-700 h-1/2"
              }
            >
              <p
                className={
                  "text-white text-center sm:text-xl md:text-2xl xl:text-2xl"
                }
              >
                Message sent ✔
              </p>
            </div>
          )}
          <form className="flex flex-row sm:flex-wrap gap-5 w-full pr-5">
            <div className="w-1/2">
              <div className={styles.firstName}>
                <label htmlFor="first-name">First name*</label>
                <input
                  onChange={handleInputFields}
                  value={field.first_name}
                  className="h-12 p-8"
                  name="first_name"
                  type="text"
                />
              </div>
              <div className={styles.lastName}>
                <label htmlFor="last-name">Last name*</label>
                <input
                  onChange={handleInputFields}
                  value={field.last_name}
                  className="h-12 p-8"
                  name="last_name"
                  type="text"
                />
              </div>
              <div className={styles.email}>
                <label htmlFor="email">Email*</label>
                <input
                  onChange={handleInputFields}
                  value={field.email}
                  className="h-12 p-8"
                  name="email"
                  type="text"
                />
              </div>
            </div>

            <div className={styles.message}>
              <label htmlFor="message">Your message*</label>
              <input
                onChange={handleInputFields}
                value={field.message}
                className={`${"h-32 p-8"} ${styles.textarea}`}
                name="message"
                type="text"
              />
              <div className={styles.submit}>
                <button onClick={handleSubmit} className="mt-5" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Contact_Me;
