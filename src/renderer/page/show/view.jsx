// @flow
import React from 'react';
import { parseURI } from 'lbry-redux';
import BusyIndicator from 'component/common/busy-indicator';
import ChannelPage from 'page/channel';
import FilePage from 'page/file';
import Page from 'component/page';
import Button from 'component/button';
import type { Claim } from 'types/claim';

type Props = {
  isResolvingUri: boolean,
  resolveUri: string => void,
  uri: string,
  claim: Claim,
  blackListedOutpoints: Array<{
    txid: string,
    nout: number,
  }>,
};

class ShowPage extends React.PureComponent<Props> {
  componentDidMount() {
    const { isResolvingUri, resolveUri, uri } = this.props;

    if (!isResolvingUri) resolveUri(uri);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { isResolvingUri, resolveUri, claim, uri } = nextProps;

    if (!isResolvingUri && claim === undefined && uri) {
      resolveUri(uri);
    }
  }

  componentDidUpdate(previousProps) {
    const { claim, uri, updateSearchQuery } = this.props;

    // Quick hack to populate the url for name normalization
    // This won't work for clicking file cards on the home page
    // But will work for related content and manually typing in a url
    if (claim) {
      // Successfully fetched claim on the new page
      if (previousProps.uri !== uri || !previousProps.claim) {
        let updatedUriValue = `lbry://${claim.name}`;

        if (uri.includes('#')) {
          updatedUriValue += `#${claim.claim_id}`;
        }

        updateSearchQuery(updatedUriValue);
      }
    }
  }

  render() {
    const { claim, isResolvingUri, uri, blackListedOutpoints } = this.props;

    let innerContent = '';

    if (isResolvingUri || !claim || !claim.name) {
      innerContent = (
        <Page notContained>
          {isResolvingUri && <BusyIndicator message={__('Loading decentralized data...')} />}
          {!isResolvingUri && (
            <span className="empty">{__("There's nothing available at this location.")}</span>
          )}
          {!isResolvingUri &&
            claim &&
            claim.error && <span className="empty">{__(' Backend message: ' + claim.error)}</span>}
        </Page>
      );
    } else if (claim.name.length && claim.name[0] === '@') {
      innerContent = <ChannelPage uri={uri} />;
    } else {
      let isClaimBlackListed = false;

      if (blackListedOutpoints && blackListedOutpoints.length) {
        for (let i = 0; i < blackListedOutpoints.length; i += 1) {
          const outpoint = blackListedOutpoints[i];
          if (outpoint.txid === claim.txid && outpoint.nout === claim.nout) {
            isClaimBlackListed = true;
            break;
          }
        }
      }

      if (isClaimBlackListed) {
        innerContent = (
          <Page>
            <section className="card card--section">
              <div className="card__title">{uri}</div>
              <div className="card__content">
                <p>
                  {__(
                    'In response to a complaint we received under the US Digital Millennium Copyright Act, we have blocked access to this content from our applications.'
                  )}
                </p>
              </div>
              <div className="card__actions">
                <Button button="link" href="https://lbry.io/faq/dmca" label={__('Read More')} />
              </div>
            </section>
          </Page>
        );
      } else {
        innerContent = <FilePage uri={uri} />;
      }
    }

    return innerContent;
  }
}

export default ShowPage;
