import React, { useState } from 'react';
import {
  useParams,
  Switch,
  Route,
  RouteComponentProps,
} from 'react-router-dom';
import { format, formatDistanceStrict } from 'date-fns';
import {
  useMovieQuery,
  useWatchesQuery,
  useAuthQuery,
  WatchesQuery,
  useAddWatchedMutation,
  WatchesDocument,
  useRemoveWatchedMutation,
} from '../graphql';
import Rating from '../common/Rating';
import {
  Button,
  Intent,
  Dialog,
  Card,
  Elevation,
  ButtonGroup,
} from '@blueprintjs/core';
import ReviewItem from './ReviewItem';
import Review from './Review';
import { loadMore } from '../common/helpers/graphql';
import SeenMovieForm from '../common/SeenMovieForm';
import BlockingAlert from '../common/BlockingAlert';

const mergeWatches = (prev: WatchesQuery, next?: WatchesQuery): WatchesQuery =>
  next
    ? {
        watches: {
          ...next.watches,
          watched: [...prev.watches.watched, ...next.watches.watched],
        },
      }
    : prev;

type Params = {
  id: string;
};

export default function Movie({ match }: RouteComponentProps<Params>) {
  const { id } = useParams<Params>();
  const [showSeenForm, setShowSeenForm] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState<{
    target: string | null;
    isLoading: boolean;
  }>({
    target: null,
    isLoading: false,
  });
  const { data: localUser } = useAuthQuery();
  const { data } = useMovieQuery({
    variables: {
      id,
    },
    returnPartialData: true,
  });
  const watchesVariables = {
    userId: localUser?.auth?.id,
    itemId: id,
  };
  const userWatched = useWatchesQuery({
    variables: watchesVariables,
    skip: !localUser?.auth?.id,
    returnPartialData: true,
  });
  const [addWatched] = useAddWatchedMutation({
    update: (cache, { data: newWatched }) => {
      const { watches } =
        cache.readQuery<WatchesQuery>({
          query: WatchesDocument,
          variables: watchesVariables,
        }) || {};

      if (!watches || !newWatched || !localUser?.auth) return;

      const watchedItem = {
        ...newWatched.addWatched,
        user: localUser?.auth,
      };

      cache.writeQuery<WatchesQuery>({
        query: WatchesDocument,
        variables: watchesVariables,
        data: {
          watches: {
            ...watches,
            watched: [watchedItem, ...watches.watched],
          },
          // watched:
          // ...watches,
        },
      });
    },
  });
  const [
    removeWatched,
    { loading: loadingRemoveWatched },
  ] = useRemoveWatchedMutation({
    update: (cache, { data: removedWatched }) => {
      const removedId = removedWatched?.removeWatched;
      const dataId = cache.identify({
        id: removedId,
        __typename: 'Watched',
      });

      if (!removedId || !dataId) return;

      cache.evict(dataId);
      cache.gc();
    },
  });

  if (!data?.movie) return null;

  const {
    title,
    overview,
    backdrop_path,
    vote_count,
    vote_average,
    release_date,
    watched,
  } = data.movie;
  // const { cursor } = watched || {};
  const rating = vote_count > 100 ? vote_average : null;

  return (
    <>
      <div style={{ position: 'relative' }}>
        <img
          width="300"
          height="200"
          className="img-responsive"
          src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
          style={{
            position: 'relative',
            maxHeight: '300px',
            objectFit: 'cover',
          }}
          alt=""
        />
      </div>
      <div className="p-3">
        <h1 className="bp3-heading">{title}</h1>
        {rating && <Rating value={rating} />}
        {release_date && <p>{format(new Date(release_date), 'yyyy')}</p>}
        <p>{overview}</p>
        <Button
          intent={Intent.PRIMARY}
          large
          onClick={() => setShowSeenForm(true)}
        >
          Seen it
        </Button>
        <Dialog
          className="fluid-dialog"
          title={`Seen ${data.movie.title}`}
          canOutsideClickClose={false}
          onClose={() => setShowSeenForm(false)}
          isOpen={showSeenForm}
          lazy={true}
        >
          <SeenMovieForm
            item={data.movie}
            isLoading={false}
            onSubmit={addWatched}
          />
        </Dialog>
        <Switch>
          <Route path={`${match.path}/watched/:watchedId`}>
            <ReviewItem />
          </Route>
        </Switch>
        <div>
          <h2 className="bp3-heading">Your last viewings</h2>
          {userWatched?.data?.watches &&
            userWatched.data.watches.watched.map(
              ({ id, createdAt, review, rating }) => (
                <Card key={id} elevation={Elevation.ONE} className="mb-2">
                  <div className="flex flex-content-between flex-items-center">
                    <div>
                      <span>Seen </span>
                      <span className="bp3-text-muted mr-2">
                        {formatDistanceStrict(createdAt, Date.now(), {
                          addSuffix: true,
                        })}
                      </span>
                      {rating && <Rating value={rating.value} />}
                      {!rating && (
                        <Button icon="star" small>
                          Rate
                        </Button>
                      )}
                    </div>
                    <div>
                      <ButtonGroup>
                        <Button icon="edit" small>
                          Edit
                        </Button>

                        <Button
                          icon="trash"
                          small
                          loading={loadingRemoveWatched}
                          intent={Intent.DANGER}
                          onClick={() =>
                            setDeleteAlert({ target: id, isLoading: false })
                          }
                        >
                          Remove
                        </Button>
                        <BlockingAlert
                          cancelButtonText="Cancel"
                          confirmButtonText="Remove"
                          icon="trash"
                          intent={Intent.DANGER}
                          isOpen={!!deleteAlert.target}
                          isLoading={!!deleteAlert.isLoading}
                          onCancel={() =>
                            setDeleteAlert({ target: null, isLoading: false })
                          }
                          onConfirm={async () => {
                            if (!deleteAlert.target) return;

                            setDeleteAlert({ ...deleteAlert, isLoading: true });
                            await removeWatched({
                              variables: { itemId: deleteAlert.target },
                            });
                            setDeleteAlert({ target: null, isLoading: false });
                          }}
                        >
                          <p>
                            Are you sure you want to remove this watched entry?
                            <br />
                            <br />
                            <i>
                              This will also remove the associated rating and
                              review if any. Removing cannot be undone.
                            </i>
                          </p>
                        </BlockingAlert>
                      </ButtonGroup>
                    </div>
                  </div>
                  {review && <p>{review.body}</p>}
                  {!review && <p className="bp3-text-muted">No review yet</p>}
                </Card>
              ),
            )}
          {userWatched?.data?.watches?.hasMore && (
            <Button
              text="Show more"
              onClick={loadMore(
                userWatched.fetchMore,
                {
                  ...watchesVariables,
                  cursor: userWatched.data.watches.cursor,
                },
                mergeWatches,
              )}
            />
          )}
        </div>

        <div>
          <h2 className="bp3-heading">Reviews</h2>
          <div>
            {(watched?.watched || []).map(
              ({ id, createdAt, review, rating, user }) => (
                <Review
                  key={id}
                  {...{
                    createdAt,
                    user,
                    review: review?.body || '',
                    rating: rating?.value,
                  }}
                />
              ),
            )}
            {watched?.hasMore && (
              <Button
                text="Show more"
                // onClick={loadMore(fetchMore, { id, cursor })}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
