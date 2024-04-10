import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css";

/**
 * Carousel component to display a carousel of TV shows.
 * @param {Object} props - Props for the Carousel component.
 * @param {Object[]} props.shows - An array of TV shows to display in the carousel.
 * @param {Function} props.onShowClick - Function to handle clicks on TV shows.
 * @returns {JSX.Element} JSX for the Carousel component.
 */
function Carousel({ shows, onShowClick }) {
  /**
   * Settings for the react-slick Slider component.
   * @type {Object}
   */
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <h2>Shows you might be interested in...</h2>
      <Slider {...settings}>
        {shows.map((show) => (
          <div
            key={show.id}
            className="show-item"
            onClick={() => onShowClick(show)}
          >
            <img src={show.image} alt={show.title} />
            <div className="show-info">
              <h3>{show.title}</h3>
              {/* Render the seasons as comma-separated string */}
              <p>Seasons: {show.seasons.join(", ")}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

// PropTypes validation
Carousel.propTypes = {
  shows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      seasons: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
  onShowClick: PropTypes.func.isRequired,
};

export default Carousel;
