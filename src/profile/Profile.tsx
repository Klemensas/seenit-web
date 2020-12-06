import React, { MouseEvent, useState } from 'react';
import { ObservableQueryFields } from '@apollo/client';
import { useParams, useHistory } from 'react-router-dom';
import { Spring } from 'react-spring/renderprops';
import { Card, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { formatDistanceStrict } from 'date-fns';

import {
  useUserQuery,
  ItemType,
  Movie,
  Tv,
  UserQueryVariables,
  UserQuery,
} from '../graphql';
import Rating from '../common/Rating';
import InfiniteScroll from '../common/InfiniteScroll';
import { formatTvString } from '../common/helpers/watched';

const loadMore = (
  fetchMore: ObservableQueryFields<UserQuery, UserQueryVariables>['fetchMore'],
  variables: UserQueryVariables,
) => () => {
  return fetchMore({
    variables,
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult?.user) return prev;

      const prevWatched = prev.user.watched.watched || [];
      const newWatched = fetchMoreResult.user.watched.watched || [];

      return {
        user: {
          ...fetchMoreResult.user,
          watched: {
            ...fetchMoreResult.user.watched,
            watched: [...prevWatched, ...newWatched],
          },
        },
      };
    },
  });
};

export default function Profile() {
  const [selected, setSelected] = useState<any>({
    style: undefined,
    targetIndex: -1,
  });

  const { name } = useParams<{ name: string }>();
  const history = useHistory();
  const { loading, data, fetchMore } = useUserQuery({
    variables: { name },
    notifyOnNetworkStatusChange: true,
  });

  if (!data?.user?.watched) return null;

  const {
    watched: { hasMore, cursor, watched },
  } = data.user;
  const targetItem = watched[selected.targetIndex] || null;

  return (
    <InfiniteScroll
      loading={loading}
      hasMore={hasMore}
      loadMore={loadMore(fetchMore, { name, cursor })}
    >
      <div className="grid grid-card">
        {watched.map(
          (
            { id, item, itemType, rating, review, tvItem, createdAt },
            index,
          ) => {
            if (!item) return null;

            let name: string;
            if (itemType === ItemType.Movie) {
              name = (item as Movie).title;
            } else {
              name = (item as Tv).name;
            }

            return (
              <Card
                key={id}
                className="card-watched"
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                  const position = e.currentTarget.getBoundingClientRect();
                  setSelected({
                    style: {
                      left: position.left,
                      top: position.top,
                      width: position.width,
                      height: position.height,
                      position: 'fixed',
                    },
                    targetIndex: index,
                  });
                }}
              >
                <div>
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
                  <div className="card-watched-footer">
                    {rating && <Rating value={rating.value} />}
                    {review && review.body && (
                      <Icon icon={IconNames.COMMENT} color="gold" />
                    )}
                  </div>
                  <div className="p-3 text-left title">
                    <div className="flex flex-content-between flex-items-center">
                      <strong className="bp3-text-large bp3-text-overflow-ellipsis pr-2">
                        {name}
                      </strong>
                      <div>{formatTvString(tvItem)}</div>
                    </div>
                    <p className="bp3-text-small card-watched-muted">
                      {formatDistanceStrict(createdAt, Date.now(), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </Card>
            );
          },
        )}
        {targetItem && (
          <Spring
            config={{ velocity: 120, friction: 16, clamp: true }}
            // config={{ duration: 500, easing: '' }}
            from={selected.style}
            to={{
              left: 0,
              top: 50,
              width: window.innerWidth,
              height: window.innerHeight,
            }}
            onRest={() =>
              history.push(
                `/movie/${targetItem.item.id}/watched/${targetItem.id}`,
              )
            }
          >
            {props => (
              <div style={props}>
                <img
                  width="300"
                  height="200"
                  className="img-responsive"
                  src={`https://image.tmdb.org/t/p/w1280${targetItem.item.poster_path}`}
                  style={{
                    position: 'relative',
                    maxHeight: 300,
                    objectFit: 'cover',
                  }}
                  alt=""
                />
                <div style={{ height: '100%', backgroundColor: '#0C1821' }} />
              </div>
            )}
          </Spring>
        )}
      </div>
    </InfiniteScroll>
  );
}
