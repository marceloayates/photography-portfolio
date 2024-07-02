import React from 'react';
import styled from 'styled-components';
import homepageImage from '../assets/homepage-image.jpg'; // Import your homepage image

const HomePageContainer = styled.div`
  width: 100%;
  height: calc(100vh - 64px); /* Adjust the height as needed */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomePageImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <HomePageImage src={homepageImage} alt="Homepage" />
    </HomePageContainer>
  );
};

export default HomePage;
