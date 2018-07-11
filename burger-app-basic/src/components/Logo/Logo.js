import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png'; //this
import classes from './Logo.css';

const logo = ( props ) => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="new burger"/>
  </div>
);

export default logo;