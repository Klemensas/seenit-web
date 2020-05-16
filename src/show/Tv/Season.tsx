import React, { useState } from 'react';
import { Card, H3, Divider, Collapse, Button, Text } from '@blueprintjs/core';
import { format } from 'date-fns';

import { TvQuery } from '../../graphql';
import { Link } from 'react-router-dom';

type SeasonType = TvQuery['tv']['seasons'][0];

type SeasonProps = {
  season: SeasonType;
  tvId: string;
  expanded?: boolean;
};

export default function Season({ season, expanded = false }: SeasonProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(expanded);

  return (
    <Card key={season.id} className="mb-2">
      <div className="flex">
        <img
          className="img-responsive"
          style={{ maxWidth: 100, objectFit: 'contain' }}
          width="300"
          height="200"
          src={`https://image.tmdb.org/t/p/w780${season.poster_path}`}
          alt={`Season ${season.id} poster`}
        />
        <div className="w-100 pl-3">
          <div className="mb-3 flex flex-content-between flex-items-center">
            <H3 className="mb-0">{season.name}</H3>
            <div>{format(+season.air_date, 'yyyy')}</div>
          </div>
          <p>{season.overview}</p>
        </div>
      </div>
      <Divider className="my-3" />
      <Collapse isOpen={isExpanded}>
        <H3>Episodes</H3>
        <div>
          {season.episodes.map((episode, i) => (
            <div key={episode.id} className="flex mb-3">
              <div className="pr-3 text-center" style={{ width: '32px' }}>
                <Text ellipsize>{episode.episode_number}</Text>
              </div>
              <div className="w-100">
                <div className="pb-2 flex flex-content-between">
                  <div>
                    <strong>{episode.name}</strong>
                  </div>
                  <div className="pl-3">
                    {episode.air_date && (
                      <Text ellipsize>
                        {format(+episode.air_date, 'do MMM yyyy')}
                      </Text>
                    )}
                  </div>
                </div>
                <div>
                  <p>{episode.overview}</p>
                  <Link
                    to={({ pathname }) =>
                      `${pathname.replace(/\/$/, '')}/episode/${episode.id}`
                    }
                  >
                    <Button>View reviews</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Collapse>
      <Button
        fill
        minimal
        icon={isExpanded ? 'collapse-all' : 'expand-all'}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Collapse' : 'Expand'}
      </Button>
    </Card>
  );
}
