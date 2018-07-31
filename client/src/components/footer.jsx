import React, {Component} from 'react';
// import styles from './styles/footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="footer">
        <a href="https://www.github.com/ErikEkstedt">
					<img src="/icons/github.svg" width='100px'/>
        </a>
      </div>
    );
  }
}

export default Footer;
