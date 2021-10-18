import React from "react";

const ImageHelper = ({ product }) => {
  const ImageUrl = product
    ? product.image
    : `http://www.macedonrangeshalls.com.au/wp-content/uploads/2017/10/image-not-found.png`;

  return (
    <div className="rounded border border-success p-2">
      <img src={ImageUrl} style={{maxHeight: "100%" , maxWidth: "100%"}} className="mb-3 rounded" alt="Product" />
    </div>
  );
};

export default ImageHelper;
