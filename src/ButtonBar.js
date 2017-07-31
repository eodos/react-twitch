import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

class ButtonBar extends Component {
	render() {
		return (
			<ButtonGroup>
				<Button
					active={this.props.current === 'all'}
					onClick={this.props.all}
					color="primary"
				>
					All
				</Button>
				<Button
					active={this.props.current === 'online'}
					onClick={this.props.online}
					color="success"
				>
					Online
				</Button>{' '}
				<Button
					active={this.props.current === 'offline'}
					onClick={this.props.offline}
					color="danger"
				>
					Offline
				</Button>
			</ButtonGroup>
		);
	}
}

export default ButtonBar;
