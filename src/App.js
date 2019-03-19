import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Demo from './demo';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Demo />
				</header>
			</div>
		);
	}
}

export default App;
