import logo from "../../assets/logo.svg";
import styles from "./Logo.module.scss";

const Logo: React.FC = () => (
  <img src={logo} alt="Nature Lovers" loading="lazy" className={styles.logo} />
);

export default Logo;
