import React, { Component } from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import {
  Error,
  ResultsList,
  ReactSearchKit,
  ResultsLoader,
  SearchBar,
  InvenioSearchApi,
} from 'react-searchkit';
import { Error as IlsError } from '@components/Error';
import { SearchBar as LibrarySearchBar } from '@components/SearchBar';
import { SearchControls } from '@modules/SearchControls/SearchControls';
import SearchFooter from '@modules/SearchControls/SearchFooter';
import SearchEmptyResults from '@modules/SearchControls/SearchEmptyResults';
import { illLibraryApi as libraryApi } from '@api/ill';
import { ILLRoutes } from '@routes/urls';
import { ExportReactSearchKitResults } from '@components/backoffice/ExportSearchResults';
import { NewButton } from '@components/backoffice/buttons/NewButton';
import history from '@history';
import { LibraryList } from './LibraryList';

export class LibrarySearch extends Component {
  searchApi = new InvenioSearchApi({
    axios: {
      url: libraryApi.searchBaseURL,
      withCredentials: true,
    },
  });

  renderSearchBar = (_, queryString, onInputChange, executeSearch) => {
    const helperFields = [
      {
        name: 'name',
        field: 'name',
        defaultValue: '"Test library"',
      },
      {
        name: 'email',
        field: 'email',
        defaultValue: '"info@library.com"',
      },
      {
        name: 'address',
        field: 'address',
        defaultValue: '"Geneva"',
      },
    ];
    return (
      <LibrarySearchBar
        currentQueryString={queryString}
        onInputChange={onInputChange}
        executeSearch={executeSearch}
        placeholder="Search for libaries"
        queryHelperFields={helperFields}
      />
    );
  };

  renderEmptyResultsExtra = () => {
    return <NewButton text="Add library" to={ILLRoutes.libraryCreate} />;
  };

  renderError = error => {
    return <IlsError error={error} />;
  };

  renderLibraryList = results => {
    return <LibraryList hits={results} />;
  };

  render() {
    return (
      <>
        <Header as="h2">Libraries</Header>
        <ReactSearchKit searchApi={this.searchApi} history={history}>
          <Container fluid className="spaced">
            <SearchBar renderElement={this.renderSearchBar} />
          </Container>
          <Container fluid className="bo-search-body">
            <Grid>
              <Grid.Row columns={2}>
                <ResultsLoader>
                  <Grid.Column width={16}>
                    <Grid columns={2}>
                      <Grid.Column width={8}>
                        <NewButton
                          text="Add library"
                          to={ILLRoutes.libraryCreate}
                        />
                      </Grid.Column>
                      <Grid.Column width={8} textAlign="right">
                        <ExportReactSearchKitResults
                          exportBaseUrl={libraryApi.searchBaseURL}
                        />
                      </Grid.Column>
                    </Grid>
                    <SearchEmptyResults extras={this.renderEmptyResultsExtra} />
                    <Error renderElement={this.renderError} />
                    <SearchControls
                      modelName="illLibraries"
                      withLayoutSwitcher={false}
                    />
                    <ResultsList renderElement={this.renderLibraryList} />
                    <SearchFooter />
                  </Grid.Column>
                </ResultsLoader>
              </Grid.Row>
            </Grid>
          </Container>
        </ReactSearchKit>
      </>
    );
  }
}
