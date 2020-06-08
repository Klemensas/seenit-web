import React from 'react';
import { Dialog } from '@blueprintjs/core';

import { WatchesQuery, MovieQuery } from '../../graphql';

export type EditingWatched =
  | null
  | { isEditing: false }
  | { isEditing: true; item: WatchesQuery['watches']['watched'][0] };

export default function WatchedMovieDialog({
  movie,
  editingWatched,
  onClose,
}: {
  movie: MovieQuery['movie'];
  editingWatched: EditingWatched;
  onClose: () => void;
}) {
  return (
    <Dialog
      className="fluid-dialog"
      title={`Seen ${movie.title}`}
      canOutsideClickClose={false}
      onClose={onClose}
      isOpen={!!editingWatched}
      lazy={true}
    ></Dialog>
  );
}
