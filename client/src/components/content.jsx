import React, { Component } from 'react';
import styles from './styles/content.css';

class Content extends Component {
  componentDidMount() {
		fetch('/note/react')
			.then(response => console.log(response))
      // .then(response => response.json())
      // .then(data => this.setState({ data }));
  }

	render() {
		return (
			<div className='content'>
				<h1>Content </h1>
			</div>
		);
	}
}

export default Content;
