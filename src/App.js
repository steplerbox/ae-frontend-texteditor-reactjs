import React, { Component } from 'react';
import './App.css';
import ControlPanel, { formatCommandList } from './control-panel/ControlPanel';
import TextArea from './text-area/TextArea';
import SynonymsPanel from './synonyms-panel/SynonymsPanel';
import Popup from './popup/Popup';
import { getText, saveText } from './text.service';

class App extends Component {
  state = {
    initialText: undefined,
    selectedText: undefined,
    formatCommandStateMap: {},
  };

  componentDidMount() {
    getText().then(result => this.setState({ initialText: result }));
  }

  updateFormatCommandStateMap = () => {
    const formatCommandStateMap = formatCommandList.reduce((commandMap, command) => {
      commandMap[command] = document.queryCommandState(command);
      return commandMap;
    }, {});
    this.setState({ formatCommandStateMap });
  };

  handleTextChange = text => {
    saveText(text);
  };

  handleFormatChange = command => {
    document.execCommand(command, false, null);
    this.updateFormatCommandStateMap();
  };

  handleSelectionChange = selection => {
    this.updateFormatCommandStateMap();

    this.setState({
      selectedText: selection.toString().trim(),
      popupAnchorRect: selection.getRangeAt(0).getBoundingClientRect(),
    });
  };

  handleSynonymClick = synonym => {
    this.setState({ selectedText: undefined });
    document.execCommand('insertText', false, synonym.word);
  };

  render() {
    const { initialText, selectedText, formatCommandStateMap, popupAnchorRect } = this.state;
    return (
      <div className='App'>
        <header>
          <span>Simple Text Editor</span>
        </header>
        <main>
          <ControlPanel
            formatCommandStateMap={formatCommandStateMap}
            onFormatChange={this.handleFormatChange}
          />
          <TextArea
            text={initialText}
            onChange={this.handleTextChange}
            onSelectionChange={this.handleSelectionChange}
          />
          <Popup anchorRect={popupAnchorRect}>
            <SynonymsPanel
              word={selectedText}
              onSynonymClick={this.handleSynonymClick}
            />
          </Popup>
        </main>
      </div>
    );
  }
}

export default App;
