import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Divider } from 'semantic-ui-react';
import { Loader } from '@components/Loader';
import { Error } from '@components/Error';
import { DocumentRequestActions } from './DocumentRequestActions';
import { DocumentRequestHeader } from './DocumentRequestHeader';
import { DocumentRequestMetadata } from './DocumentRequestMetadata';
import { DocumentRequestSteps } from './DocumentRequestSteps';

export default class DocumentRequestDetails extends Component {
  componentDidMount() {
    const { fetchDocumentRequestDetails } = this.props;
    fetchDocumentRequestDetails(this.props.match.params.documentRequestPid);
  }

  componentDidUpdate(prevProps) {
    const { fetchDocumentRequestDetails } = this.props;

    const documentRequestPid = this.props.match.params.documentRequestPid;
    const samePidFromRouter =
      prevProps.match.params.documentRequestPid === documentRequestPid;
    if (!samePidFromRouter) {
      fetchDocumentRequestDetails(documentRequestPid);
    }
  }

  render() {
    const { isLoading, error } = this.props;
    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <Container fluid className="spaced">
            <DocumentRequestHeader />
            <Divider />
            <DocumentRequestActions />
            <Divider />
          </Container>
          <Container>
            <DocumentRequestMetadata />
            <Divider />
            <DocumentRequestSteps />
          </Container>
        </Error>
      </Loader>
    );
  }
}

DocumentRequestDetails.propTypes = {
  fetchDocumentRequestDetails: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
};

DocumentRequestDetails.defaultProps = {
  isLoading: false,
  error: {},
};
