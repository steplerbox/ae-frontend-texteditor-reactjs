import React, { Component } from 'react';
import { string, func } from 'prop-types';

import getSynonymsList from '../synonyms.service';

import './SynonymsPanel.css';

class SynonymsPanel extends Component {
  static propTypes = {
    word: string,
    onSynonymClick: func,
  };

  state = {
    isFetching: false,
    synonymsList: [],
  };

  componentDidMount() {
    if (this.props.word) {
      this.fetchSynonyms(this.props.word);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.word && this.props.word !== prevProps.word) {
      this.fetchSynonyms(this.props.word);
    }
  }

  fetchSynonyms = word => {
    this.setState({ isFetching: true });
    getSynonymsList(word)
      .then(synonymsList => this.setState({ synonymsList, isFetching: false }))
      .catch(() => this.setState({ synonymsList: [], isFetching: false }));
  };

  handleSynonymClick = synonym => () => {
    this.props.onSynonymClick(synonym);
  };

  render() {
    const { word } = this.props;
    const { synonymsList, isFetching } = this.state;

    if (!word || isFetching) {
      return null;
    }

    return (
      <div className={'synonyms-panel'}>
        <div className={'word'}>{word}</div>
        <div className={'synonyms-list'}>
          {synonymsList.length === 0
            ? <div className={'not-found'}>{'synonyms not found'}</div>
            : synonymsList.map(synonym => (
              <div
                key={synonym.word}
                className={'synonym'}
                onClick={this.handleSynonymClick(synonym)}
              >
                {synonym.word}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default SynonymsPanel;
