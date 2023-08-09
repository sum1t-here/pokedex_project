import React from 'react';
// import backgroundImage from '../Background/PngItem_4839785.png';
import styles from './Background.css';

const Background = ({ children }) => {
  const containerStyle = {
    // backgroundImage: `url(${backgroundImage})`,
    // Use the styles from the imported CSS module
    ...styles.background,
  };

  return (
    <div className='background' style={containerStyle}>
      {children}
    </div>
  );
};

export default Background;
