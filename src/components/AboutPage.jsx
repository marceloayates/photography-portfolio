import React from 'react';
import styles from '../styles/AboutPage.module.css';


const profileURL = "https://res.cloudinary.com/dajuvlxyu/image/upload/v1720014606/profile_wruumb.jpg"

const AboutMe = () => {
  const aboutText = (
    <>
      <h1 className={styles.pageTitle}>Professional Photography Services in Austin</h1>
      <p>
        Hello! With over 15 years of seasoned expertise in photography and a comprehensive education from the Austin School of Photography, I bring a refined skill set and an unwavering commitment to capturing compelling images. I meticulously craft images by using and combining different techniques involving the three main constructs in photography: time, depth of field, and light.
      </p>
      <h3>Services offered:</h3>
      <ul>
        <li>Portrait</li>
        <li>Creative studio shoot</li>
        <li>Outdoor shoot</li>
        <li>Couples</li>
        <li>Corporate headshot</li>
        <li>Events</li>
        <li>Sports</li>
      </ul>
      <p>
        I am able to travel to locations within Austin and surrounding areas. I have equipment that allows me to do work in a variety of settings, so please ask me about any specific needs you have!
      </p>
      <p>Let's collaborate to bring your visual ideas to life with precision and artistry.</p>
    </>
  );

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.profilePhotoContainer}>
        <img src={profileURL} alt="Profile" className={styles.profilePhoto} />
      </div>
      <div className={styles.aboutText}>{aboutText}</div>
    </div>
  );
};

export default AboutMe;
