import { IS_LOADING, SUCCESS, HAS_ERROR } from './types';
import { invenioConfig } from '@config';
import { illBorrowingRequestApi as BorrowingRequestApi } from '@api/ill';
import { sendErrorNotification } from '@components/Notifications';

const selectQuery = (patronPid, page = 1, size) => {
  return BorrowingRequestApi.query()
    .withPatron(patronPid)
    .withState(invenioConfig.illBorrowingRequests.completedStatuses)
    .withSize(size)
    .withPage(page)
    .qs();
};

export const fetchPatronPastBorrowingRequests = (
  patronPid,
  page,
  size = invenioConfig.defaultResultsSize
) => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });
    try {
      const response = await BorrowingRequestApi.list(
        selectQuery(patronPid, page, size)
      );

      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: HAS_ERROR,
        payload: error,
      });
      dispatch(sendErrorNotification(error));
    }
  };
};
