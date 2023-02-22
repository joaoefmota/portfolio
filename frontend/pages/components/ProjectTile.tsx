import Image from "next/image";
import Link from "next/link";
import React from "react";

declare interface TilesProps {
  src: any;
  name: string;
  link: string;
}

export default function ProjectTile({ src, name, link }: TilesProps) {
  return (
    <Link href={link}>
      <div className="shade flex flex-col items-center justify-center">
        <Image src={src} alt={name} fill />
      </div>
    </Link>
  );
}
