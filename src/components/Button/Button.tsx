import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  action: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, action }) => {
  return (
    <button onClick={action} className={styles.btn}>
      {text}
    </button>
  );
};

export default Button;
