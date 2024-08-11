import { FlickrImagesTags } from "@customTypes/flickrTypes";
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
    title: "Forests",
    tag: FlickrImagesTags.Forest,
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
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    tag: FlickrImagesTags
  ): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      onFilterClick(tag);
    }
  };

  return (
    <div className={styles.filter}>
      {FILTER_TAGS.map(({ title, tag }) => (
        <div
          className={`${styles.filter_tag} ${
            activeFilter === tag ? styles["filter_tag--active"] : ""
          }`}
          key={tag}
          onClick={() => onFilterClick(tag)}
          onKeyDown={(e) => handleKeyDown(e, tag)}
          tabIndex={0}
          role="button"
        >
          <p>{title}</p>
        </div>
      ))}
    </div>
  );
};
