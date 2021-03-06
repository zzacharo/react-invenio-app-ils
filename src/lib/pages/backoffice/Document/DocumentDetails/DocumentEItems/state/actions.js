import { IS_LOADING, SUCCESS, HAS_ERROR } from './types';
import { eItemApi } from '@api/eitems';
import { sendErrorNotification } from '@components/Notifications';

export const fetchDocumentEItems = documentPid => {
  return async dispatch => {
    dispatch({
      type: IS_LOADING,
    });

    await eItemApi
      .list(
        eItemApi
          .query()
          .withDocPid(documentPid)
          .qs()
      )
      .then(response => {
        dispatch({
          type: SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: HAS_ERROR,
          payload: error,
        });
        dispatch(sendErrorNotification(error));
      });
  };
};
