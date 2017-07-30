import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

class ButtonBar extends Component {
	render() {
		return (
			<ButtonGroup>
				<Button onClick={this.props.all} color="primary">
					All
				</Button>
				<Button onClick={this.props.online} color="success">
					Online
				</Button>{' '}
				<Button onClick={this.props.offline} color="danger">
					Offline
				</Button>
			</ButtonGroup>
		);
	}
}

export default ButtonBar;
