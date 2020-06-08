import React from 'react';
import { Dialog } from '@blueprintjs/core';

import { EditingWatched } from '../common/WatchedForm';
import WatchedMutationForm from '../common/WatchedMutationForm';
import { TvQuery, MovieQuery } from '../graphql';

export default function WatchedDialog({
  editingWatched,
  item,
  onClose,
}: {
  editingWatched: EditingWatched;
  item: TvQuery['tv'] | MovieQuery['movie'];
  onClose: () => void;
}) {
  const name = 'name' in item ? item.name : item.title;

  return (
    <Dialog
      className="fluid-dialog"
      title={`Seen ${name}`}
      canOutsideClickClose={false}
      onClose={onClose}
      isOpen={!!editingWatched}
      lazy
    >
      <WatchedMutationForm
        editingWatched={editingWatched}
        item={item}
        afterSubmit={onClose}
      />
      />
    </Dialog>
  );
}
