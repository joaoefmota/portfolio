import Image from "next/image";
import React from "react";

export default function ProjectTile({ src, alt, name }) {
  return (
    <>
      <Image src={src} alt={alt} width={300} height={500} className="rounded h-full"/>
      <p className="text-center text-paragraph text-xl">{name}</p>
    </>
  );
}
