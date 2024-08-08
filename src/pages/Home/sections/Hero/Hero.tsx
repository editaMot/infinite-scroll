import Logo from "../../../../components/Logo/Logo";
import Tabs, { TabsType } from "../../../../components/Tabs/Tabs";
import styles from "./Hero.module.scss";

interface HeroProps {
  activeTab: TabsType;
  handleActiveTab: (tab: TabsType) => void;
}

const Hero: React.FC<HeroProps> = ({ activeTab, handleActiveTab }) => (
  <div className={styles.hero}>
    <Logo />
    <Tabs activeTab={activeTab} handleActiveTab={handleActiveTab} />
  </div>
);

export default Hero;
