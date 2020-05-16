import React from 'react';
import { H2 } from '@blueprintjs/core';

import { TvQuery } from '../../graphql';
import Season from './Season';
import ReviewList from '../ReviewList';
import UserWatchedList from '../UserWatchedList';

export default function TvOverview({
  tv,
  itemId,
  userId,
  onEditWatched,
}: {
  tv: TvQuery['tv'];
  itemId: string;
  userId?: string;
  onEditWatched: (watched: any) => void;
}) {
  return (
    <>
      {userId && (
        <div>
          <H2>Your latest tracked</H2>

          <UserWatchedList
            itemId={itemId}
            userId={userId}
            onEdit={onEditWatched}
          />
        </div>
      )}
      <div>
        <H2>Seasons</H2>
        {tv.seasons.map(season => (
          <Season key={season.id} season={season} tvId={itemId} />
        ))}
      </div>
      <div>
        <H2>Latest reviews</H2>
        <ReviewList itemId={itemId} />
      </div>
    </>
  );
}
