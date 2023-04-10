import { ProjectProps } from "@/types/ProjectInfoProps";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface DeleteProps {
  projectData: ProjectProps[];
  authToken: string | undefined;
}

export default function Delete_Project({
  projectData,
  authToken,
}: DeleteProps) {
  const [projectId, setProjectId] = useState<string>("");
  const [projectName, setProjectName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const APIURL = process.env.API_URL;

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios
      .delete(`${APIURL}/api/project-nr/?project_id${projectId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((result) => {
        if (result === undefined) {
          console.error("No data was submited");
        }
        setIsSubmitted(true);
      })
      .catch((error) => {
        if (error) {
          console.error("error", error);
        }
      });
  };

  const handleId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setProjectId(selectedId);
    console.log(
      "find Name",
      projectData.find((info) => info.project_id === selectedId)?.name
    );
    setProjectName(
      projectData.find((info) => info.project_id === selectedId)?.name || ""
    );
  };

  useEffect(() => {
    console.log("projectId", projectId);
    console.log("projectName", projectName);
    console.log("playgroundData", projectData);
  }, [projectData, projectId, projectName]);

  return (
    <article>
      <h2 className="title text-center">Delete a Playground</h2>
      <div className="flex flex-row flex-wrap justify-center items-center gap-5">
        <select title="playground_id" value={projectId} onChange={handleId}>
          <option value="">---</option>
          {projectData && projectData.map((info) => (
            <option key={info.project_id} value={info.project_id}>
              {info.project_id}
            </option>
          ))}
        </select>
        {projectId && (
          <>
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </>
        )}
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
