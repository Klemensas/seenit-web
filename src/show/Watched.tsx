import React, { useState } from 'react';
import {
  Card,
  Elevation,
  ButtonGroup,
  Button,
  Intent,
} from '@blueprintjs/core';
import { formatDistanceStrict } from 'date-fns';

import { WatchesQuery, useRemoveWatchedMutation } from '../graphql';
import Rating from '../common/Rating';
import { formatTvString } from '../common/helpers/watched';
import BlockingAlert from '../common/BlockingAlert';

export default function Watched({
  watched,
  onClickEdit,
  className,
}: {
  watched: WatchesQuery['watches']['watched'][0];
  onClickEdit: (watched: WatchesQuery['watches']['watched'][0]) => void;
  className?: string;
}) {
  const { id, createdAt, rating, review, tvItem } = watched;
  const [deleteAlert, setDeleteAlert] = useState<{
    dialogOpen: boolean;
    isLoading: boolean;
  }>({
    dialogOpen: false,
    isLoading: false,
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

  return (
    <Card elevation={Elevation.ONE} className={className}>
      <div className="flex flex-content-between flex-items-center mb-2">
        <div>
          <span>Seen </span>
          {tvItem && <span>{formatTvString(tvItem)} </span>}
          <span className="bp3-text-muted mr-2">
            {formatDistanceStrict(createdAt, Date.now(), {
              addSuffix: true,
            })}
          </span>
          {rating && <Rating value={rating.value} />}
        </div>
        <ButtonGroup>
          <Button icon="edit" small onClick={() => onClickEdit(watched)}>
            Edit
          </Button>

          <Button
            small
            icon="trash"
            intent={Intent.DANGER}
            loading={loadingRemoveWatched}
            onClick={() =>
              setDeleteAlert({ dialogOpen: true, isLoading: false })
            }
          >
            Remove
          </Button>
          <BlockingAlert
            cancelButtonText="Cancel"
            confirmButtonText="Remove"
            icon="trash"
            intent={Intent.DANGER}
            isOpen={deleteAlert.dialogOpen}
            isLoading={deleteAlert.isLoading}
            onCancel={() =>
              setDeleteAlert({ dialogOpen: false, isLoading: false })
            }
            onConfirm={async () => {
              if (!deleteAlert.dialogOpen) return;

              setDeleteAlert({ ...deleteAlert, isLoading: true });
              await removeWatched({
                variables: { itemId: id },
              });
            }}
          >
            <p>
              Are you sure you want to remove this watched entry?
              <br />
              <br />
              <i>
                This will also remove the associated rating and review if any.
                Removing cannot be undone.
              </i>
            </p>
          </BlockingAlert>
        </ButtonGroup>
      </div>
      {review && <p>{review.body}</p>}
      {!review && <p className="bp3-text-muted">No review</p>}
    </Card>
  );
}
