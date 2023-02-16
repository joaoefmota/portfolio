import Image from "next/image";
import Link from "next/link";
import React from "react";

declare interface TilesProps {
  src: any;
  name: string;
  link: string;
  aka: string;
}

export default function ProjectTile({ src, name, link, aka }: TilesProps) {
  return (
    <Link href={link}>
      <div className="shade flex flex-col items-center justify-center">
        <p className="paragraphShade paragraphAlt italic font-extrabold absolute pTilePosition">
          {aka}
        </p>
        <Image src={src} alt={name} fill />
      </div>
    </Link>
  );
}
