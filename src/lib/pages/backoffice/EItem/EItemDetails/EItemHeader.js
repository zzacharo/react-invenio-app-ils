import { toShortDate } from '@api/date';
import { CopyButton } from '@components/CopyButton';
import DocumentAuthors from '@modules/Document/DocumentTitle';
import DocumentTitle from '@modules/Document/DocumentAuthors';
import { DetailsHeader } from '@components/backoffice/DetailsHeader';
import { DocumentIcon } from '@components/backoffice/icons';
import { EItemIcon } from '@components/backoffice/icons';
import { OpenAccessLabel } from '@components/backoffice/OpenAccessLabel';
import { BackOfficeRoutes } from '@routes/urls';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class EItemHeader extends Component {
  render() {
    const { data } = this.props;
    const recordInfo = (
      <>
        <label className="muted">Electronic copy</label> {data.metadata.pid}{' '}
        <CopyButton text={data.metadata.pid} />
        <br />
        <label className="muted">Created on</label> {toShortDate(data.created)}
        <br />
        <Link
          to={BackOfficeRoutes.documentDetailsFor(data.metadata.document_pid)}
        >
          see document <DocumentIcon />
        </Link>
        <br />
        <OpenAccessLabel openAccess={data.metadata.open_access} />
      </>
    );
    return (
      <DetailsHeader
        title={
          <>
            {data.metadata.pid}:{' '}
            <DocumentTitle metadata={data.metadata.document} short truncate />
          </>
        }
        subTitle={
          <DocumentAuthors
            metadata={data.metadata.document}
            prefix="by "
            authorsLimit={10}
          />
        }
        pid={data.metadata.pid}
        icon={<EItemIcon />}
        recordInfo={recordInfo}
      />
    );
  }
}

EItemHeader.propTypes = {
  data: PropTypes.object.isRequired,
};
