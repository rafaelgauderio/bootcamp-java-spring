import React from 'react';
import ContentLoader from 'react-content-loader';

const ProductDetailsLoader = () => (
  <ContentLoader
    viewBox="0 0 500 280"
    height={280}
    width={300}
    backgroundColor="#f4f4f4"
    foregroundColor="#ababab"
  >
    <rect x="0" y="0" rx="10" ry="10" width="300" height="180" />
    <rect x="0" y="190" rx="0" ry="0" width="292" height="20" />
    <rect x="0" y="215" rx="0" ry="0" width="239" height="20" />
    <rect x="0" y="242" rx="0" ry="0" width="274" height="20" />
  </ContentLoader>
);

ProductDetailsLoader.metadata = {
  name: 'Rafael de Luca',
  github: 'rafaelgauderio',
  description: 'Product Item Details',
  filename: 'ProductItemDetails',
};

export default ProductDetailsLoader;
