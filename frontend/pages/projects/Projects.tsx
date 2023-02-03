import React, { useState } from "react";
import Link from "next/link";
import useAxios from "../hooks/useAxios";
import axios from "axios";
import ProjectTile from "../components/ProjectTile";

export default function Projects() {
  const APIURL = "http://localhost:5005";
  const [imagesMap, setImagesMap] = useState<Map<string, string>>();

  const projectsArray = useAxios({
    url: `${APIURL}/projects`,
    initialValue: [],
    transform: (projects) => {
      const _imagesMap = new Map();
      Promise.all(
        projects.map((project) => {
          return axios
            .get(`${APIURL}/images/?project=${project.name}`)
            .then((result) => {
              console.log("result.data", result.data);
              _imagesMap.set(project.name, APIURL + result.data[0].source);
            });
        })
      ).then(() => {
        setImagesMap(_imagesMap);
      });
      return projects;
    },
  });

  console.log("ProjectsArray", projectsArray);

  console.log("imagesMap", imagesMap);

  return (
    <section id={"Projects"} className="relative">
      <div className={`${"mainBlock"}`}>
        <div className="flex flex-col items-left">
          <h1 className={"title"}>02: Projects</h1>
          <div className="grid grid-col-3 grid-flow-col gap-4 mb-20 sm:grid-rows-3">
            {projectsArray != null
              ? projectsArray.map((project) => (
                  <div className="mb-20" key={project.id}>
                    <Link href={`/projects/${project.id}`}>
                      <ProjectTile
                        src={
                          imagesMap ? imagesMap.get(project.name) : undefined
                        }
                        alt={project.name}
                        name={project.name}
                      />
                    </Link>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </section>
  );
}
