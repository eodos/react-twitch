import React, { Component } from 'react';
import { Media } from 'reactstrap';
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
				<a className="close" onClick={() => this.props.delete(channel, connected)}>
					&times;
				</a>
			</div>
		);
	}
}

export default TwitchCard;
