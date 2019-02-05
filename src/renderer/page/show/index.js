import { connect } from 'react-redux';
import {
  doResolveUri,
  makeSelectClaimForUri,
  makeSelectIsUriResolving,
  selectBlackListedOutpoints,
  doUpdateSearchQuery,
} from 'lbry-redux';
import ShowPage from './view';

const select = (state, props) => ({
  claim: makeSelectClaimForUri(props.uri)(state),
  isResolvingUri: makeSelectIsUriResolving(props.uri)(state),
  blackListedOutpoints: selectBlackListedOutpoints(state),
});

const perform = dispatch => ({
  resolveUri: uri => dispatch(doResolveUri(uri)),
  updateSearchQuery: query => dispatch(doUpdateSearchQuery(query)),
});

export default connect(
  select,
  perform
)(ShowPage);
