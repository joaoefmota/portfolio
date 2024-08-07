import React, { useEffect, useRef, useState } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "axios";

{
  /* Components */
}
import ProjectTile from "../../components/ProjectTile";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
{
  /* Styles */
}
import styles from "@/styles/projects.module.scss";

{
  /* TYPES */
}
import { ProjectProps } from "@/types/ProjectInfoProps";
import useFadeIn from "../../hooks/useFadeIn";

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
              const imageSet = result.data.filter(
                (image: { source: string | string[] }) =>
                  image.source.includes(`proj_container/${project.name}`)
              );
              _imagesMap.set(project.name, APIURL + imageSet[0].source);
            });
        })
      ).then(() => {
        setImagesMap(_imagesMap);
      });
      return projects;
    },
  });

  return (
    <>
      <section
        id={"Projects"}
        className={`${"sectionBg1"} ${styles.Projects} ${
          isVisible ? "fade-in" : ""
        }`}
        ref={projectsRef}
      >
        <h1 className={"title self-start "}>02: Projects</h1>
        <p className="paragraph self-start">
          Some of the projects I was involved in. Use the swiper slider bellow
          to see them all!
        </p>
        <div className={styles.swiperContainer}>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper rounded"
          >
            {projectsArray != null
              ? projectsArray.map((project: ProjectProps) => {
                  return (
                    <>
                      <SwiperSlide key={project.id}>
                        <ProjectTile
                          src={
                            imagesMap ? imagesMap.get(project.name) : undefined
                          }
                          name={project.name}
                          link={`/projects/${project.id}`}
                        />
                      </SwiperSlide>
                    </>
                  );
                })
              : null}
          </Swiper>
        </div>
      </section>
    </>
  );
}
