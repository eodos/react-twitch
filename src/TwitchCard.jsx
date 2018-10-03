import React from 'react';
import { Row, Col, Media } from 'reactstrap';
import PropTypes from 'prop-types';
import './TwitchCard.css';

const TwitchCard = (props) => {
  const { account, stream } = props;
  const channel = account.display_name;

  const connected = stream !== null && stream !== undefined;
  const game = connected ? `Playing ... ${stream.channel.game}` : 'OFFLINE';
  const logo = account.logo ? account.logo : 'twitch.png';
  const status = connected ? stream.channel.status : '';
  const url = connected ? stream.channel.url : `https://www.twitch.tv/${channel}`;

  return (
    <Row className="align-items-center">
      <Col md={{ size: 8, offset: 2 }} xs={{ size: 11 }}>
        <div className={`channel connected_${connected}`} id={`channel_${channel}`}>
          <Media>
            <Media left middle href={url} target="_blank">
              <Media object src={logo} className="logo" />
            </Media>
            <Media body>
              <a target="_blank" rel="noopener noreferrer" href={url}>
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
        <button
          type="button"
          className="close"
          onClick={(e) => {
            e.preventDefault();
            props.delete(channel, connected);
          }}
        >
          &times;
        </button>
      </Col>
    </Row>
  );
};

TwitchCard.propTypes = {
  account: PropTypes.element.isRequired,
  stream: PropTypes.element.isRequired,
  delete: PropTypes.func.isRequired,
};

export default TwitchCard;
