import React, {Component} from 'react';
import styles from './styles/header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='grid-body'>
        <header id="fullHeader">
          <a id="header-text" href="/">
            <p id="header-name">Erik Ekstedt </p>
            <p id="header-subtitle">PhD</p>
            <p id="header-subsubtitle">KTH</p>
          </a>
          <div className="navbar">
            <a href="/">Home</a>
            <div className="dropdown">
              <a href="/note" className="dropbtn">
                Notes
              </a>
              <div className="dropdown-content" />
            </div>
            <a href="/about">About</a>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
