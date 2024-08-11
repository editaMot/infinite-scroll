import { useState } from "react";
import { Main } from "../../components/index";
import { TabsType } from "../../components/Tabs/Tabs";
import { FlickrImagesTags } from "../../types/flickrTypes";
import {
  FavouriteList,
  Hero,
  ImagesFilter,
  ImagesList,
} from "./sections/index";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabsType>("all");
  const INITIAL_FILTER_TAG = FlickrImagesTags.Mountain;
  const [activeFilter, setActiveFilter] =
    useState<FlickrImagesTags>(INITIAL_FILTER_TAG);

  const handleFilterClick = (tag: FlickrImagesTags): void => {
    if (activeFilter !== tag) {
      setActiveFilter(tag);
    }
  };

  const handleTabClick = (tabName: TabsType) => {
    setActiveTab(tabName);
  };

  return (
    <Main>
      <Hero activeTab={activeTab} handleActiveTab={handleTabClick} />
      {activeTab === "all" && (
        <>
          <ImagesFilter
            onFilterClick={handleFilterClick}
            activeFilter={activeFilter}
          />
          <ImagesList activeFilter={activeFilter} />
        </>
      )}
      {activeTab === "favourites" && <FavouriteList />}
    </Main>
  );
};

export default Home;
