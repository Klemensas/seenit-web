import React from 'react';
import { Dialog } from '@blueprintjs/core';

import {
  WatchesQuery,
  useAddWatchedMutation,
  useEditWatchedMutation,
  ItemType,
  MovieQuery,
} from '../../graphql';
import WatchedMovieForm from '../../common/WatchedMovieForm';

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
  const [addWatched, addWatchedVariables] = useAddWatchedMutation();
  const [editWatched] = useEditWatchedMutation({
    update: cache => {
      // GC potentially removed content like ratings.
      // TODO: investigate more how apollo gc is triggered to potentially handle this automatically
      cache.gc();
    },
  });

  return (
    <Dialog
      className="fluid-dialog"
      title={`Seen ${movie.title}`}
      canOutsideClickClose={false}
      onClose={onClose}
      isOpen={!!editingWatched}
      lazy={true}
    >
      <WatchedMovieForm
        item={movie}
        values={
          editingWatched?.isEditing
            ? {
                createdAt: editingWatched.item.createdAt,
                review: editingWatched.item.review?.body || '',
                rating: editingWatched.item.rating?.value,
              }
            : undefined
        }
        isLoading={addWatchedVariables.loading}
        onSubmit={async ({ createdAt, rating, review }) => {
          let query;

          if (editingWatched?.isEditing) {
            query = editWatched({
              variables: {
                createdAt,
                id: editingWatched.item.id,
                rating: rating
                  ? {
                      id: editingWatched.item.rating?.id,
                      value: rating,
                    }
                  : undefined,
                review: review
                  ? {
                      id: editingWatched.item.review?.id,
                      body: review,
                    }
                  : undefined,
              },
            });
          }

          query = addWatched({
            variables: {
              createdAt,
              itemId: movie.id,
              itemType: ItemType.Movie,
              rating: rating ? { value: rating } : undefined,
              review: review ? { body: review } : undefined,
            },
          });

          await query;
          onClose();
        }}
      />
    </Dialog>
  );
}
