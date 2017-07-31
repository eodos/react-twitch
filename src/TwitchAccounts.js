import React, { Component } from 'react';
import axios from 'axios';
import { Alert } from 'reactstrap';
import MDSpinner from 'react-md-spinner';
import SearchBar from './SearchBar.js';
import ButtonBar from './ButtonBar.js';
import TwitchCard from './TwitchCard';
import './TwitchAccounts.css';

class TwitchAccounts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accounts: [],
			accountsInfo: [],
			readyToRender: false,
			APIerror: false,
			errorMessage: '',
			showWarning: false,
			show: 'all'
		};
		this.getAccountsInfo = this.getAccountsInfo.bind(this);
		this.deleteAccount = this.deleteAccount.bind(this);
	}

	componentDidMount() {
		this.getAccountsInfo([
			'ESL_SC2',
			'OgamingSC2',
			'cretetion',
			'freecodecamp',
			'storbeck',
			'habathcx',
			'RobotCaleb',
			'xLanne',
			'Claritytx',
			'summit1g',
			'anniefuchsia'
		]);
	}

	deleteAccount(account, connected) {
		let accounts = this.state.accounts.slice();
		let accountsInfo = this.state.accountsInfo.slice();
		const index = accounts.indexOf(account.toLowerCase());
		accounts.splice(index, 1);
		accountsInfo.splice(index, 1);
		this.setState({ accounts: accounts, accountsInfo: accountsInfo });
	}

	getAccountsInfo(accounts) {
		let accountPromises = [];
		let streamPromises = [];
		const accountQuery = 'https://wind-bow.glitch.me/twitch-api/users/';
		const streamQuery = 'https://wind-bow.glitch.me/twitch-api/streams/';
		this.accountsInfo = [];

		let accountsState = this.state.accounts.slice();
		accounts.forEach((channel, index) => {
			if (accountsState.indexOf(channel.toLowerCase()) === -1) {
				accountsState.push(channel.toLowerCase());
				accountPromises.push(axios.get(accountQuery + channel));
			} else {
				this.setState({
					showWarning: true,
					errorMessage: `The account ${channel} has already been added`
				});
			}
		});
		this.setState({ accounts: accountsState });

		axios
			.all(accountPromises)
			.then(
				axios.spread((...args) => {
					args.forEach(response => {
						if (response.data.error) {
							let accountsState = this.state.accounts.slice();
							accountsState.splice(
								accountsState.indexOf(
									response.request.responseURL.split('/').slice(-1)[0]
								)
							);
							this.setState({
								accounts: accountsState,
								showWarning: true,
								errorMessage: response.data.message
							});
						} else {
							this.accountsInfo.push(response.data);
							streamPromises.push(
								axios.get(streamQuery + response.data.display_name)
							);
						}
					});
				}),
				() => {
					if (!this.state.streamInfo.length) {
						this.setState({ APIerror: true });
					} else {
						this.setState({
							showWarning: true,
							errorMessage: 'API Error, please retry'
						});
					}
				}
			)
			.then(() => {
				axios.all(streamPromises).then(axios.spread((...args) => {
					let accountsInfo = this.state.accountsInfo.slice();

					args.forEach((response, i) => {
						accountsInfo.push({
							connected: response.data.stream !== null ? true : false,
							info: this.accountsInfo[i],
							stream: response.data.stream
						});
					});
					this.setState({
						accountsInfo: accountsInfo,
						readyToRender: true
					});
				}), () => {
					if (!this.state.streamInfo.length) {
						this.setState({ APIerror: true });
					} else {
						this.setState({
							showWarning: true,
							errorMessage: 'API Error, please retry'
						});
					}
				});
			});
	}

	render() {
		if (this.state.APIerror) {
			return (
				<div className="fullScreen">Error connecting to the API. Please retry later</div>
			);
		}
		if (!this.state.readyToRender) {
			return <MDSpinner className="fullScreen" size={100} />;
		} else {
			let twitchCards = [];
			this.state.accountsInfo.forEach((account, index) => {
				if (account.connected && this.state.show !== 'offline') {
					twitchCards.unshift(
						<TwitchCard
							key={index}
							account={account.info}
							stream={account.stream}
							delete={this.deleteAccount}
						/>
					);
				} else if (!account.connected && this.state.show !== 'online') {
					twitchCards.push(
						<TwitchCard
							key={index}
							account={account.info}
							stream={account.stream}
							delete={this.deleteAccount}
						/>
					);
				}
			});
			return (
				<div>
					<Alert color="danger" isOpen={this.state.showWarning}>
						{this.state.errorMessage}
					</Alert>
					<ButtonBar
						current={this.state.show}
						all={() => this.setState({ show: 'all' })}
						online={() => this.setState({ show: 'online' })}
						offline={() => this.setState({ show: 'offline' })}
					/>
					<SearchBar onSubmission={this.getAccountsInfo} />
					<div id="channels">
						{twitchCards}
					</div>
				</div>
			);
		}
	}
}

export default TwitchAccounts;
