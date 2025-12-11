import { PropsAuth } from "@/types/ProjectInfoProps";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Projects({ authToken }: Readonly<PropsAuth>) {
  const [projectData, setProjectData] = useState({
    project_id: Number.parseInt(""),
    name: "",
    content: "",
    tools: "",
    packages: "",
    link: "",
    github: "",
    subTitle: "",
    lg_content1: "",
    lg_content2: "",
    aka: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<{ [key: string]: string }>({});
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    axios
      .post(`${APIURL}/api/projects/`, projectData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          setIsSubmitted(true);
          setProjectData({
            project_id: Number.parseInt(""),
            name: "",
            content: "",
            tools: "",
            packages: "",
            link: "",
            github: "",
            subTitle: "",
            lg_content1: "",
            lg_content2: "",
            aka: "",
          });
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          console.log("error:", error.response.data.projectValidation.details);
          const serverErrors = error.response.data.projectValidation.details;
          const errors = {} as { [key: string]: string };
          for (const err of serverErrors as { path: string[]; message: string }[]) {
            errors[err.path[0]] = err.message;
          }
          setErrorMsg(errors);
          setIsSubmitted(false);
          console.log("errors state", errorMsg);
        } else {
          console.log(
            "Unexpected error response status:",
            error.response.status
          );
        }
      });
  };

  useEffect(() => {
    if (isSubmitted) {
      const intervalId = setInterval(() => {
        setIsSubmitted(false);
        clearInterval(intervalId);
      }, 500);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isSubmitted]);

  const handleChange = (event: {
    target: { name: string; value: string | number };
  }) => {
    setProjectData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <article>
      <h2 className="title text-center">Create a new Project</h2>
      <form className="grid grid-cols-2 items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col w-64">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              onChange={handleChange}
              placeholder="Project..."
              value={projectData.name}
              name="name"
              type="text"
            />
            {errorMsg.name && !isSubmitted && (
              <p className={"errorMessage"}>{errorMsg.name}</p>
            )}
          </div>
          <div className="flex flex-col w-64">
            <label htmlFor="aka">As known as</label>
            <input
              id="aka"
              onChange={handleChange}
              placeholder="Aka"
              value={projectData.aka}
              name="aka"
              type="text"
            />
            {errorMsg.aka && !isSubmitted && (
              <p className={"errorMessage"}>{errorMsg.aka}</p>
            )}
          </div>
          <div className="flex flex-col w-64">
            <label htmlFor="content">Content</label>
            <input
              id="content"
              onChange={handleChange}
              placeholder="Short description..."
              value={projectData.content}
              name="content"
              type="text"
            />
            {errorMsg.content && !isSubmitted && (
              <p className={"errorMessage"}>{errorMsg.content}</p>
            )}
          </div>
          <div className="flex flex-col w-64">
            <label htmlFor="tools">Tools</label>
            <input
              id="tools"
              onChange={handleChange}
              placeholder="What tools..."
              value={projectData.tools}
              name="tools"
              type="text"
            />
            {errorMsg.tools && !isSubmitted && (
              <p className={"errorMessage"}>{errorMsg.tools}</p>
            )}
          </div>
          <div className="flex flex-col w-64">
            <label htmlFor="packages">Packages</label>
            <input
              id="packages"
              onChange={handleChange}
              placeholder="Packages or not"
              value={projectData.packages}
              name="packages"
              type="text"
            />
            {errorMsg.packages && !isSubmitted && (
              <p className={"errorMessage"}>{errorMsg.packages}</p>
            )}
          </div>
          <div className="flex flex-col w-64">
            <label htmlFor="github">Github</label>
            <input
              id="github"
              onChange={handleChange}
              placeholder="GitHub"
              value={projectData.github}
              name="github"
              type="text"
            />
            {errorMsg.github && !isSubmitted && (
              <p className={"errorMessage"}>{errorMsg.github}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col w-64">
            <label htmlFor="subTitle">Sub-Title</label>
            <input
              id="subTitle"
              onChange={handleChange}
              placeholder="subTitle"
              value={projectData.subTitle}
              name="subTitle"
              type="text"
            />
            {errorMsg.subTitle && !isSubmitted && (
              <p className={"errorMessage"}>{errorMsg.subTitle}</p>
            )}
          </div>
          <div className="flex flex-col w-64">
            <label htmlFor="lg_content1">Large Content 1</label>
            <input
              id="lg_content1"
              onChange={handleChange}
              placeholder="lg_content1"
              value={projectData.lg_content1}
              name="lg_content1"
              type="text"
            />
            {errorMsg.lg_content1 && !isSubmitted && (
              <p className={"errorMessage"}>{errorMsg.lg_content1}</p>
            )}
          </div>
          <div className="flex flex-col w-64">
            <label htmlFor="lg_content2">Large Content 2</label>
            <input
              id="lg_content2"
              onChange={handleChange}
              placeholder="lg_content2"
              value={projectData.lg_content2}
              name="lg_content2"
              type="text"
            />
            {errorMsg.lg_content2 && !isSubmitted && (
              <p className={"errorMessage"}>{errorMsg.lg_content2}</p>
            )}
          </div>
          <div className="flex flex-col w-64">
            <label htmlFor="link">Link</label>
            <input
              id="link"
              onChange={handleChange}
              placeholder="www.link.com"
              value={projectData.link}
              name="link"
              type="text"
            />
            {errorMsg.link && !isSubmitted && (
              <p className={"errorMessage"}>{errorMsg.link}</p>
            )}
          </div>
          <div className="flex flex-col w-64">
            <label htmlFor="project_id">Project Id</label>
            <input
              id="project_id"
              onChange={handleChange}
              placeholder="Project_id: n"
              value={projectData.project_id}
              name="project_id"
              type="number"
            />
            {errorMsg.project_id && !isSubmitted && (
              <p className={"errorMessage"}>{errorMsg.project_id}</p>
            )}
          </div>
          <button onClick={handleSubmit} className="w-64">
            Submit Project
          </button>
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
