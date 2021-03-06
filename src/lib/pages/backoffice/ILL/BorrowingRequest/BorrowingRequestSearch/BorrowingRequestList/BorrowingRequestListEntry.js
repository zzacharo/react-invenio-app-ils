import { toShortDate } from '@api/date';
import { getDisplayVal } from '@config/invenioConfig';
import { ILLBorrowingRequestIcon } from '@components/backoffice/icons';
import { BackOfficeRoutes, ILLRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Item, List } from 'semantic-ui-react';

export default class BorrowingRequestListEntry extends Component {
  renderLeftColumn = brwReqMetadata => {
    const {
      status,
      library_pid: libraryPid,
      library,
      due_date: dueDate,
    } = brwReqMetadata;
    return (
      <>
        <Item.Description>
          <label>status </label>
          {getDisplayVal('illBorrowingRequests.statuses', status)}
        </Item.Description>
        <Item.Description>
          <label>library </label>
          <Link to={ILLRoutes.libraryDetailsFor(libraryPid)}>
            {library.name}
          </Link>
        </Item.Description>
        <Item.Description>
          <label>due date </label>
          {dueDate ? toShortDate(dueDate) : '-'}
        </Item.Description>
      </>
    );
  };

  renderMiddleColumn = brwReqMetadata => {
    const { renderMiddleColumn } = this.props;
    if (renderMiddleColumn) {
      return renderMiddleColumn(brwReqMetadata);
    }
    const {
      document_pid: documentPid,
      patron_pid: patronPid,
      patron,
    } = brwReqMetadata;

    const documentCmp = (
      <>
        Document{' '}
        <Link to={BackOfficeRoutes.documentDetailsFor(documentPid)}>
          <code>{documentPid}</code>
        </Link>
      </>
    );
    const patronCmp = (
      <>
        Patron{' '}
        <Link to={BackOfficeRoutes.patronDetailsFor(patronPid)}>
          <code>
            {patron.name} ({patronPid})
          </code>
        </Link>
      </>
    );

    return (
      <>
        <Item.Description>
          <Item.Meta>{documentCmp}</Item.Meta>
        </Item.Description>
        <Item.Description>
          <Item.Meta>{patronCmp}</Item.Meta>
        </Item.Description>
      </>
    );
  };

  renderRightColumn = brwReqMetadata => {
    const { renderRightColumn } = this.props;
    if (renderRightColumn) {
      return renderRightColumn(brwReqMetadata);
    }
    const {
      request_date: requestDate,
      received_date: receivedDate,
      expected_delivery_date: expectedDeliveryDate,
    } = brwReqMetadata;
    return (
      <List verticalAlign="middle" className="document-circulation">
        {requestDate && (
          <List.Item>
            <List.Content floated="right">
              <strong>{toShortDate(requestDate)}</strong>
            </List.Content>
            <List.Content>requested</List.Content>
          </List.Item>
        )}
        {receivedDate && (
          <List.Item>
            <List.Content floated="right">
              <strong>{toShortDate(receivedDate)}</strong>
            </List.Content>
            <List.Content>received</List.Content>
          </List.Item>
        )}
        {expectedDeliveryDate && (
          <List.Item>
            <List.Content floated="right">
              <strong>{toShortDate(expectedDeliveryDate)}</strong>
            </List.Content>
            <List.Content>expected</List.Content>
          </List.Item>
        )}
      </List>
    );
  };

  render() {
    const { brwReqMetadata } = this.props;
    return (
      <Item>
        <Item.Content>
          <Item.Header
            as={Link}
            to={ILLRoutes.borrowingRequestDetailsFor(brwReqMetadata.pid)}
            data-test={`navigate-${brwReqMetadata.pid}`}
          >
            <ILLBorrowingRequestIcon />
            Borrowing Request: {brwReqMetadata.pid}
          </Item.Header>
          <Grid highlight={3}>
            <Grid.Column computer={5} largeScreen={5}>
              {this.renderLeftColumn(brwReqMetadata)}
            </Grid.Column>
            <Grid.Column computer={6} largeScreen={6}>
              {this.renderMiddleColumn(brwReqMetadata)}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column computer={3} largeScreen={3}>
              {this.renderRightColumn(brwReqMetadata)}
            </Grid.Column>
          </Grid>
        </Item.Content>
        <div className="pid-field">#{brwReqMetadata.pid}</div>
      </Item>
    );
  }
}

BorrowingRequestListEntry.propTypes = {
  brwReqMetadata: PropTypes.object.isRequired,
  renderMiddleColumn: PropTypes.func,
  renderRightColumn: PropTypes.func,
};

BorrowingRequestListEntry.defaultProps = {
  renderMiddleColumn: null,
  renderRightColumn: null,
};
