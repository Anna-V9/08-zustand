import type { Metadata } from "next";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "NoteHub - Page Not Found",
  description: "The page you are looking for does not exist on NoteHub.",
  openGraph: {
    title: "NoteHub - Page Not Found",
    description: "The page you are looking for does not exist on NoteHub.",
    url: "https://yourdomain.com/not-found",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const NotFound = () => {
  return (
    <main className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
};

export default NotFound;