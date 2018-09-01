import styles from './Render.less';
import theme from './theme.less';

import React, { Component } from 'react';
import isMobile from 'ismobilejs';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Autosuggest from 'Autosuggest';
import dataset from './dataset';

const focusInputOnSuggestionClick = !isMobile.any;
const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('\\b' + escapedValue, 'i');

  return dataset
    .filter(person => regex.test(getSuggestionValue(person)))
    .slice(0, 5);
};

const getSuggestionValue = suggestion => `${suggestion.title}`;

const renderSuggestion = (suggestion, { query }) => {
  const suggestionText = `${suggestion.title}`;
  const matches = match(suggestionText, query);
  const parts = parse(suggestionText, matches);

  return (
    <span className={theme.name}>
      {parts.map((part, index) => {
        const className = part.highlight ? theme.highlight : null;

        return (
          <span className={className} key={index}>
            {part.text}
          </span>
        );
      })}
    </span>
  );
};

export default class Render extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    setTimeout(() => {
      if (value === this.state.value) {
        this.setState({
          suggestions: getSuggestions(value)
        });
      }
    }, 200);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search Here..',
      value,
      onChange: this.onChange
    };

    return (
      <div id="custom-render-example" className={styles.subHeader}>
        <div className={styles.autosuggest}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            focusInputOnSuggestionClick={focusInputOnSuggestionClick}
            theme={theme}
            id="custom-render-example"
          />
        </div>
      </div>
    );
  }
}
