import * as SETTINGS from 'constants/settings';
import * as ICONS from 'constants/icons';
import React, { useState } from 'react';
import { SEARCH_OPTIONS } from 'lbry-redux';
import { Form, FormField } from 'component/common/form';
import posed from 'react-pose';
import Button from 'component/button';

const ExpandableOptions = posed.div({
  hide: { height: 0, opacity: 0 },
  show: { height: 280, opacity: 1 },
});

const SearchOptions = (props: Props) => {
  const { options, setSearchOption } = props;
  const [expanded, setExpanded] = useState(false);
  const resultCount = options[SEARCH_OPTIONS.RESULT_COUNT];

  return (
    <div className="card card--section search__options-wrapper">
      <div className="card--space-between">
        <Button
          label={__('SEARCH OPTIONS')}
          icon={ICONS.OPTIONS}
          onClick={() => setExpanded(!expanded)}
        />
        <div className="media__action-group">
          <span>{__('Find what you were looking for?')}</span>
          <Button description={__('Yes')} icon={ICONS.YES} />
          <Button description={__('No')} icon={ICONS.NO} />
        </div>
      </div>
      <ExpandableOptions pose={expanded ? 'show' : 'hide'}>
        {expanded && (
          <Form className="card__content search__options">
            <fieldset>
              <legend className="search__legend--1">{__('Search For')}</legend>
              {[
                {
                  option: SEARCH_OPTIONS.INCLUDE_FILES,
                  label: __('Files'),
                },
                {
                  option: SEARCH_OPTIONS.INCLUDE_CHANNELS,
                  label: __('Channels'),
                },
                {
                  option: SEARCH_OPTIONS.INCLUDE_DOWNLOADS,
                  label: __('Your Downloads'),
                },
              ].map(({ option, label }) => (
                <FormField
                  key={option}
                  type="checkbox"
                  blockWrap={false}
                  label={label}
                  checked={options[option]}
                  onChange={() => setSearchOption(option, !options[option])}
                />
              ))}
            </fieldset>

            <fieldset>
              <legend className="search__legend--2">{__('Included File Types')}</legend>
              {[
                {
                  option: SEARCH_OPTIONS.MEDIA_VIDEO,
                  label: __('Videos'),
                },
                {
                  option: SEARCH_OPTIONS.MEDIA_AUDIO,
                  label: __('Sounds'),
                },
                {
                  option: SEARCH_OPTIONS.MEDIA_IMAGE,
                  label: __('Images'),
                },
                {
                  option: SEARCH_OPTIONS.MEDIA_TEXT,
                  label: __('Text'),
                },
                {
                  option: SEARCH_OPTIONS.MEDIA_APPLICATION,
                  label: __('Other Files'),
                },
              ].map(({ option, label }) => (
                <FormField
                  key={option}
                  type="checkbox"
                  blockWrap={false}
                  label={label}
                  checked={options[option]}
                  onChange={() => setSearchOption(option, !options[option])}
                />
              ))}
            </fieldset>

            <fieldset>
              <legend className="search__legend--3">{__('Other Options')}</legend>
              <FormField
                type="number"
                value={resultCount}
                onChange={e => setSearchOption(SEARCH_OPTIONS.RESULT_COUNT, e.target.value)}
                blockWrap={false}
                label={__('Returned Results')}
              />
            </fieldset>
          </Form>
        )}
      </ExpandableOptions>
    </div>
  );
};

export default SearchOptions;
