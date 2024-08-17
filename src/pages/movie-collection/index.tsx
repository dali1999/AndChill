import { useParams } from 'react-router-dom';

const MovieCollection = () => {
  const { collectionId } = useParams();
  return <div>MovieCollection {collectionId}</div>;
};

export default MovieCollection;
