import { Error } from '@components/Error';
import { Loader } from '@components/Loader';
import { ResultsTable } from '@components/ResultsTable/ResultsTable';
import { InfoMessage } from '@components/backoffice/InfoMessage';
import { SeriesDetailsLink } from '@components/backoffice/buttons/ViewDetailsButtons/SeriesDetailsLink';
import { RelationRemover } from '@modules/Relations/backoffice/components/RelationRemover';
import DocumentTitle from '@modules/Document/DocumentTitle';
import _isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Icon, Popup } from 'semantic-ui-react';
import { RelationMultipartModal } from '../RelationMultipartMonograph/RelationMultipartModal';

export default class RelationMultipart extends Component {
  constructor(props) {
    super(props);
    this.relationType = 'multipart_monograph';
    this.state = {
      activePage: 1,
    };
  }

  viewDetails = ({ row }) => {
    return (
      <SeriesDetailsLink pidValue={row.pid_value}>
        <DocumentTitle metadata={row.record_metadata} />
      </SeriesDetailsLink>
    );
  };

  removeHandler = ({ row }) => {
    const { documentDetails } = this.props;

    if (!_isEmpty(documentDetails)) {
      return (
        <RelationRemover
          referrer={documentDetails}
          related={row}
          relationType={row.relation_type}
          buttonContent="Remove from this multipart"
        />
      );
    }
  };

  render() {
    const { activePage } = this.state;
    const { relations, showMaxRows, isLoading, error } = this.props;
    /* there will be always only one MM */
    const multipartMonograph = relations[this.relationType] || [];

    const columns = [
      { title: 'PID', field: 'pid_value' },
      { title: 'Title', field: '', formatter: this.viewDetails },
      { title: 'Volume', field: 'volume' },
      { title: 'Actions', field: '', formatter: this.removeHandler },
    ];

    return (
      <Loader isLoading={isLoading}>
        <Error error={error}>
          <RelationMultipartModal
            relationType={this.relationType}
            disabled={!_isEmpty(multipartMonograph)}
          />

          {!_isEmpty(multipartMonograph) && (
            <Popup
              content="A document can be attached only to one multipart monotgraph. Remove the existing relation to add a new one."
              trigger={<Icon name="question circle" />}
            />
          )}
          <ResultsTable
            data={multipartMonograph}
            columns={columns}
            totalHitsCount={multipartMonograph.length}
            showMaxRows={showMaxRows}
            currentPage={activePage}
            renderEmptyResultsElement={() => (
              <InfoMessage
                header="No multipart attached"
                content="Use the button above to attach this document to a multipart monograph."
              />
            )}
          />
        </Error>
      </Loader>
    );
  }
}

RelationMultipart.propTypes = {
  relations: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  documentDetails: PropTypes.object.isRequired,
  showMaxRows: PropTypes.number,
  error: PropTypes.object,
};

RelationMultipart.defaultProps = {
  showMaxRows: 3,
  error: null,
};
