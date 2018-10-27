import React, { Component } from 'react';
import { string, func } from 'prop-types';
import './TextArea.css';

class TextArea extends Component {
  static propTypes = {
    text: string,
    onChange: func,
    onCaretPositionChange: func,
    onSelectionChange: func,
  };

  contentRef = React.createRef();
  selectionChangeTimeout = undefined;

  componentWillUnmount() {
    clearTimeout(this.selectionChangeTimeout);
  }

  handleInput = () => {
    this.props.onChange(this.contentRef.current.innerHTML)
  };

  handleKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      document.execCommand('insertText', false, '    ');
    }
  };

  handleSelectionChange = () => {
    clearTimeout(this.selectionChangeTimeout);
    this.selectionChangeTimeout = setTimeout(() => {
      this.props.onSelectionChange(window.getSelection());
    }, 500);
  };

  render() {
    const { text } = this.props;
    return (
      <div className='text-area-container'>
        <div
          className='text-area'
          ref={this.contentRef}
          contentEditable={true}
          dangerouslySetInnerHTML={{__html: text }}
          onKeyDown={this.handleKeyDown}
          onInput={this.handleInput}
          onKeyUp={this.handleSelectionChange}
          onMouseUp={this.handleSelectionChange}
        >
        </div>
      </div>
    );
  }
}

export default TextArea;
