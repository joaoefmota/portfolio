import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "@/styles/projects.module.scss";
import ProjectTile from "../../components/ProjectTile";
import { ProjectProps } from "@/types/ProjectInfoProps";
import useFadeIn from "../../hooks/useFadeIn";
import Carousel from "@/components/Carousel";
import Image from "next/image";

export default function Projects() {
  const [imagesMap, setImagesMap] = useState<Map<string, string>>();
  const { componentRef: projectsRef, isVisible } = useFadeIn(0.25);
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  const projectsArray = useAxios({
    url: `${APIURL}/api/projects`,
    initialValue: [],
    transform: (projects) => {
      const _imagesMap = new Map();
      Promise.all(
        projects.map((project: ProjectProps) => {
          return axios
            .get(`${APIURL}/images/?project=${project.name}`)
            .then((result) => {
              const image = result.data.find((image: { source: string }) =>
                image.source.includes(`proj_container/${project.name}`)
              );
              if (image) {
                _imagesMap.set(project.name, APIURL + image.source);
              }
            });
        })
      ).then(() => setImagesMap(_imagesMap));
      return projects;
    },
  });

  return (
    <section
      id="Projects"
      className={`${"sectionBg1"} ${styles.Projects} ${isVisible ? "fade-in" : ""
        }`}
      ref={projectsRef}
    >
      <h1 className="title self-start">02: Projects</h1>
      <p className="paragraph self-start">
        Some of the projects I was involved in.
      </p>
      <Carousel showPagination={true} showNavigation={true}>
        {projectsArray.map((project: ProjectProps, index: number) => (
          <div key={index} className="w-full">
            <ProjectTile

              name={project.name}
              link={project.link}
            />
            <Image
              src={
                imagesMap ? imagesMap.get(project.name) || "/placeholder.png" : "/placeholder.png"
              }
              alt={project.name}
              width={600}
              height={400}
              className="w-full h-auto mt-4 rounded-lg object-cover"
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
