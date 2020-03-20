import React from 'react';
import PropTypes from 'prop-types'


function SDC(props) {
  return (
    <div className="buttons are-small has-addons is-centered">
      {props.handleSubmit && <button className="button is-primary" onClick={props.handleSubmit}>Submit</button>}
      {props.handleCancel && <button className="button is-info" onClick={props.handleCancel}>Cancel</button>}
      {props.handleDelete && <button className="button is-danger" onClick={props.handleDelete}>Delete</button>}
    </div>
  );
}

SDC.propTypes = {
  handleCancel: PropTypes.func,
  handleDelete: PropTypes.func,
  handleSubmit: PropTypes.func,

}

export default SDC;
