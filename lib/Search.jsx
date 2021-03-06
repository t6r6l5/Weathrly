import '../Styles/Search.scss';
import React, { Component } from 'react';
import Trie from '@t6r6l5/CompleteMe';
import CityNames from '../CityNames';
import PropTypes from 'prop-types';

class Search extends Component {
  constructor() {
    super();
    this.state = {value: '', focus: 0, placeholder: 'enter your location'};

    this.updateVal = this.updateVal.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.autoComplete = this.autoComplete.bind(this);
    this.selectLI = this.selectLI.bind(this);
    this.trie = new Trie();
    this.trie.populate(CityNames.data);
  }

  updateVal(e) {
    this.setState({value: e.target.value, focus: null});
    if (e.target.value.length) {
      this.trie.suggest(e.target.value);
    } else {
      this.trie.suggestions = [];
    }
  }

  setLocation() {
    let foundCity = this.state.value;

    if (foundCity.length === 5 && !isNaN(parseInt(foundCity))) {
      this.props.updateFunction(foundCity);
      this.setState({placeholder: 'enter your location'});
    } else {
      foundCity = CityNames.data.find( city => {
        return city === this.state.value;
      });
      if (!foundCity) {
        foundCity = CityNames.data.find( city => {
          return (city.toLowerCase())
            .includes(this.state.value.toLowerCase());
        });
      }
      if (foundCity) {
        this.props.updateFunction(foundCity);
        this.setState({placeholder: 'enter your location'});
      } else {
        this.setState({placeholder: 'location not found'});
      }
    }
    
    this.setState({value: ''});
    this.trie.suggestions = [];
  }

  autoComplete(e) {
    this.setState({value: e.target.innerText});
    this.trie.suggestions = [];
  }

  selectLI(e) {
    if (e.key === 'ArrowDown' && 
    this.trie.suggestions.slice(0, 6)[this.state.focus + 1]) {
      if (this.state.focus === null) {
        this.setState({
          focus: 0, 
          value: this.trie.suggestions[0]
        });
      } else {
        this.setState({
          focus: (Math.min(this.state.focus + 1, 5)), 
          value: this.trie.suggestions[this.state.focus + 1]
        });
      }
    } else if (e.key === 'ArrowUp' && this.state.focus !== null) {
      if (this.state.focus === 0) {
        this.setState({
          focus: null, 
          value: ''});
      } else {
        this.setState({
          focus: this.state.focus - 1, 
          value: this.trie.suggestions[this.state.focus - 1]
        });
      }
    } else if (e.key === "Enter") {
      this.setLocation();
    }
  }

  render() {
    return (
      <div className="Search">
        <div className="inputs">
          <input 
            type="text" 
            value={this.state.value} 
            onChange={this.updateVal} 
            placeholder={this.state.placeholder}
            onKeyDown={this.selectLI}
            aria-label={'search input'}
            className= {
              this.state.placeholder === "location not found" 
              ? 'not-found' :  ''
            }
            autoFocus
          />
          <button 
            onSelect={this.setLocation}
            onClick={this.setLocation}> 
            Get Weather </button>          
        </div>
        <ul>
          {this.trie.suggestions.map((suggestion, index) => {
            let shouldHighlight = index === this.state.focus ? 'highlight' : '';

            if (index < 6) {
              return <li 
                className={shouldHighlight}
                onClick={this.autoComplete} 
                key={index}>{suggestion} 
                </li>;
            }
          })}
        </ul>
      </div>
    );
  }
} 

Search.propTypes = {
  updateFunction: PropTypes.func
};

export default Search;