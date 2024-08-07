import { useState } from "react";
import Main from "../../components/Main/Main";
import { FlickrImagesTags } from "../../types/flickrTypes";
import ImagesFilter from "./sections/ImagesFilter/ImagesFilter";
import ImagesList from "./sections/ImagesList/ImagesList";

const Home: React.FC = () => {
  const INITIAL_FILTER_TAG = FlickrImagesTags.Mountain;
  const [activeFilter, setActiveFilter] =
    useState<FlickrImagesTags>(INITIAL_FILTER_TAG);

  const handleFilterClick = (tag: FlickrImagesTags): void => {
    if (activeFilter !== tag) {
      setActiveFilter(tag);
    }
  };
  return (
    <Main>
      <ImagesFilter
        onFilterClick={handleFilterClick}
        activeFilter={activeFilter}
      />
      <ImagesList activeFilter={activeFilter} />
    </Main>
  );
};

export default Home;
