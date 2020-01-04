import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import { formatDistanceStrict } from 'date-fns';

import { useWatchedQuery } from '../graphql';

export default function Review() {
  const { watchedId } = useParams()
  const { loading, data } = useWatchedQuery({
    variables: {
      id: watchedId || '',
    },
  }) as any
  return (
    <>
      <h2 className="bp3-heading bp3-dark">Review</h2>
      {loading || !data ? <Spinner /> : (
        <>
          <div>
            <Link to={`/profile/${data.watched.user?.name}`}><span>{data.watched.user?.name}</span></Link>&nbsp;
            <span className="bp3-text-muted">{formatDistanceStrict(data.watched.createdAt, Date.now(), { addSuffix: true })}</span>
          </div>
          <p>{data.watched.review?.body}</p>
        </>
      )}
    </>
  )
}