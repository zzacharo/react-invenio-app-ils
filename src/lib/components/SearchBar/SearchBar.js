import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Overridable from 'react-overridable';
import { Input } from 'semantic-ui-react';
import { QueryBuildHelper } from './QueryBuildHelper';

class SearchBar extends Component {
  componentDidMount() {
    if (this.searchInput) {
      this.searchInput.focus();
    }
  }

  onChangeHandler = (e, { value }, onInputChange) => {
    onInputChange(value, e);
  };

  onKeyPressHandler = (event, executeSearch) => {
    if (event.key === 'Enter') {
      executeSearch();
    }
  };

  render() {
    const {
      currentQueryString,
      onInputChange,
      executeSearch,
      placeholder,
      queryHelperFields,
      buttonColor,
      ...otherProps
    } = this.props;
    return (
      <Overridable id="SearchBar.layout" {...this.props}>
        <>
          <Input
            action={{
              color: buttonColor,
              icon: 'search',
              onClick: executeSearch,
            }}
            size="big"
            fluid
            placeholder={placeholder}
            onChange={(e, { value }) =>
              this.onChangeHandler(e, { value }, onInputChange)
            }
            value={currentQueryString}
            onKeyPress={event => this.onKeyPressHandler(event, executeSearch)}
            ref={input => {
              this.searchInput = input;
            }}
            {...otherProps}
            className={`${otherProps.className} ils-searchbar`}
          />
          {queryHelperFields.length > 0 && (
            <QueryBuildHelper
              fields={queryHelperFields}
              currentQueryString={currentQueryString}
              updateQueryString={onInputChange}
            />
          )}
        </>
      </Overridable>
    );
  }
}

SearchBar.propTypes = {
  currentQueryString: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  executeSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  queryHelperFields: PropTypes.array,
  buttonColor: PropTypes.string,
};

SearchBar.defaultProps = {
  currentQueryString: '',
  queryHelperFields: [],
  buttonColor: null,
};

export default Overridable.component('SearchBar', SearchBar);
