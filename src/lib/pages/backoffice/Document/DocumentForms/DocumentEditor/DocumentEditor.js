import React, { Component } from 'react';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { documentApi } from '@api/documents';
import { DocumentForm } from './DocumentForm';
import _get from 'lodash/get';

export class DocumentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
      error: {},
    };
  }

  componentDidMount() {
    if (this.props.match.params.documentPid) {
      this.fetchDocument(this.props.match.params.documentPid);
    }
  }

  get documentRequest() {
    const request = _get(this.props, 'location.state', null);
    if (!request) return null;
    return {
      documentRequestPid: request.pid,
      metadata: {
        title: _get(request, 'metadata.title'),
        // NOTE: serializing authors for the document form
        authors: [{ full_name: _get(request, 'metadata.authors') }],
        journalTitle: _get(request, 'metadata.journal_title'),
        edition: _get(request, 'metadata.edition'),
        publication_year: String(_get(request, 'metadata.publication_year')),
      },
    };
  }
  fetchDocument = async documentPid => {
    try {
      const response = await documentApi.get(documentPid);
      this.setState({ data: response.data, isLoading: false, error: {} });
    } catch (error) {
      this.setState({ isLoading: false, error: error });
    }
  };

  renderEditForm = pid => {
    const { isLoading, error, data } = this.state;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <DocumentForm
            pid={pid}
            data={data}
            title="Edit document"
            successSubmitMessage="The document was successfully updated."
          />
        </Error>
      </Loader>
    );
  };

  render() {
    const {
      match: {
        params: { documentPid },
      },
    } = this.props;
    const isEditForm = !!documentPid;
    return isEditForm ? (
      this.renderEditForm(documentPid)
    ) : (
      <DocumentForm
        title="Create new document"
        successSubmitMessage="The document was successfully created."
        data={this.documentRequest}
      />
    );
  }
}
