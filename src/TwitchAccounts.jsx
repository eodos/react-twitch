import React, {
  Component,
} from 'react';
import axios from 'axios';
import {
  Alert,
} from 'reactstrap';
import MDSpinner from 'react-md-spinner';
import SearchBar from './SearchBar';
import ButtonBar from './ButtonBar';
import TwitchCard from './TwitchCard';
import './TwitchAccounts.css';

const shortid = require('shortid');

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
      show: 'all',
    };
    this.getAccountsInfo = this.getAccountsInfo.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentDidMount() {
    this.getAccountsInfo([
      'ninja',
      'shroud',
      'bibleboy666',
      'eodos',
      'freecodecamp',
      'xLanne',
      'Claritytx',
      'summit1g',
      'anniefuchsia',
    ]);
  }

  getAccountsInfo(inputAccounts) {
    const accountPromises = [];
    const streamPromises = [];
    const accountQuery = 'https://wind-bow.glitch.me/twitch-api/users/';
    const streamQuery = 'https://wind-bow.glitch.me/twitch-api/streams/';
    this.accountsInfo = [];

    const { accounts } = this.state;
    const accountsState = accounts.slice();
    inputAccounts.forEach((channel) => {
      if (accountsState.indexOf(channel.toLowerCase()) === -1) {
        accountsState.push(channel.toLowerCase());
        accountPromises.push(axios.get(accountQuery + channel));
      } else {
        this.setState({
          showWarning: true,
          errorMessage: `The account ${channel} has already been added`,
        });
      }
    });
    this.setState({
      accounts: accountsState,
    });

    axios
      .all(accountPromises)
      .then(
        axios.spread((...args) => {
          args.forEach((response) => {
            if (response.data.error) {
              const accountsStateCopy = accounts.slice();
              accountsStateCopy.splice(
                accountsStateCopy.indexOf(
                  response.request.responseURL.split('/').slice(-1)[0],
                ),
              );
              this.setState({
                accounts: accountsStateCopy,
                showWarning: true,
                errorMessage: response.data.message,
              });
            } else {
              this.accountsInfo.push(response.data);
              streamPromises.push(
                axios.get(streamQuery + response.data.display_name),
              );
            }
          });
        }),
        () => {
          const { streamInfo } = this.state;
          if (!streamInfo.length) {
            this.setState({
              APIerror: true,
            });
          } else {
            this.setState({
              showWarning: true,
              errorMessage: 'API Error, please retry',
            });
          }
        },
      )
      .then(() => {
        axios.all(streamPromises).then(axios.spread((...args) => {
          const { accountsInfo } = this.state;
          const accountsInfoCopy = accountsInfo.slice();

          args.forEach((response, i) => {
            accountsInfoCopy.push({
              connected: response.data.stream !== null,
              info: this.accountsInfo[i],
              stream: response.data.stream,
            });
          });
          this.setState({
            accountsInfo: accountsInfoCopy,
            readyToRender: true,
          });
        }), () => {
          const { streamInfo } = this.state;
          if (!streamInfo.length) {
            this.setState({
              APIerror: true,
            });
          } else {
            this.setState({
              showWarning: true,
              errorMessage: 'API Error, please retry',
            });
          }
        });
      });
  }

  deleteAccount(account) {
    const { accounts, accountsInfo } = this.state;
    const accountsCopy = accounts.slice();
    const accountsInfoCopy = accountsInfo.slice();
    const index = accounts.indexOf(account.toLowerCase());
    accountsCopy.splice(index, 1);
    accountsInfoCopy.splice(index, 1);
    this.setState({
      accounts: accountsCopy,
      accountsInfo: accountsInfoCopy,
    });
  }

  render() {
    const {
      APIerror, readyToRender, accountsInfo, show, showWarning, errorMessage,
    } = this.state;
    if (APIerror) {
      return (
        <div className="fullScreen">
          Error connecting to the API.Please retry later
        </div>
      );
    }
    if (!readyToRender) {
      return (
        <MDSpinner
          className="fullScreen"
          size={100}
        />
      );
    }
    const twitchCards = [];
    accountsInfo.forEach((account) => {
      if (account.connected && show !== 'offline') {
        twitchCards.unshift(
          <TwitchCard
            key={shortid.generate()}
            account={account.info}
            stream={account.stream}
            delete={this.deleteAccount}
          />,
        );
      } else if (!account.connected && show !== 'online') {
        twitchCards.push(
          <TwitchCard
            key={shortid.generate()}
            account={account.info}
            stream={account.stream}
            delete={this.deleteAccount}
          />,
        );
      }
    });
    return (
      <div>
        <Alert
          color="danger"
          isOpen={showWarning}
        >
          {errorMessage}
        </Alert>
        <ButtonBar
          current={show}
          all={() => this.setState({ show: 'all' })}
          online={() => this.setState({ show: 'online' })}
          offline={() => this.setState({ show: 'offline' })}
        />
        <SearchBar onSubmission={this.getAccountsInfo} />
        <div id="channels">{twitchCards}</div>
      </div>
    );
  }
}

export default TwitchAccounts;
