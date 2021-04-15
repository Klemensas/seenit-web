import React, { ComponentProps } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { DialogQueryParams } from './common/dialog/query-params';
import { useAutoTrackedQuery, useWatchedQuery } from './graphql';

import AutoTrackedDialog from './show/AutoTrackedDialog';
import WatchedDialog from './show/WatchedDialog';

// This should be broken up into smaller pieces, maybe a HOC for onClose handlers
// Need to add support for totally new entries, that requires the ability to separately identify the item whether it's a movie/tv and query it
const AutoTrackedDialogWithQueryParams = (
  props: Omit<ComponentProps<typeof AutoTrackedDialog>, 'onClose'>,
) => {
  const history = useHistory();
  return (
    <AutoTrackedDialog
      {...props}
      onClose={() => {
        const searchParams = new URLSearchParams(history.location.search);
        searchParams.delete(DialogQueryParams.EditingAutoTracked);

        history.replace(`${history.location.pathname}?${searchParams}`);
      }}
    />
  );
};

const WatchedDialogWithQueryParams = (
  props: Omit<ComponentProps<typeof WatchedDialog>, 'onClose'>,
) => {
  const history = useHistory();
  return (
    <WatchedDialog
      {...props}
      onClose={() => {
        const searchParams = new URLSearchParams(history.location.search);
        searchParams.delete(DialogQueryParams.EditingWatched);

        history.replace(`${history.location.pathname}?${searchParams}`);
      }}
    />
  );
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function DialogRoutes() {
  let query = useQuery();
  const editingAutoTracked = query.get(DialogQueryParams.EditingAutoTracked);
  const editingWatched = query.get(DialogQueryParams.EditingWatched);

  const { data: autoTrackedData } = useAutoTrackedQuery({
    variables: {
      id: editingAutoTracked || '',
    },
    skip: !editingAutoTracked,
  });
  const { data: watchedData } = useWatchedQuery({
    variables: {
      id: editingWatched || '',
    },
    skip: !editingWatched,
  });

  if (editingAutoTracked && autoTrackedData) {
    const { autoTracked } = autoTrackedData;

    return (
      <AutoTrackedDialogWithQueryParams
        item={autoTracked.item}
        editingWatched={{
          isEditing: false,
          autoTracked: {
            id: autoTracked.id,
            createdAt: autoTracked.createdAt,
            meta: autoTracked.meta,
            tvItemId: autoTracked.tvItem?.id,
          },
        }}
      />
    );
  }

  console.log('lololol', editingWatched, watchedData);
  if (editingWatched && watchedData) {
    const { watched } = watchedData;

    return (
      <WatchedDialogWithQueryParams
        editingWatched={{
          isEditing: true,
          item: watched,
        }}
        item={watched.item}
      />
    );
  }

  return null;
}
