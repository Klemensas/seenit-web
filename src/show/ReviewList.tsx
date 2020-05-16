import React from 'react';
import { Spinner, Button, NonIdealState } from '@blueprintjs/core';

import { useReviewsQuery } from '../graphql';
import { mergeReviews } from '../graphql/fetchMore';
import { loadMore } from '../common/helpers/graphql';
import Review from './Review';

export default function ReviewList({
  itemId,
  tvItemId,
}: {
  itemId: string;
  tvItemId?: string;
}) {
  const reviewsVariables = {
    itemId,
    tvItemId,
  };

  const { data: reviewsData, loading, fetchMore } = useReviewsQuery({
    variables: reviewsVariables,
  });

  if (loading) return <Spinner />;

  // TODO: most likely error, handle it
  if (!reviewsData?.reviews) return null;

  const { reviews, hasMore, cursor } = reviewsData?.reviews;

  if (!reviews.length) {
    return <NonIdealState icon="chat" title="No reviews yet" />;
  }

  return (
    <>
      {reviews.map(({ id, body, watched: { rating, user, createdAt } }) => (
        <Review
          key={id}
          review={body}
          user={user}
          createdAt={createdAt}
          rating={rating?.value}
        />
      ))}
      {hasMore && (
        <Button
          text="Show more"
          onClick={loadMore(
            fetchMore,
            {
              ...reviewsVariables,
              cursor,
            },
            mergeReviews,
          )}
        />
      )}
    </>
  );
}
