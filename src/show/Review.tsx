import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import { formatDistanceStrict } from 'date-fns';

import { useWatchedQuery, Watched, User } from '../graphql';
import Rating from '../common/Rating';

export default function Review({
  review,
  user,
  rating,
  createdAt,
}: {
  review: string;
  user: Pick<User, 'id' | 'name'>;
  rating?: number;
  createdAt: Date | number;
}) {
  return (
    <div>
      <Link to={`/profile/${user.name}`}>{user.name}</Link>
      &nbsp;
      <span className="bp3-text-muted">
        {formatDistanceStrict(createdAt, Date.now(), { addSuffix: true })}
      </span>
      {rating && <Rating className="ml-2" value={rating} />}
      <p>{review}</p>
    </div>
  );
}
