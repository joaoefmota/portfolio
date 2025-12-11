import React from "react";
import ClicabklesFooter from "./Clickables_Footer";
import GetQuotes from "./GetQuotes";

import styles from "@/styles/footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className="flex flex-col items-center w-1/2 sm:justify-center gap-2">
        <h2 className={styles.findMe}>Find me at:</h2>
        <ClicabklesFooter />
        <p className={`${styles.designedBy} ${"paragraph"}`}>
          Designed & Built by João Mota
        </p>
      </div>
      {/* <GetQuotes /> */}
    </footer>
  );
}
