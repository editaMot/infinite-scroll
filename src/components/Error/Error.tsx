import styles from "./Error.module.scss";

interface ErrorProps {
  errorMessage: string;
}

export const Error: React.FC<ErrorProps> = ({ errorMessage }) => (
  <div className={styles.error}>{errorMessage}</div>
);
