import React from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';

import { useWatchedQuery } from '../graphql';
import Review from './Review';

export default function ReviewItem() {
  const { watchedId } = useParams();
  const { loading, data } = useWatchedQuery({
    variables: {
      id: watchedId || '',
    },
  });

  return (
    <>
      <h2 className="bp3-heading bp3-dark">Review</h2>
      {loading || !data?.watched ? (
        <Spinner />
      ) : (
        <Review
          {...{
            user: data.watched.user,
            review: data.watched.review?.body || '',
            rating: data.watched.rating?.value,
            createdAt: data.watched.createdAt,
          }}
        />
      )}
    </>
  );
}
