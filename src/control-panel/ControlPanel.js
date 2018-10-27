import React, { Component } from 'react';
import { object, func } from 'prop-types';
import cn from 'classnames';

import './ControlPanel.css';

export const formatCommandList = ['bold', 'italic', 'underline'];

const formatButtonLabelMap = {
  'bold': <b>B</b>,
  'italic': <i>I</i>,
  'underline': <u>U</u>,
};

class ControlPanel extends Component {
  static propTypes = {
    formatCommandStateMap: object,
    onFormatChange: func,
  };

  handleFormatButtonClick = command => () => {
    this.props.onFormatChange(command);
  };

  render() {
    const { formatCommandStateMap } = this.props;

    return (
      <div className='control-panel'>
        <div className='format-actions'>
          {formatCommandList.map(command => (
            <button
              key={command}
              className={cn('format-action', {'active': formatCommandStateMap[command]})}
              type='button'
              onClick={this.handleFormatButtonClick(command)}
            >
              {formatButtonLabelMap[command]}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default ControlPanel;
