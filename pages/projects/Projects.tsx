import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import dynamic from "next/dynamic";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "@/styles/projects.module.scss";
import ProjectTile from "../../components/ProjectTile";
import { ProjectProps } from "@/types/ProjectInfoProps";
import useFadeIn from "../../hooks/useFadeIn";

const Swiper = dynamic(
  () => import("swiper/react").then((mod) => mod.Swiper),
  { ssr: false }
);
const SwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  { ssr: false }
);

import { Pagination, Navigation } from "swiper/modules";

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
              const imageSet = result.data.filter((image: { source: string }) =>
                image.source.includes(`proj_container/${project.name}`)
              );
              if (imageSet[0]) {
                _imagesMap.set(project.name, APIURL + imageSet[0].source);
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
        Some of the projects I was involved in. Use the swiper slider below to
        see them all!
      </p>
      <div className={styles.swiperContainer}>
        {projectsArray.length > 0 && imagesMap && (
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper rounded"
          >
            {projectsArray.map((project: ProjectProps) => (
              <SwiperSlide key={project.id}>
                <ProjectTile
                  src={imagesMap.get(project.name)}
                  name={project.name}
                  link={`/projects/${project.id}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
