import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup } from 'reactstrap';

const ButtonBar = (props) => {
  const {
    current, all, online, offline,
  } = props;
  return (
    <ButtonGroup>
      <Button
        active={current === 'all'}
        onClick={all}
        color="primary"
      >
        All
      </Button>
      <Button
        active={current === 'online'}
        onClick={online}
        color="success"
      >
        Online
      </Button>
      {' '}
      <Button
        active={current === 'offline'}
        onClick={offline}
        color="danger"
      >
        Offline
      </Button>
    </ButtonGroup>
  );
};

ButtonBar.propTypes = {
  current: PropTypes.string.isRequired,
  all: PropTypes.func.isRequired,
  online: PropTypes.func.isRequired,
  offline: PropTypes.func.isRequired,
};

export default ButtonBar;
