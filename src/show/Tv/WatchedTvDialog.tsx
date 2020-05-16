import React from 'react';
import { Dialog } from '@blueprintjs/core';

import {
  WatchesQuery,
  useAddWatchedMutation,
  useEditWatchedMutation,
  useSeasonsQuery,
  TvItemType,
  ItemType,
  TvQuery,
} from '../../graphql';
import WatchedTvForm from '../../common/WatchedTvForm';

export type EditingWatched =
  | null
  | { isEditing: false }
  | { isEditing: true; item: WatchesQuery['watches']['watched'][0] };

export default function WatchedTvDialog({
  tv,
  editingWatched,
  onClose,
}: {
  tv: TvQuery['tv'];
  editingWatched: EditingWatched;
  onClose: () => void;
}) {
  const { data } = useSeasonsQuery({
    variables: {
      itemId: tv.id,
    },
  });
  const [addWatched, addWatchedVariables] = useAddWatchedMutation();
  const [editWatched] = useEditWatchedMutation({
    update: cache => {
      // GC potentially removed content like ratings.
      // TODO: investigate more how apollo gc is triggered to potentially handle this automatically
      cache.gc();
    },
  });

  if (!tv.seasons) return null;

  return (
    <Dialog
      className="fluid-dialog"
      title={`Seen ${tv.name}`}
      canOutsideClickClose={false}
      onClose={onClose}
      isOpen={!!editingWatched}
      lazy={true}
    >
      <WatchedTvForm
        item={tv}
        values={
          editingWatched?.isEditing
            ? {
                createdAt: editingWatched.item.createdAt,
                review: editingWatched.item.review?.body || '',
                rating: editingWatched.item.rating?.value,
                tvItemId: editingWatched.item.tvItem?.id,
              }
            : undefined
        }
        isLoading={addWatchedVariables.loading}
        onSubmit={async ({ createdAt, rating, review, tvItemId }) => {
          let query;

          if (editingWatched?.isEditing) {
            query = editWatched({
              variables: {
                createdAt,
                id: editingWatched.item.id,
                tvItemId,
                tvItemType: tvItemId ? TvItemType.Episode : undefined,
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
              itemId: tv.id,
              itemType: ItemType.Tv,
              tvItemId,
              tvItemType: tvItemId ? TvItemType.Episode : undefined,
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
