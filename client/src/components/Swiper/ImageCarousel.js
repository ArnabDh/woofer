import React, { useState } from "react"
import PropTypes from "prop-types"

const missingImage =
  "https://th.bing.com/th/id/R.0b363157de10661900e1a9da3a1ebebd?rik=%2bdIbDv%2b8OBO%2fiA&pid=ImgRaw&r=0"

const ImageCarousel = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const [min, max] = [0, images.length - 1]

  const scrollImages = (indexChange) => {
    setImageIndex((prevIndex) => {
      if (indexChange < 0) {
        if (prevIndex === min) {
          return min
        } else {
          return prevIndex + indexChange
        }
      } else {
        if (prevIndex === max) {
          return max
        } else {
          return prevIndex + indexChange
        }
      }
    })
  }

  return (
    <div className="ImageCarousel">
      <button onClick={() => scrollImages(-1)} disabled={imageIndex === min}>
        {"<"}
      </button>

      <img src={images[imageIndex] || missingImage} />

      <button onClick={() => scrollImages(1)} disabled={imageIndex === max}>
        {">"}
      </button>
    </div>
  )
}

export default ImageCarousel

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
}
