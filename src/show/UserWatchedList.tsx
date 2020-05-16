import React from 'react';
import { Spinner, NonIdealState, Button } from '@blueprintjs/core';
import { useWatchesQuery, WatchesQuery } from '../graphql';
import Watched from './Watched';
import { loadMore } from '../common/helpers/graphql';
import { mergeWatches } from '../graphql/fetchMore';

export default function UserWatchedList({
  itemId,
  userId,
  onEdit,
}: {
  itemId: string;
  userId: string;
  onEdit: (watched: WatchesQuery['watches']['watched'][0]) => void;
}) {
  const watchesVariables = {
    userId,
    itemId,
  };

  const { data: userWatched, loading, fetchMore } = useWatchesQuery({
    variables: watchesVariables,
    skip: !userId,
  });

  if (loading) return <Spinner />;

  // TODO: most likely error, handle it
  if (!userWatched?.watches) return null;

  const { watched, hasMore, cursor } = userWatched.watches;

  if (!watched.length) {
    return (
      <NonIdealState
        icon="film"
        title="Not yet seen"
        description="Have you seen it? Watch it or track it!"
        // action={<Button text="Seen it" />}
      />
    );
  }

  return (
    <>
      {watched.map(watched => (
        <Watched
          key={watched.id}
          watched={watched}
          onClickEdit={watched => onEdit(watched)}
        />
      ))}
      {hasMore && (
        <Button
          text="Show more"
          onClick={loadMore(
            fetchMore,
            {
              ...watchesVariables,
              cursor,
            },
            mergeWatches,
          )}
        />
      )}
    </>
  );
}
