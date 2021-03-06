import DocumentEdition from '@modules/Document/DocumentEdition';
import { DocumentSelectListEntry } from '@modules/Document/backoffice/DocumentSelectListEntry';
import SeriesSelectListEntry from '@modules/Series/backoffice/SeriesSelectListEntry';
import { MultipleSelections } from '@modules/Relations/backoffice/components/MultipleSelections';
import { RelationSelector } from '@modules/Relations/backoffice/components/RelationSelector';
import { RelationModal } from '@modules/Relations/backoffice/components/RelationModal';
import { RelationSummary } from '@modules/Relations/backoffice/components/RelationSummary';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Divider,
  Form,
  Icon,
  Label,
  Modal,
} from 'semantic-ui-react';
import { documentApi } from '@api/documents';
import { seriesApi } from '@api/series';

export default class RelationEditionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      currentRecordType: 'document',
      query: documentApi.list,
    };
  }

  selectResultRender = (option, disabled) => {
    const { currentRecordType } = this.state;
    return currentRecordType === 'document' ? (
      <DocumentSelectListEntry
        document={option}
        description={option.metadata.document_type}
        disabled={disabled}
        key={option.metadata.pid}
      />
    ) : (
      <SeriesSelectListEntry
        series={option}
        key={option.metadata.pid}
        description={<DocumentEdition metadata={option.metadata} />}
        disabled={disabled}
      />
    );
  };

  toggleRecordTypeSearch = (e, { value }) => {
    if (value === 'document') {
      this.setState({
        currentRecordType: 'document',
        query: documentApi.list,
      });
    } else if (value === 'series') {
      this.setState({
        currentRecordType: 'series',
        query: seriesApi.multipartMonographs,
      });
    }
  };

  render() {
    const { recordDetails, relationType, relations } = this.props;
    const { isLoading, currentRecordType, query } = this.state;
    return (
      <RelationModal
        triggerButtonContent="Attach editions"
        modalHeader="Attach editions"
        isLoading={isLoading}
        relationType={relationType}
        referrerRecord={recordDetails}
      >
        <Modal.Content>
          <Container textAlign="left">
            Select other editions of this document to create the relation.
            <Form>
              <Container className="spaced">
                <Form.Group inline>
                  <label>Search in</label>
                  <Form.Radio
                    label="Documents"
                    value="document"
                    checked={currentRecordType === 'document'}
                    onChange={this.toggleRecordTypeSearch}
                  />
                  <Form.Radio
                    label="Series"
                    value="series"
                    checked={currentRecordType === 'series'}
                    onChange={this.toggleRecordTypeSearch}
                  />
                </Form.Group>

                <Container className="spaced">
                  <RelationSelector
                    existingRelations={relations.edition}
                    optionsQuery={query}
                    currentRecordType={currentRecordType}
                    resultRenderer={this.selectResultRender}
                    referrerRecordPid={recordDetails.metadata.pid}
                  />
                </Container>
              </Container>
            </Form>
          </Container>
          <Container textAlign="center">
            <Divider horizontal> Summary </Divider>
            <RelationSummary
              currentReferrer={recordDetails}
              renderSelections={() => <MultipleSelections />}
              columnsWidths={{ left: 4, middle: 3, right: 9 }}
              relationDescription={
                <>
                  <Icon size="large" name="arrows alternate horizontal" />
                  <br />
                  is an <Label color="blue">edition </Label> of
                </>
              }
            />
          </Container>
        </Modal.Content>
      </RelationModal>
    );
  }
}

RelationEditionModal.propTypes = {
  /* relations got from the current document, reducer */
  relations: PropTypes.object.isRequired,
  recordDetails: PropTypes.object.isRequired,
  relationType: PropTypes.string.isRequired,
};
