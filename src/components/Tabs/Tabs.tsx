import styles from "./Tabs.module.scss";

export type TabsType = "all" | "favourites";

interface TabsProps {
  activeTab: TabsType;
  handleActiveTab: (tab: TabsType) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, handleActiveTab }) => {
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    tab: TabsType
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleActiveTab(tab);
    }
  };

  return (
    <div className={styles.tabs}>
      <div
        className={`${styles.tabs_tab} ${
          activeTab === "all" ? styles.active : ""
        }`}
        onClick={() => handleActiveTab("all")}
        onKeyDown={(e) => handleKeyDown(e, "all")}
        tabIndex={0}
        role="button"
      >
        All Photos
      </div>
      <div
        className={`${styles.tabs_tab} ${
          activeTab === "favourites" ? styles.active : ""
        }`}
        onClick={() => handleActiveTab("favourites")}
        onKeyDown={(e) => handleKeyDown(e, "favourites")}
        tabIndex={0}
        role="button"
      >
        Favourites Photos
      </div>
      <div className={styles.tabs_indicator} />
    </div>
  );
};
