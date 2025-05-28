import React from 'react';
import './Header.css';
import logo from '../assets/clinic-logo.png';

const Header = () => {
  return (
    <div className="header-background">
      <div className="header-content">
        <img src={logo} alt="Clinic Logo" className="header-logo" />
        <div className="header-text">
          <h1 className="clinic-name">ELITE DENTAL CLINIC</h1>
          <p className="doctor-names">
            Dr. Chikku Paulo, B.D.S &nbsp;&nbsp;&nbsp; Dr. Gayathri Balagopal, B.D.S
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
