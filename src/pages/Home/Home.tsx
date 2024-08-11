import { Main, ScrollToTopBtn, TabsType } from "@components/index";
import { FlickrImagesTags } from "@customTypes/flickrTypes";
import { useState } from "react";
import {
  FavouriteList,
  Hero,
  ImagesFilter,
  ImagesList,
} from "./sections/index";

const Home: React.FC = () => {
  const INITIAL_FILTER_TAG = FlickrImagesTags.Mountain;
  const [activeTab, setActiveTab] = useState<TabsType>(() => {
    const savedTab = localStorage.getItem("activeTab");
    return savedTab ? (JSON.parse(savedTab) as TabsType) : "all";
  });
  const [activeFilter, setActiveFilter] = useState<FlickrImagesTags>(() => {
    const savedFilter = localStorage.getItem("activeFilter");
    return savedFilter
      ? (JSON.parse(savedFilter) as FlickrImagesTags)
      : INITIAL_FILTER_TAG;
  });

  const handleFilterClick = (tag: FlickrImagesTags): void => {
    if (activeFilter !== tag) {
      setActiveFilter(tag);
      localStorage.setItem("activeFilter", JSON.stringify(tag));
    }
  };

  const handleTabClick = (tabName: TabsType) => {
    setActiveTab(tabName);
    localStorage.setItem("activeTab", JSON.stringify(tabName));
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
      <ScrollToTopBtn />
    </Main>
  );
};

export default Home;
