import React from 'react';
import WelcomePage from '../WelcomePage/WelcomePage';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <WelcomePage />
    <div className="App about-page">
      <h3>Overview</h3>
      <p>
        ParkView aims to provide community members with a platform to communicate
        for themselves their values and priorities
        for the parks in their neighborhoods that extends beyond community engagement practices common today.
      </p>
      <h3>Background</h3>
      <p>
        After years of underfunding and unequal access to parks and public green spaces, we find ourselves in a moment where significant local and national efforts are being made to reverse this and rehabilitate parks across the United States with careful research that focuses on equity defined as fair and just access to opportunities and resources. ParkView provides community members with a platform to participate in the conversation by communicating
        for themselves their values and priorities
        for the parks in their neighborhoods that extends beyond community engagement practices common today. At its core, ParkView is a park review application– allowing users to search
        for a park and leave a review, as well as read other community members reviews.
      </p>
    </div>
  </div>
);

export default AboutPage;
