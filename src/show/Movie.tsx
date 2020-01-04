import React from 'react';
import { useParams, Switch, Route, RouteComponentProps, Link } from 'react-router-dom';
import { format, formatDistanceStrict } from 'date-fns';
import { ObservableQueryFields } from 'react-apollo';

import { useMovieQuery, MovieQuery, MovieQueryVariables } from '../graphql';
import Rating from '../common/Rating';
import Review from './Review';
import { Button } from '@blueprintjs/core';

const loadMore = (fetchMore: ObservableQueryFields<MovieQuery, MovieQueryVariables>['fetchMore'], variables: MovieQueryVariables) => () => {
  return fetchMore({
    variables,
    updateQuery: ((prev, { fetchMoreResult }) => {
      if (!fetchMoreResult?.movie) return prev;

      const prevWatched = prev.movie?.watched?.watched || []
      const newWatched = fetchMoreResult.movie.watched?.watched || []

      return {
        movie: {
          ...fetchMoreResult.movie,
          watched: {
            hasMore: false,
            ...fetchMoreResult.movie.watched,
            watched: [...prevWatched, ...newWatched]
          }
        }
      }
    })
  })
}

export default function Movie({ match }: RouteComponentProps) {
  const { id } = useParams()
  const { loading, data, fetchMore } = useMovieQuery({
    variables: {
      id
    },
    returnPartialData: true,
  });

  if (!data?.movie) return null;

  const { title, overview, backdrop_path, vote_count, vote_average, release_date, watched } = data.movie;
  const { cursor } = watched || {}
  const rating = vote_count > 100 ? vote_average : null

  return (
    <>
      <div style={{ position: 'relative' }}>
        <img width="300" height="200" className="img-responsive" src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`} style={{ position: 'relative', maxHeight: '300px', objectFit: 'cover' }} alt="" />
      </div>
      <div className="p-3">
        <h1 className="bp3-heading bp3-dark">{ title }</h1>
        {rating && <Rating value={rating / 2} />}
        {release_date && <p>{format(new Date(release_date), 'yyyy QQQ') }</p>}
        <p>{ overview }</p>

        <Switch>
          <Route path={`${match.path}/watched/:watchedId`}><Review /></Route>
        </Switch>

        <div>
          <h2 className="bp3-heading bp3-dark">Recent reviews</h2>
          <div>
            {(watched?.watched || []).map(({ id, createdAt, review, user }) => (
              <div key={id}>
                <Link to={`/profile/${user.name}`}><span>{user.name}</span></Link>&nbsp;
                <span className="bp3-text-muted">{formatDistanceStrict(createdAt, Date.now(), { addSuffix: true })}</span>
                <p>{review?.body}</p>
              </div>
            ))}
            {!watched?.hasMore && <Button text="Show more" onClick={loadMore(fetchMore, { id, cursor })} />}
          </div>
        </div>
      </div>
    </>

    )
}