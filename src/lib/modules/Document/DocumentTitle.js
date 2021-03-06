import DocumentEdition from './DocumentEdition';
import React from 'react';
import PropTypes from 'prop-types';
import Overridable from 'react-overridable';
import Truncate from 'react-truncate';
import _get from 'lodash/get';

const EditionTitleCmp = ({ metadata }) => {
  const edition = _get(metadata, 'edition');
  const year = _get(metadata, 'publication_year');
  /* render both edition and year, or only edition, or only year or nothing
   * title (edition - year)
   * title (edition)
   * title (year)
   * title
   */
  const editionYearCmp =
    edition && year ? (
      <>
        {'('}
        <DocumentEdition metadata={metadata} /> - {year}
        {')'}
      </>
    ) : edition ? (
      <>
        (
        <DocumentEdition metadata={metadata} />)
      </>
    ) : year ? (
      `(${year})`
    ) : (
      ''
    );
  return editionYearCmp;
};

const DocumentTitle = ({ metadata, titleOnly, truncate }) => {
  const title = _get(metadata, 'title', 'No title set!');

  let titleCmp;
  if (titleOnly) {
    titleCmp = title;
  } else {
    titleCmp = (
      <>
        {title} <EditionTitleCmp metadata={metadata} />
      </>
    );
  }

  const cmp = <div className="document-title">{titleCmp}</div>;

  return truncate ? (
    <Truncate lines={2} ellipsis="... ">
      {cmp}
    </Truncate>
  ) : (
    cmp
  );
};

DocumentTitle.propTypes = {
  metadata: PropTypes.object.isRequired,
  titleOnly: PropTypes.bool,
  truncate: PropTypes.bool,
};

DocumentTitle.defaultProps = {
  titleOnly: false,
  truncate: false,
};

export default Overridable.component('DocumentTitle', DocumentTitle);
