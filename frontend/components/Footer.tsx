import React from "react";
import Clicabkles_Nav from "./Clickables_Nav";
import GetQuotes from "./GetQuotes";

import styles from "@/styles/footer.module.scss";

export default function Footer() {
  return (
    <footer>
      <GetQuotes />
      <div className="flex flex-col items-center w-full ">
        <h2 className={styles.findMe}>Find me at:</h2>
        <Clicabkles_Nav />
        <p className={styles.designedBy}></p>Designed & Built by João Mota
      </div>
    </footer>
  );
}
