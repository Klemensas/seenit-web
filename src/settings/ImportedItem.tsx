import React from 'react';
import {
  Card,
  ButtonGroup,
  Button,
  NonIdealState,
  Icon,
} from '@blueprintjs/core';
import { Link, useLocation } from 'react-router-dom';

import { ImportLetterboxdQuery } from '../graphql';
import { formatTvString } from '../common/helpers/watched';
import { RelativeDate } from '../common/RelativeDate';
import { preventBubbling } from '../common/helpers/general';
import Rating, { RatingSize } from '../common/Rating';

type Props = ImportLetterboxdQuery['importLetterboxd'][0] & {
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
  onSave: () => void;
  onRemove: () => void;
};

export function ImportedItem({
  imported,
  original,
  isSelected,
  onSelect,
  onDeselect,
  onSave,
  onRemove,
}: Props) {
  let item: any;
  let tvItem: any;
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  // search.set(DialogQueryParams.EditingAutoTracked, id);

  if (imported) {
    imported = {
      ...imported,
      review: {
        body: 'laba diena su vistiena',
      },
    };
  }

  return (
    <Card
      className={`card-watched fill-container ${isSelected ? 'selected' : ''}`}
      elevation={isSelected ? 4 : undefined}
      onClick={isSelected ? onDeselect : onSelect}
    >
      {imported && (
        <>
          <div style={{ position: 'relative' }}>
            <img
              width="300"
              height="200"
              className="img-responsive"
              src={`https://image.tmdb.org/t/p/w342${imported.item.poster_path}`}
              alt={`${imported.item.title} poster`}
            />
            <div className="item-text-overlay">
              <div className="item-text-overlay-top p-3 pb-4">
                <div className="flex flex-content-between flex-items-center">
                  <strong className="bp3-text-large bp3-text-overflow-ellipsis pr-2">
                    {imported.item.title}
                  </strong>
                  <div>{formatTvString(tvItem) || 'S02E13'}</div>
                </div>
                <div className="flex flex-content-between">
                  <div className="bp3-text-small card-watched-muted">
                    <RelativeDate date={imported.createdAt} />
                  </div>
                  {imported.rating && (
                    <Rating
                      value={imported.rating.value * 2}
                      size={RatingSize.Small}
                    />
                  )}
                </div>
              </div>
              {imported.review && (
                <div className="item-text-overlay-bottom p-3 pt-4">
                  <div className="text-ellipsis">
                    <Icon icon="comment" className="pr-2" />
                    {imported.review.body}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {!imported && (
        <NonIdealState
          icon="help"
          title="Couldn't match item"
          description={
            <div className="text-left px-2" style={{ width: '100%' }}>
              <div className="mb-3">
                <strong>Here's what we know:</strong>
              </div>
              <div className="mb-1">
                {/* Watched <RelativeDate date={watchedDate || date} /> */}
              </div>
              {/* {meta.title && (
                <div className="mb-1">
                  <span>Title read as </span>
                  <Code>{meta.title}</Code>{' '}
                </div>
              )} */}
              {/* {meta.tvData && (
                <div className="mb-1">
                  <span>TV info - </span>
                  {meta.tvData.season && <span>S{meta.tvData.season}</span>}
                  {meta.tvData.episode && <span>E{meta.tvData.episode}</span>}
                </div>
              )} */}
              {/* {meta.provider && (
                <div className="mb-1">
                  <span>Tracked on {meta.provider}, from</span>
                  <br />
                  {meta.url && (
                    <Code
                      className="mt-1"
                      style={{
                        display: 'inline-block',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        overflow: 'hidden',
                      }}
                    >
                      {meta.url}
                    </Code>
                  )}
                  {meta.filename && (
                    <Code
                      className="mt-1"
                      style={{
                        display: 'inline-block',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        overflow: 'hidden',
                      }}
                    >
                      {meta.filename}
                    </Code>
                  )}
                </div>
              )} */}
            </div>
          }
        />
      )}
      <ButtonGroup fill minimal onClick={preventBubbling()}>
        {item && (
          <Button disabled={!item} icon="tick" onClick={onSave}>
            Save
          </Button>
        )}
        <Link<any>
          to={{ search: search.toString() }}
          replace
          className="bp3-button"
        >
          <Icon icon="edit" className="mr-2" />
          <span>Edit</span>
        </Link>

        <Button icon="trash" onClick={onRemove}>
          Remove
        </Button>
      </ButtonGroup>
    </Card>
  );
}
