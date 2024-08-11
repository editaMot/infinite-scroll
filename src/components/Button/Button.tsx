import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  action: () => void;
}

export const Button: React.FC<ButtonProps> = ({ text, action }) => (
  <button onClick={action} className={styles.btn}>
    {text}
  </button>
);
