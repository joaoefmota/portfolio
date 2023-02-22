import React, { useState } from "react";
import useAxios from "../hooks/useAxios";
import axios from "axios";

{
  /* Components */
}
import ProjectTile from "../components/ProjectTile";
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
import { ProjectInfoProps } from "@/types/ProjectInfoProps";

export default function Projects() {
  const APIURL = "http://localhost:5005";
  const [imagesMap, setImagesMap] = useState<Map<string, string>>();

  const projectsArray = useAxios({
    url: `${APIURL}/projects`,
    initialValue: [],
    transform: (projects) => {
      const _imagesMap = new Map();
      Promise.all(
        projects.map((project: ProjectInfoProps) => {
          return axios
            .get(`${APIURL}/images/?project=${project.name}`)
            .then((result) => {
              console.log("result.data", result.data);
              _imagesMap.set(project.name, APIURL + result.data[7].source);
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
    <>
      <section id={"Projects"} className={styles.Projects}>
        <h1 className={"title self-start "}>02: Projects</h1>

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
            ? projectsArray.map((project: ProjectInfoProps) => (
                <>
                  <SwiperSlide key={project.id}>
                    <ProjectTile
                      src={imagesMap ? imagesMap.get(project.name) : undefined}
                      name={project.name}
                      link={`/projects/${project.id}`}
                    />
                  </SwiperSlide>
                </>
              ))
            : null}
        </Swiper>
      </section>
    </>
  );
}
