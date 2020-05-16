import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, H3, Button, H2 } from '@blueprintjs/core';
import { format } from 'date-fns';

import { TvQuery } from '../../graphql';
import Rating from '../../common/Rating';
import ReviewList from '../ReviewList';

export default forwardRef(
  (
    {
      episode: {
        id,
        episode_number,
        name,
        air_date,
        overview,
        vote_average,
        vote_count,
      },
      tvId,
    }: {
      episode: TvQuery['tv']['seasons'][0]['episodes'][0];
      tvId: string;
    },
    ref,
  ) => {
    const rating = vote_count > 1 ? vote_average : null;
    return (
      <div ref={ref as any}>
        <Link to="../">
          <Button fill large icon="chevron-left">
            Back to overview
          </Button>
        </Link>
        <Card>
          <div className="flex flex-content-between mb-3">
            <div>
              <H3 className="mb-0">
                {episode_number} {name}
              </H3>
              {rating && <Rating value={rating} />}
            </div>
            {air_date && <div>{format(+air_date, 'do MMM yyyy')}</div>}
          </div>
          <p>{overview}</p>
        </Card>
        <div>
          <H2>Latest reviews</H2>
          <ReviewList itemId={tvId} tvItemId={id} />
        </div>
      </div>
    );
  },
);
