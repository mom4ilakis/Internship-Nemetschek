import React from 'react';
import PropTypes from 'prop-types';

function AuthorDisplay(props) {
  return (
    <div className="media">
      <div className="media-left">
        <img className="image is-rounded is-32x32" alt="avatar" src={props.avatar} />
      </div>
      <b>{props.username}</b>
    </div>
  );
}

AuthorDisplay.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
};

export default AuthorDisplay;
