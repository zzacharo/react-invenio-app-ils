import React, { Component } from 'react';
import { goTo } from '@history';
import { FrontSiteRoutes } from '@routes/urls';
import { SearchBar } from '@components/SearchBar';

export class HomeSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  updateSearchQuery = (e, elem) => {
    this.setState({ query: elem.target.value });
  };

  onSearchExecute = () => {
    const { query } = this.state;
    const encodedQuery = encodeURIComponent(query);
    goTo(FrontSiteRoutes.documentsListWithQuery(encodedQuery));
  };

  render() {
    const { query } = this.state;
    return (
      <SearchBar
        currentQueryString={query}
        onInputChange={this.updateSearchQuery}
        executeSearch={this.onSearchExecute}
        placeholder="Search for books, series, articles, publications..."
        className="fs-headline"
      />
    );
  }
}
