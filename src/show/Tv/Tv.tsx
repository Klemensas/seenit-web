import React, { useState } from 'react';
import {
  useParams,
  Switch,
  Route,
  RouteComponentProps,
} from 'react-router-dom';
import { Intent, Button, H1 } from '@blueprintjs/core';
import { format } from 'date-fns';

import { useTvQuery, useAuthQuery } from '../../graphql';
import Rating from '../../common/Rating';
import { getSeasonEpisode } from '../../common/helpers/watched';
import EpisodeDetails from './EpisodeDetails';
import TvOverview from './TvOverview';
import WatchedTvDialog, { EditingWatched } from './WatchedTvDialog';

type TvRouteParams = {
  id: string;
};

export default function Tv({ match }: RouteComponentProps<TvRouteParams>) {
  const [editingWatched, setEditingWatched] = useState<EditingWatched>(null);

  const { id } = useParams<TvRouteParams>();

  const { data: localUser } = useAuthQuery();
  const { data } = useTvQuery({
    variables: {
      id,
    },
  });

  if (!data?.tv) return null;

  const {
    name,
    overview,
    first_air_date,
    vote_count,
    vote_average,
    poster_path,
    seasons,
  } = data.tv;
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
        <H1>{name}</H1>
        {rating && <Rating value={rating} />}
        {first_air_date && <p>{format(new Date(first_air_date), 'yyyy')}</p>}
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
        <Switch>
          <Route
            path={`${match.path}/episode/:episodeId`}
            render={({ match }) => {
              const episode = getSeasonEpisode(seasons, match.params.episodeId);

              if (!episode) return null;

              return episode && <EpisodeDetails tvId={id} episode={episode} />;
            }}
          />
          <Route
            path={`${match.path}`}
            render={({ match }) => {
              return (
                <TvOverview
                  tv={data.tv}
                  userId={localUser?.auth?.id}
                  itemId={id}
                  onEditWatched={item =>
                    setEditingWatched({ isEditing: true, item })
                  }
                />
              );
            }}
          />
        </Switch>
        <WatchedTvDialog
          tv={{
            id: data.tv.id,
            title: name,
            poster: data.tv.poster_path || '',
            seasons,
          }}
          editingWatched={editingWatched}
          onClose={() => setEditingWatched(null)}
        />
      </div>
    </>
  );
}
