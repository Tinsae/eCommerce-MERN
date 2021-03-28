import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({ rating, numReviews, starColor }) => {

    return (
        <div className="rating">
            {[ ...Array(5).keys()].map((curr, i) => (
                <span>
                    <i style={{ color: starColor }}
                    className=
                    {
                        rating > (i + 1) && Math.abs(rating - (i + 1)) === 0.5 ? "fas fa-star-half" :
                        rating > (i + 1)? "fas fa-star" : "far fa-star"
                    }/>
                </span>
            ))}
            <span>{numReviews}</span>
        </div>
    )
}
Rating.defaultProps = {
    starColor: "#f8e825"
};

// color is optional
Rating.propTypes = {
    rating: PropTypes.number.isRequired,
    numReviews: PropTypes.string.isRequired,
    starColor: PropTypes.string
};

export default Rating;
