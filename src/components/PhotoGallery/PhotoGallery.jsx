import { Card } from "react-bootstrap";

const PhotoGallery = ({ eventPhotos }) => {
  return (
    <div>
      {eventPhotos.map((item) => (
        <Card className="col-2" key={item.image_id}>
          <img src={`${import.meta.env.VITE_LOCALHOST}/${item.imagePath}`} />
        </Card>
      ))}
    </div>
  );
};

export default PhotoGallery;
