import ContentLoader from 'react-content-loader';

const CardLoader = () => (
  <ContentLoader
    speed={2.2}
    width={400}
    height={480}
    viewBox="0 0 400 480"
    backgroundColor="#f4f4f4"
    foregroundColor="#ababab"
  >
    <rect x="7" y="18" rx="2" ry="2" width="300" height="300" />
  </ContentLoader>
);

export default CardLoader;
