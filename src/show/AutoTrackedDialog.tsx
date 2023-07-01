import React, { useState } from 'react';

import {
  MovieQuery,
  TvQuery,
  SearchItem,
  useTvQuery,
  useMovieQuery,
  ItemType,
  ItemDataFragment,
} from '../graphql';
import { Dialog, Spinner, Code } from '@blueprintjs/core';
import Search from '../common/Search';
import { RelativeDate } from '../common/RelativeDate';
import { EditingWatched } from '../common/WatchedForm';
import WatchedMutationForm from '../common/WatchedMutationForm';
import { getAppContainer } from '../common/helpers/general';

export default function AutoTrackedDialog({
  item,
  editingWatched,
  onClose,
}: {
  item?: MovieQuery['movie'] | TvQuery['tv'] | ItemDataFragment | null;
  editingWatched: EditingWatched;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<SearchItem>();
  const queryVariables = { id: selected?.id };
  const tvQuery = useTvQuery({
    variables: queryVariables,
    skip: selected?.type !== ItemType.Tv,
  });
  const movieQuery = useMovieQuery({
    variables: queryVariables,
    skip: selected?.type !== ItemType.Movie,
  });
  const { data, loading } =
    selected?.type === ItemType.Movie ? movieQuery : tvQuery;

  const dataItem = data ? ('tv' in data ? data.tv : data.movie) : undefined;
  const selectedItem = item || dataItem;

  const title = item
    ? `Seen ${'name' in item ? item.name : item.title}`
    : 'Find auto tracked';
  const meta =
    editingWatched && !editingWatched.isEditing && editingWatched.autoTracked
      ? editingWatched.autoTracked.meta
      : undefined;

  return (
    <Dialog
      className="fluid-dialog"
      title={title}
      canOutsideClickClose={false}
      isOpen={!!editingWatched}
      lazy
      onClose={onClose}
      portalContainer={getAppContainer()}
    >
      {!item &&
        editingWatched &&
        'autoTracked' in editingWatched &&
        editingWatched.autoTracked && (
          <div className="p-3">
            <p>
              Seen <RelativeDate date={editingWatched.autoTracked.createdAt} />
            </p>
            <strong>Here's what we know:</strong>
            {meta && meta.title && (
              <p className="mb-1">
                <span>Title read as </span>
                <Code>{meta.title}</Code>
              </p>
            )}
            {meta && meta.tvData && (
              <div className="mb-1">
                <span>TV info - </span>
                {meta.tvData.season && <span>S{meta.tvData.season}</span>}
                {meta.tvData.episode && <span>E{meta.tvData.episode}</span>}
              </div>
            )}
            {meta && meta.provider && (
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
                      maxWidth: '320px',
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
                      maxWidth: '320px',
                      overflow: 'hidden',
                    }}
                  >
                    {meta.filename}
                  </Code>
                )}
              </div>
            )}
            <Search selected={selected} setSelected={setSelected} />
          </div>
        )}
      {loading && <Spinner />}
      {selectedItem && !loading && (
        <WatchedMutationForm
          item={selectedItem}
          editingWatched={editingWatched}
          afterSave={onClose}
        />
      )}
    </Dialog>
  );
}
