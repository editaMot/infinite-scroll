import { useState } from "react";
import Main from "../../components/Main/Main";
import { TabsType } from "../../components/Tabs/Tabs";
import { FlickrImagesTags } from "../../types/flickrTypes";
import FavouriteList from "./sections/FavouriteList/FavouriteList";
import Hero from "./sections/Hero/Hero";
import ImagesFilter from "./sections/ImagesFilter/ImagesFilter";
import ImagesList from "./sections/ImagesList/ImagesList";

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
