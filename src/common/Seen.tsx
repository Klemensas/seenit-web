import React from 'react';
import { Card } from '@blueprintjs/core';
import { ItemType, Movie, Tv, Season, Episode } from '../graphql';
import { Link } from 'react-router-dom';
import { formatTvString } from './helpers/watched';
import { RelativeDate } from './RelativeDate';

type ItemData =
  | Pick<Movie, 'id' | 'title' | 'poster_path'>
  | Pick<Tv, 'id' | 'name' | 'poster_path'>;

type SeasonData = Pick<Season, 'id' | 'season_number'>;
type TvItemData =
  | SeasonData
  | (Pick<Episode, 'id' | 'episode_number'> & { season: SeasonData });

export default function Seen({
  type,
  item,
  date,
  tvItem,
}: {
  type: ItemType;
  item: ItemData;
  tvItem?: TvItemData;
  date?: number | Date;
}) {
  const name = 'title' in item ? item.title : item.name;
  const route = type === ItemType.Movie ? 'movie' : 'tv';

  return (
    <Link to={`/${route}/${item.id}`}>
      <Card className="card-watched">
        <div style={{ position: 'relative' }}>
          <img
            width="300"
            height="200"
            className="img-responsive"
            src={`https://image.tmdb.org/t/p/w1280${item.poster_path}`}
            style={{ position: 'relative' }}
            alt=""
          />
        </div>
        <div className="p-3 text-left title">
          <div className="flex flex-content-between flex-items-center">
            <strong className="bp3-text-large bp3-text-overflow-ellipsis pr-2">
              {name}
            </strong>
            <div>{formatTvString(tvItem)}</div>
          </div>
          {date && (
            <p className="bp3-text-small card-watched-muted">
              <RelativeDate date={date} />
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
