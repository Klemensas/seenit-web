import React from 'react';

import { MovieQuery, TvQuery, WatchesQuery } from '../graphql';
import WatchedMovieDialog from './Movie/WatchedMovieDialog';
import WatchedTvDialog from './Tv/WatchedTvDialog';

export type EditingWatched =
  | null
  | { isEditing: false }
  | { isEditing: true; item: WatchesQuery['watches']['watched'][0] };

export default function WatchedDialog({
  item,
  editingWatched,
  onClose,
}: {
  item: MovieQuery['movie'] | TvQuery['tv'];
  editingWatched: EditingWatched;
  onClose: () => void;
}) {
  if (item.__typename === 'Movie') {
    return (
      <WatchedMovieDialog
        movie={item}
        editingWatched={editingWatched}
        onClose={onClose}
      />
    );
  }

  if (item.__typename === 'Tv') {
    return (
      <WatchedTvDialog
        tv={item}
        editingWatched={editingWatched}
        onClose={onClose}
      />
    );
  }

  return null;
}
