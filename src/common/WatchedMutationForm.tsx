import React from 'react';

import {
  useAddWatchedMutation,
  useEditWatchedMutation,
  TvItemType,
  TvQuery,
  MovieQuery,
  ItemType,
} from '../graphql';
import WatchedForm, { EditingWatched } from '../common/WatchedForm';

export type Props = {
  editingWatched: EditingWatched;
  afterSave: () => void;
  item: TvQuery['tv'] | MovieQuery['movie'];
};

export default function WatchedMutationForm({
  editingWatched,
  afterSave,
  item,
}: Props) {
  const [addWatched, { loading: addWatchedLoading }] = useAddWatchedMutation();
  const [editWatched, { loading: editWatchedLoading }] = useEditWatchedMutation(
    {
      update: cache => {
        // GC potentially removed content like ratings.
        // TODO: investigate more how apollo gc is triggered to potentially handle this automatically
        cache.gc();
      },
    },
  );
  const isLoading = addWatchedLoading || editWatchedLoading;

  return (
    <WatchedForm
      editingWatched={editingWatched}
      item={item}
      isLoading={isLoading}
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
            // Assuming this can only be accessed from the dashboard so initiating the auto tracked item list refetch
            refetchQueries:
              'autoTracked' in editingWatched ? ['AutoTrackedList'] : undefined,
          });
        }

        query = addWatched({
          variables: {
            createdAt,
            itemId: item.id,
            itemType: 'name' in item ? ItemType.Tv : ItemType.Movie,
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
        afterSave();
      }}
    />
  );
}
