import { FlickrImagesTags } from "../../../../types/flickrTypes";
import styles from "./ImagesFilter.module.scss";

interface FilterTag {
  title: string;
  tag: FlickrImagesTags;
}

const FILTER_TAGS: FilterTag[] = [
  {
    title: "Mountains",
    tag: FlickrImagesTags.Mountain,
  },
  {
    title: "Beaches",
    tag: FlickrImagesTags.Beach,
  },
  {
    title: "Forrests",
    tag: FlickrImagesTags.Forrest,
  },
  {
    title: "Sunsets",
    tag: FlickrImagesTags.Sunset,
  },
];

interface ImagesFilterProps {
  onFilterClick: (tag: FlickrImagesTags) => void;
  activeFilter: FlickrImagesTags;
}

export const ImagesFilter: React.FC<ImagesFilterProps> = ({
  onFilterClick,
  activeFilter,
}) => {
  return (
    <div className={styles.filter}>
      {FILTER_TAGS.map(({ title, tag }) => (
        <div
          className={`${styles.filter_tag} ${
            activeFilter === tag ? styles["filter_tag--active"] : ""
          }`}
          key={tag}
          onClick={() => onFilterClick(tag)}
        >
          <p>{title}</p>
        </div>
      ))}
    </div>
  );
};
