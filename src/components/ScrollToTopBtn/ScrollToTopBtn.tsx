import { useEffect, useState } from "react";
import styles from "./ScrollToTopBtn.module.scss";

export const ScrollToTopBtn: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`${styles.scrollToTopButton} ${visible ? styles.visible : ""}`}
      onClick={scrollToTop}
    >
      ▲
    </button>
  );
};
