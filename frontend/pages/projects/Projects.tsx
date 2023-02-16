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
    <>
      <section id={"Projects"} className={styles.Projects}>
        <div className="flex sm:flex-col flex-row w-full h-full items-center justify-center">
          <div className="w-full h-3/4">
            <h1 className={"title self-start h-1/4"}>02: Projects</h1>
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
                ? projectsArray.map((project) => (
                    <>
                      <SwiperSlide key={project.id}>
                        <ProjectTile
                          src={
                            imagesMap ? imagesMap.get(project.name) : undefined
                          }
                          name={project.name}
                          link={`/projects/${project.id}`}
                          aka={project.aka}
                        />
                      </SwiperSlide>
                    </>
                  ))
                : null}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
