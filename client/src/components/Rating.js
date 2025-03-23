import React from 'react';
import styled from 'styled-components';

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Stars = styled.div`
  color: #FFD700;
  margin-right: 5px;
`;

const Star = styled.span`
  margin-right: 2px;
`;

const ReviewText = styled.span`
  font-size: 0.8rem;
  color: #aaa;
`;

const Rating = ({ value, text, color }) => {
  return (
    <RatingContainer>
      <Stars>
        <Star>
          <i
            style={{ color }}
            className={
              value >= 1
                ? 'fas fa-star'
                : value >= 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </Star>
        <Star>
          <i
            style={{ color }}
            className={
              value >= 2
                ? 'fas fa-star'
                : value >= 1.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </Star>
        <Star>
          <i
            style={{ color }}
            className={
              value >= 3
                ? 'fas fa-star'
                : value >= 2.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </Star>
        <Star>
          <i
            style={{ color }}
            className={
              value >= 4
                ? 'fas fa-star'
                : value >= 3.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </Star>
        <Star>
          <i
            style={{ color }}
            className={
              value >= 5
                ? 'fas fa-star'
                : value >= 4.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </Star>
      </Stars>
      {text && <ReviewText>{text}</ReviewText>}
    </RatingContainer>
  );
};

Rating.defaultProps = {
  color: '#FFD700',
};

export default Rating;
