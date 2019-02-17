import { Lbryio } from 'lbryinc';
import * as ACTIONS from '../../constants/action_types';

export function doFetchFileTags(claimID) {
  return dispatch => {
    Lbryio.call('badge', 'list', { claim_id: claimID })
      .then(response => {
        console.log(response);
        dispatch({
          type: ACTIONS.UPDATE_FILETAGS,
          data: response,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function doAddNewFileTag(tag, claimID) {
  return dispatch => {
    Lbryio.call('badge', 'new', { tag, claim_id: claimID })
      .then(() => {
        dispatch(doFetchFileTags(claimID));
      })
      .catch(error => {
        console.log('NewFileTag Error: ', error);
      });
  };
}

export function doDeleteFileTag(tag, claimID) {
  return dispatch => {
    console.log('tag', tag);
    Lbryio.call('badge', 'delete', { tag, claim_id: claimID })
      .then(() => {
        dispatch(doFetchFileTags(claimID));
      })
      .catch(error => {
        console.og('DeleteFileTag Error: ', error);
      });
  };
}
