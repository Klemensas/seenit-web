import React from 'react';
import {
  Card,
  ButtonGroup,
  Button,
  NonIdealState,
  Code,
  Icon,
} from '@blueprintjs/core';
import { Link, useLocation } from 'react-router-dom';

import { AutoTrackedListQuery } from '../graphql';
import { formatTvString } from '../common/helpers/watched';
import { RelativeDate } from '../common/RelativeDate';
import { preventBubbling } from '../common/helpers/general';
import { DialogQueryParams } from '../common/dialog/query-params';

type Props = AutoTrackedListQuery['autoTrackedList']['autoTracked'][0] & {
  isSelected: boolean;
  onSelect: () => void;
  onDeselect: () => void;
  onSave: () => void;
  onRemove: () => void;
};

export function AutoTrackedItems({
  id,
  createdAt,
  meta,
  item,
  tvItem,
  isSelected,
  onSelect,
  onDeselect,
  onSave,
  onRemove,
}: Props) {
  const name = item ? ('title' in item ? item.title : item.name) : '';
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  search.set(DialogQueryParams.EditingAutoTracked, id);

  return (
    <Card
      className={`card-watched fill-container ${isSelected ? 'selected' : ''}`}
      elevation={isSelected ? 4 : undefined}
      onClick={isSelected ? onDeselect : onSelect}
    >
      {item && (
        <>
          <div>
            <img
              width="300"
              height="200"
              className="img-responsive"
              src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
              alt={`${name} poster`}
            />
          </div>

          <div className="p-3 title">
            <div className="flex flex-content-between flex-items-center">
              <strong className="bp3-text-large bp3-text-overflow-ellipsis pr-2">
                {name}
              </strong>
              <div>{formatTvString(tvItem)}</div>
            </div>
            {createdAt && (
              <p className="bp3-text-small card-watched-muted">
                <RelativeDate date={createdAt} />
              </p>
            )}
          </div>
        </>
      )}
      {!item && (
        <NonIdealState
          icon="help"
          title="Couldn't find item"
          description={
            <div className="text-left px-2" style={{ width: '100%' }}>
              <div className="mb-3">
                <strong>Here's what we know:</strong>
              </div>
              <div className="mb-1">
                Watched <RelativeDate date={createdAt} />
              </div>
              {meta.title && (
                <div className="mb-1">
                  <span>Title read as </span>
                  <Code>{meta.title}</Code>{' '}
                </div>
              )}
              {meta.tvData && (
                <div className="mb-1">
                  <span>TV info - </span>
                  {meta.tvData.season && <span>S{meta.tvData.season}</span>}
                  {meta.tvData.episode && <span>E{meta.tvData.episode}</span>}
                </div>
              )}
              {meta.provider && (
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
              )}
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
