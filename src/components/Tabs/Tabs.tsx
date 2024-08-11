import styles from "./Tabs.module.scss";

const TAB_NAMES = {
  all: "All Photos",
  favourites: "Favourites Photos",
};

export type TabsType = keyof typeof TAB_NAMES;

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
      {Object.keys(TAB_NAMES).map((tabKey) => {
        const tab = tabKey as TabsType;
        return (
          <div
            key={tab}
            className={`${styles.tabs_tab} ${
              activeTab === tab ? styles.active : ""
            }`}
            onClick={() => handleActiveTab(tab)}
            onKeyDown={(e) => handleKeyDown(e, tab)}
            tabIndex={0}
            role="button"
          >
            {TAB_NAMES[tab]}
          </div>
        );
      })}
      <div className={styles.tabs_indicator} />
    </div>
  );
};
