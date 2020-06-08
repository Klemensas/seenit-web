import React, { useState } from 'react';
import { useParams, RouteComponentProps } from 'react-router-dom';
import { format } from 'date-fns';
import { Button, Intent, H1, H2 } from '@blueprintjs/core';

import { useMovieQuery, useAuthQuery } from '../../graphql';
import Rating from '../../common/Rating';
import { EditingWatched } from '../../common/WatchedForm';
import ReviewList from '../ReviewList';
import UserWatchedList from '../UserWatchedList';
import WatchedDialog from '../WatchedDialog';

type MovieRouteParams = {
  id: string;
};

export default function Movie({
  match,
}: RouteComponentProps<MovieRouteParams>) {
  const [editingWatched, setEditingWatched] = useState<EditingWatched>(null);

  const { id } = useParams<MovieRouteParams>();

  const { data: localUser } = useAuthQuery();
  const { data } = useMovieQuery({
    variables: {
      id,
    },
    returnPartialData: true,
  });
  if (!data?.movie) return null;

  const {
    title,
    overview,
    poster_path,
    vote_count,
    vote_average,
    release_date,
  } = data.movie;
  const rating = vote_count > 100 ? vote_average : null;

  return (
    <>
      <div style={{ position: 'relative' }}>
        <img
          width="300"
          height="200"
          className="img-responsive"
          src={`https://image.tmdb.org/t/p/w1280${poster_path}`}
          style={{
            position: 'relative',
            maxHeight: '300px',
            objectFit: 'cover',
          }}
          alt=""
        />
      </div>
      <div className="p-3">
        <H1>{title}</H1>
        {rating && <Rating value={rating} />}
        {release_date && <p>{format(new Date(release_date), 'yyyy')}</p>}
        <p>{overview}</p>
        {localUser?.auth && (
          <Button
            intent={Intent.PRIMARY}
            large
            onClick={() => setEditingWatched({ isEditing: false })}
          >
            Seen it
          </Button>
        )}

        {localUser?.auth?.id && (
          <div>
            <H2>Your latest tracked</H2>
            <UserWatchedList
              itemId={id}
              userId={localUser.auth.id}
              onEdit={item => setEditingWatched({ isEditing: true, item })}
            />
          </div>
        )}

        <div>
          <H2>Latest reviews</H2>
          <ReviewList itemId={id} />
        </div>

        <WatchedDialog
          item={data.movie}
          editingWatched={editingWatched}
          onClose={() => setEditingWatched(null)}
        />
      </div>
    </>
  );
}
