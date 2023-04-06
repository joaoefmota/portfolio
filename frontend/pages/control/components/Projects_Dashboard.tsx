import React, { useEffect, useRef, useState } from "react";
import Create_Project from "./Create_Project";
import Delete_Project from "./Delete_Project";
import { ProjectProps, PropsAuth } from "@/types/ProjectInfoProps";
import axios, { AxiosResponse } from "axios";
import Submit_Images from "./Submit_Images";

export default function Projects_Dashboard({ authToken }: PropsAuth) {
  const [projectData, setProjectData] = useState<ProjectProps[]>([]);
  const [projectInfo, setProjectInfo] = useState({
    project_id: "",
    name: "",
    subTitle: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/projects")
      .then((result: AxiosResponse) => {
        console.log("result Playground", result.data);
        setProjectData(result.data);
      });
  }, []);

  return (
    <div className="flex flex-row">
      <div className="w-96 mx-auto">
        <div className="flex flex-row flex-wrap">
          {projectInfo &&
            projectData.map((info) => {
              return (
                <ul key={info.project_id} className="flex flex-row mb-5">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setProjectInfo((prevForm) => ({
                          ...prevForm,
                          name: info.name,
                          subTitle: info.subTitle,
                          project_id: String(info.project_id),
                        }));
                      }}
                    >
                      {info.project_id}
                    </button>
                  </li>
                </ul>
              );
            })}
        </div>
        <div className="flex flex-col">
          <ul className="flex flex-col gap-3 h-52">
            <li>
              <span className="font-bold">name:</span> {projectInfo.name}
            </li>
            <li>
              <span className="font-bold">content:</span> {projectInfo.subTitle}
            </li>
            <li>
              <span className="font-bold">id:</span> {projectInfo.project_id}
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col">
        <Create_Project authToken={authToken} />
        <Submit_Images authToken={authToken} projectData={projectData} />
        <Delete_Project authToken={authToken} projectData={projectData} />
      </div>
    </div>
  );
}
