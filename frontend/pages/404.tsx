import Link from "next/link";

import styles from "../styles/404.module.scss";

const NotFound = () => {
  return (
    <section id={styles.notFound} className="fade-in animContainer">
      <h1 className="title">404 - Page Not Found</h1>
      <p className="paragraph">The page you are looking for does not exist.</p>
      <Link href="/">
        <button>Go back to the Home Page</button>
      </Link>
    </section>
  );
};

export default NotFound;
