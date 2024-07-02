import React from 'react';
import profilePhoto from '../assets/profile.jpg';
import styles from '../styles/AboutPage.module.css';

const AboutMe = () => {
  const aboutText = (
    <>
      Hello!<br /><br />
      With over 15 years of seasoned expertise in photography and a comprehensive education from the Austin School of Photography, I bring a refined skill set and an unwavering commitment to capturing compelling images. I meticulously craft images by using and combining different techniques involving the three main constructs in photography: time, depth of field, and light.<br /><br /><br />
      Services offered:<br /><br />
      - Portrait<br />
      - Creative studio shoot<br />
      - Outdoor shoot<br />
      - Couples<br />
      - Corporate headshot<br />
      - Events<br />
      - Sports<br /><br /><br />
      I am able to travel to locations within Austin and surrounding areas. I have equipment that allows me to do work in a variety of settings, so please ask me about any specific needs you have!<br /><br />
      Let's collaborate to bring your visual ideas to life with precision and artistry.
    </>
  );

  return (
    <div className={styles['about-me']}>
      <div className={styles['profile-photo']}>
        <img src={profilePhoto} alt="Profile" />
      </div>
      <div className={styles['about-text']}>
        <p>{aboutText}</p>
      </div>
    </div>
  );
};

export default AboutMe;
