import ContentLoader from 'react-content-loader';

const CardLoader = () => (
    <div className="card-loader-container">
  <ContentLoader
    speed={2.2}
    width={320}
    height={480}
    viewBox="0 0 320 480"
    backgroundColor="#f4f4f4"
    foregroundColor="#ababab"
  >
    <rect x="0" y="0" rx="2" ry="2" width="300" height="300" />
  </ContentLoader>
  </div>
);

export default CardLoader;
