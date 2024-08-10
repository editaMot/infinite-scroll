import styles from "./Tabs.module.scss";

export type TabsType = "all" | "favourites";

interface TabsProps {
  activeTab: TabsType;
  handleActiveTab: (tab: TabsType) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, handleActiveTab }) => {
  return (
    <div className={styles.tabs}>
      <div
        className={`${styles.tabs_tab} ${
          activeTab === "all" ? styles.active : ""
        }`}
        onClick={() => handleActiveTab("all")}
      >
        All Photos
      </div>
      <div
        className={`${styles.tabs_tab} ${
          activeTab === "favourites" ? styles.active : ""
        }`}
        onClick={() => handleActiveTab("favourites")}
      >
        Favourites Photos
      </div>
      <div className={styles.tabs_indicator} />
    </div>
  );
};

export default Tabs;
