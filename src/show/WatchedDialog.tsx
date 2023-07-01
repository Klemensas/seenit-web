import React from 'react';
import { Dialog } from '@blueprintjs/core';

import { EditingWatched } from '../common/WatchedForm';
import WatchedMutationForm from '../common/WatchedMutationForm';
import { TvQuery, MovieQuery, ItemDataFragment } from '../graphql';
import { getAppContainer } from '../common/helpers/general';

export default function WatchedDialog({
  editingWatched,
  item,
  onClose,
}: {
  editingWatched: EditingWatched;
  item: TvQuery['tv'] | MovieQuery['movie'] | ItemDataFragment;
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
      portalContainer={getAppContainer()}
      lazy
    >
      <WatchedMutationForm
        editingWatched={editingWatched}
        item={item}
        afterSave={onClose}
      />
    </Dialog>
  );
}
