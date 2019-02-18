// @flow
import * as React from 'react';
import { parseURI } from 'lbry-redux';
import FileTile from 'component/fileTile';
import ChannelTile from 'component/channelTile';
import HiddenNsfwClaims from 'component/hiddenNsfwClaims';

const NoResults = () => <div className="file-tile">{__('No results')}</div>;

type Props = {
  query: string,
  isSearching: boolean,
  uris: ?Array<string>,
  downloadUris: ?Array<string>,
};

class FileListSearch extends React.PureComponent<Props> {
  render() {
    const { uris, query, downloadUris, isSearching } = this.props;

    return (
      query && (
        <React.Fragment>
          <div className="search__results">
            <section className="search__results-section">
              <div className="search__results-title">{__('Search Results')}</div>
              <HiddenNsfwClaims uris={uris} />
              {!isSearching && uris && uris.length ? (
                uris.map(
                  uri =>
                    parseURI(uri).claimName[0] === '@' ? (
                      <ChannelTile key={uri} uri={uri} />
                    ) : (
                      <FileTile key={uri} uri={uri} />
                    )
                )
              ) : (
                <NoResults />
              )}
            </section>
          </div>
        </React.Fragment>
      )
    );
  }
}

export default FileListSearch;
