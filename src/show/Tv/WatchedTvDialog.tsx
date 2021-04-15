import React from 'react';
import { Dialog } from '@blueprintjs/core';

import {
  WatchesQuery,
  useAddWatchedMutation,
  useEditWatchedMutation,
  TvItemType,
  ItemType,
  TvQuery,
} from '../../graphql';
import WatchedTvForm from '../../common/WatchedTvForm';
import { container } from '../../common/helpers/general';

export type EditingWatched =
  | null
  | {
      isEditing: false;
      autoTracked?: { id: string; createdAt: number; tvItemId?: string };
    }
  | { isEditing: true; item: WatchesQuery['watches']['watched'][0] };

export type TvData = {
  id: string;
  title: string;
  poster: string;
  seasons?: TvQuery['tv']['seasons'];
};

export default function WatchedTvDialog({
  tv,
  editingWatched,
  onClose,
}: {
  tv: TvData;
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
      title={`Seen ${tv.title}`}
      canOutsideClickClose={false}
      onClose={onClose}
      isOpen={!!editingWatched}
      lazy
      portalContainer={container}
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
            : editingWatched?.autoTracked
            ? {
                createdAt: editingWatched.autoTracked.createdAt,
                tvItemId: editingWatched.autoTracked.tvItemId,
                review: '',
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
              autoTrackedId:
                editingWatched && 'autoTracked' in editingWatched
                  ? editingWatched.autoTracked?.id
                  : undefined,
            },
          });

          await query;
          onClose();
        }}
      />
    </Dialog>
  );
}
