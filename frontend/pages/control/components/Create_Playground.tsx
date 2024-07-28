import { PropsAuth } from "@/types/ProjectInfoProps";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

export default function Create_Playground({ authToken }: PropsAuth) {
  const [playgroundData, setPlaygroundData] = useState({
    playground_id: "",
    name: "",
    content: "",
    tools: "",
    link: "",
  });
  const [errorMsg, setErrorMsg] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  const handleSumit = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    axios
      .post(`${APIURL}/api/playground`, playgroundData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((result) => {
        if (result === undefined || result === null)
          console.log("No data was submited");
        setPlaygroundData({
          playground_id: "",
          name: "",
          content: "",
          tools: "",
          link: "",
        });
        setIsSubmitted(true);
      })
      .catch(
        (
          error: AxiosError<{
            validationErrors: any;
            error: {
              response: {
                data: {
                  validationErrors: {
                    details: string[];
                  };
                };
              };
            };
          }>
        ) => {
          if (error) {
            console.error("error", error);
            if (error.response?.status === 422) {
              setIsSubmitted(false);
              const serverErrors = error.response.data.validationErrors.details;
              const errors = {} as { [key: string]: string };
              serverErrors.forEach(
                (error: { path: string; message: string }) => {
                  errors[error.path] = error.message;
                }
              );
              setErrorMsg(errors);
            }
          }
        }
      );
  };

  const handleChange = (event: {
    target: { name: string; value: string | number };
  }) => {
    setPlaygroundData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <article>
      <h2 className="title text-center">Create a new Playground</h2>
      <form className="grid grid-cols-2 items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col">
            <label>Name</label>
            <input
              onChange={handleChange}
              placeholder="Playground..."
              value={playgroundData.name}
              name="name"
              type="text"
            />
            {errorMsg.name && !isSubmitted && (
              <p className={"errorMessage"}>{errorMsg.name}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>Content</label>
            <input
              onChange={handleChange}
              placeholder="Description..."
              value={playgroundData.content}
              name="content"
              type="text"
            />
            {errorMsg.content && !isSubmitted && (
              <p className={"errorMessage"}>{errorMsg.content}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>Tools</label>
            <input
              onChange={handleChange}
              placeholder="What tools..."
              value={playgroundData.tools}
              name="tools"
              type="text"
            />
            {errorMsg.tools && !isSubmitted && (
              <p className={"errorMessage"}>{errorMsg.tools}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col">
            <label>Link</label>
            <input
              onChange={handleChange}
              placeholder="Link to"
              value={playgroundData.link}
              name="link"
              type="text"
            />
            {errorMsg.link && !isSubmitted && (
              <p className={"errorMessage"}>{errorMsg.link}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label>Playground Id</label>
            <input
              onChange={handleChange}
              placeholder="Playground_id: n"
              value={playgroundData.playground_id}
              name="playground_id"
              type="text"
            />
            {errorMsg.playground_id && !isSubmitted && (
              <p className={"errorMessage"}>{errorMsg.playground_id}</p>
            )}
          </div>

          <button onClick={handleSumit}>Submit Playground</button>
        </div>
      </form>
      {isSubmitted && (
        <div
          className={"w-fit mx-auto mt-1 py-4 px-6  rounded-3xl bg-slate-700 "}
        >
          <p
            className={
              "text-white text-center sm:text-xl md:text-2xl xl:text-2xl"
            }
          >
            Playground Sumbitted ✔
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
    </article>
  );
}
