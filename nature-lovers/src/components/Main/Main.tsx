import { ReactNode } from "react";
import styles from "./Main.module.scss";

interface MainProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>{children}</div>
    </main>
  );
};

export default Main;
