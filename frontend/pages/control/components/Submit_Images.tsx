import useFadeIn from "@/hooks/useFadeIn";
import { ProjectProps, PropsAuth } from "@/types/ProjectInfoProps";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

interface SubmitProps {
  projectData: ProjectProps[];
  authToken: string;
}

export default function Submit_Images({ authToken, projectData }: SubmitProps) {
  const [projectName, setProjectName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  const otherImagesRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleSubmitMain = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (mainImageInputRef == null) return; // check if ref was initialized
    // console.log("mainImageInputRef", mainImageInputRef.current.files[0]);
    const formData = new FormData(); // Create new FormData object to hold the data we want to send

    formData.append("uploaded_file", mainImageInputRef.current!.files![0]); // Append to the object the file we're getting from ref, to populate that object
    axios
      .post(
        `http://localhost:5005/api/projects/uploadMain?projectName=${projectName}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((result) => {
        if (result === undefined) {
          console.error("No data was submitted");
        }
        setIsSubmitted(true);
      })
      .catch((err) => {
        if (err) {
          console.error("Error", err);
        }
      });
  };

  const handleSubmitOthers = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!otherImagesRefs) return; // check if ref was initialized

    const formData = new FormData(); // Create new FormData object to hold the data we want to send

    otherImagesRefs.forEach((ref) => {
      if (ref.current?.files?.length) {
        formData.append("file", ref.current.files[0]); // Append each file to the "files" key in the object
      }
    });

    axios
      .post(
        `http://localhost:5005/api/projects/uploadImages?projectName=${projectName}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((result) => {
        if (result === undefined) {
          console.error("No data was submitted");
        }
        setIsSubmitted(true);
      })
      .catch((err) => {
        if (err) {
          console.error("Error", err);
        }
      });
  };

  const handleName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    setProjectName(selectedName);
    console.log(
      "find Name",
      projectData.find((info) => info.name === selectedName)?.name
    );
    setProjectName(
      projectData.find((info) => info.name === selectedName)?.name || ""
    );
  };

  useEffect(() => {
    console.log("projectName", projectName);
  }, [projectName]);

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

  return (
    <article className="flex flex-col">
      <h2 className="title text-center">Submit Images</h2>
      <select
        title="project_name"
        value={projectName}
        onChange={handleName}
        className="self-center"
      >
        <option value="">---</option>
        {projectData.map((info) => (
          <option key={info.name} value={info.name}>
            {info.name}
          </option>
        ))}
      </select>
      <h2 className="title text-center">Main Image</h2>
      <div className="flex flex-row items-center gap-3 justify-center">
        <form encType="multipart/form-data">
          <div className="flex flex-col">
            <label>Main Image</label>
            <input
              placeholder={"File to upload"}
              type={"file"}
              name={"uploaded_file"}
              ref={mainImageInputRef}
            />
          </div>
          <button type="submit" onClick={handleSubmitMain}>
            Send!
          </button>
        </form>
      </div>
      <h2 className="title text-center">Other Images</h2>
      <div className="flex flex-row items-center gap-3 justify-center">
        <h2 className="title text-center">Other Images</h2>
        <div className="flex flex-row items-center gap-3 justify-center">
          <form
            encType="multipart/form-data"
            className="grid grid-cols-2 gap-3"
          >
            {otherImagesRefs.map((ref, index) => (
              <div className="flex flex-col" key={index}>
                <label>Other Image {index + 1}</label>
                <input
                  placeholder={"File to upload"}
                  type={"file"}
                  name={"file"}
                  ref={ref}
                />
              </div>
            ))}
            <button type="submit" onClick={handleSubmitOthers}>
              Send!
            </button>
          </form>
        </div>
      </div>
      {isSubmitted && (
        <div
          className={"w-fit mx-auto mt-1 py-4 px-6  rounded-3xl bg-slate-700 "}
        >
          <p
            className={
              "text-white text-center sm:text-xl md:text-2xl xl:text-2xl"
            }
          >
            Info Submitted ✔
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
