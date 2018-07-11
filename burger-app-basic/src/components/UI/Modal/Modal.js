import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.css';

// updated to stateful component to use lifecycle hooks | or can use it as pure component
class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop
          show={this.props.show}
          cancel={this.props.modalClosed}
        />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;