import React, { Component } from 'react';
import { node, object } from 'prop-types';

import './Popup.css';

class Popup extends Component {
  static propTypes = {
    children: node,
    anchorRect: object,
  };

  render() {
    const { children, anchorRect } = this.props;

    if (!anchorRect) {
      return null;
    }

    const left = (anchorRect.left + anchorRect.right) / 2;
    const top = anchorRect.bottom;

    return (
      <div className={'popup'} style={{ left, top }}>
        {children}
      </div>
    );
  }
}

export default Popup;
