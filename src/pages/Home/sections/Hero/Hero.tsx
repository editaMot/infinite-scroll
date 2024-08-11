import { Logo, Tabs, TabsType } from "../../../../components/index";
import styles from "./Hero.module.scss";

interface HeroProps {
  activeTab: TabsType;
  handleActiveTab: (tab: TabsType) => void;
}

export const Hero: React.FC<HeroProps> = ({ activeTab, handleActiveTab }) => (
  <div className={styles.hero}>
    <Logo />
    <Tabs activeTab={activeTab} handleActiveTab={handleActiveTab} />
  </div>
);
