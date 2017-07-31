import React, { Component } from 'react';
import { Row, Col, Input } from 'reactstrap';
import './SearchBar.css';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.addAccount = this.addAccount.bind(this);
	}

	handleKeyDown(e) {
		if (e.keyCode === 13) {
			this.addAccount();
		}
	}

	addAccount() {
		const element = document.getElementById('input');
		if (element.value.length) {
			this.props.onSubmission([element.value]);
			element.value = '';
		}
	}

	render() {
		return (
			<Row>
				<Col md={{ size: 8, offset: 2 }}>
					<Input
						className="SearchBar"
						id="input"
						type="text"
						placeholder="Add account ..."
						onKeyDown={this.handleKeyDown}
					/>
				</Col>
			</Row>
		);
	}
}

export default SearchBar;
