import { useMemo } from "react";
import ImageCard from "../../../../components/ImageCard/ImageCard";
import { ENDPOINT_URL } from "../../../../constants/constants";
import useFetchData from "../../../../hooks/useFetchData";
import { usePhotoDetails } from "../../../../hooks/usePhotoDetails";
import { getFlickrPhotosParams } from "../../../../services/flickrApiConfig";
import { FlickrApiResponse } from "../../../../types/flickrTypes";
import { constructPhotoObject } from "../../../../utils/constructPhotoObject";
import styles from "./ImagesList.module.scss";

const ImagesList: React.FC = () => {
  const params = useMemo(() => getFlickrPhotosParams("mountains"), []);
  const { isLoading, data, error } = useFetchData<FlickrApiResponse>({
    url: ENDPOINT_URL,
    params: params,
  });

  const photoList = useMemo(() => data?.photos?.photo || [], [data]);
  const photoIds = useMemo(
    () => photoList.map((photo) => photo.id),
    [photoList]
  );

  const {
    details,
    isLoading: isDetailsLoading,
    error: detailsError,
  } = usePhotoDetails(photoIds);

  const combinedPhotos = useMemo(
    () => constructPhotoObject(photoList, details),
    [photoList, details]
  );

  if (isLoading || isDetailsLoading) return <p>Loading...</p>;
  if (error || detailsError) return <p>Error: {error || detailsError}</p>;

  return (
    <div className={styles.list}>
      {combinedPhotos.map((photo) => (
        <ImageCard photo={photo} key={photo.id} />
      ))}
    </div>
  );
};

export default ImagesList;
