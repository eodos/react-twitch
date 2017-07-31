import React, { Component } from 'react';
import { Row, Col, Media } from 'reactstrap';
import './TwitchCard.css';

class TwitchCard extends Component {
	render() {
		const account = this.props.account;
		const stream = this.props.stream;
		const channel = account.display_name;

		let connected, game, logo, status, url;

		connected = stream !== null && stream !== undefined;
		game = connected ? `Playing ... ${stream.channel.game}` : 'OFFLINE';
		logo = account.logo ? account.logo : 'twitch.png';
		status = connected ? stream.channel.status : '';
		url = connected ? stream.channel.url : `https://www.twitch.tv/${channel}`;

		return (
			<Row className="align-items-center">
				<Col md={{ size: 8, offset: 2 }} xs={{ size: 11 }}>
					<div className={'channel connected_' + connected} id={'channel_' + channel}>
						<Media>
							<Media left middle href={url} target="_blank">
								<Media object src={logo} className="logo" />
							</Media>
							<Media body>
								<a target="_blank" href={url}>
									<Media heading>
										{channel}
									</Media>

									{game}
									<br />
									{status}
								</a>
							</Media>
						</Media>
					</div>
				</Col>
				<Col md={{ size: 1 }} xs={{ size: 1 }}>
					<a
						className="close"
						onClick={e => {
							e.preventDefault();
							this.props.delete(channel, connected);
						}}
					>
						&times;
					</a>
				</Col>
			</Row>
		);
	}
}

export default TwitchCard;
