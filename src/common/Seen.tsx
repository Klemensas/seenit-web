import React from 'react';
import { Card } from '@blueprintjs/core';
import { formatDistanceStrict } from 'date-fns';
import { UserQuery } from '../graphql';

export default function Seen({
  item,
  date,
}: {
  item: UserQuery['user']['watched']['watched'][0]['item'];
  date?: number | Date;
}) {
  const name = 'title' in item ? item.title : item.name;

  return (
    <Card className="card-watched">
      <div style={{ position: 'relative' }}>
        <img
          width="300"
          height="200"
          className="img-responsive"
          src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
          style={{ position: 'relative' }}
          alt=""
        />
      </div>
      <div className="p-3 text-left title">
        <div className="flex flex-content-between flex-items-center">
          <strong className="bp3-text-large bp3-text-overflow-ellipsis pr-2">
            {name}
          </strong>
        </div>
        {date && (
          <p className="bp3-text-small card-watched-muted">
            {formatDistanceStrict(date, Date.now(), { addSuffix: true })}
          </p>
        )}
      </div>
    </Card>
  );
}
