import React, { useState } from 'react';
import { H2, Checkbox, Button, Classes, Icon, Intent } from '@blueprintjs/core';

import {
  useUserQuery,
  useAuthQuery,
  useWatchesQuery,
  useAutoTrackedListQuery,
  useConvertAutoTrackedMutation,
  useRemoveAutoTrackedMutation,
  AutoTrackedListQuery,
} from '../graphql';
import Seen from '../common/Seen';
import DeleteConfirmation from '../common/DeleteConfirmation';
import { AutoTrackedItem } from './AutoTrackedItems';
import AutoTrackedDialog from '../show/AutoTrackedDialog';
import { AppToaster } from '../common/toaster';

export default function Dashboard() {
  const { data: localUser } = useAuthQuery();
  const userData = localUser?.auth;
  const { data: watchesData } = useWatchesQuery({
    variables: {
      userId: localUser?.auth?.id,
    },
  });
  const { data: autoTrackedData } = useAutoTrackedListQuery({
    variables: {
      userId: localUser?.auth?.id || '',
    },
  });
  const { data } = useUserQuery({
    variables: { id: userData?.id },
  });
  const [removeAutoTracked, { loading }] = useRemoveAutoTrackedMutation({
    refetchQueries: ['AutoTrackedList'],
  });
  const [convertAutoTracked] = useConvertAutoTrackedMutation({
    refetchQueries: ['AutoTrackedList'],
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingAutoTracked, setEditingAutoTracked] = useState<
    null | AutoTrackedListQuery['autoTrackedList']['autoTracked'][0]
  >(null);
  const [pendingRemoval, setPendingRemoval] = useState<any>();

  if (!userData) return null;
  if (!data?.user?.watched) return null;

  return (
    <>
      <div>
        <div className="p-4 pb-1">
          <H2>Automatically tracked shows</H2>
          <div className="flex flex-items-center">
            <Checkbox
              className="m-0 py-2"
              checked={
                selectedIds.length ===
                autoTrackedData?.autoTrackedList.autoTracked.length
              }
              indeterminate={
                !!selectedIds.length &&
                selectedIds.length <
                  (autoTrackedData?.autoTrackedList.autoTracked.length || 0)
              }
              label={
                selectedIds.length
                  ? `${selectedIds.length} Selected`
                  : 'Select all'
              }
              onChange={() =>
                setSelectedIds(
                  selectedIds.length ===
                    autoTrackedData?.autoTrackedList.autoTracked.length
                    ? []
                    : autoTrackedData?.autoTrackedList.autoTracked.map(
                        ({ id }) => id,
                      ) || [],
                )
              }
            />
            {!!selectedIds.length && (
              <>
                <Button
                  small
                  className="ml-2"
                  icon="tick"
                  onClick={async () => {
                    const ids = selectedIds.filter(id => {
                      const trackedItem = autoTrackedData?.autoTrackedList.autoTracked.find(
                        item => item.id === id,
                      );
                      return trackedItem && trackedItem.item;
                    });
                    const hasItemlessIds = ids.length !== selectedIds.length;

                    await convertAutoTracked({ variables: { ids } });
                    if (hasItemlessIds) {
                      AppToaster.show({
                        message: "Couldn't save items without shows",
                        intent: Intent.WARNING,
                      });
                    }
                    setSelectedIds([]);
                  }}
                >
                  Save
                </Button>
                <Button
                  small
                  className="ml-2"
                  icon="trash"
                  onClick={() =>
                    setPendingRemoval({
                      title: (
                        <p>
                          Are you sure you want to remove the selected items?
                        </p>
                      ),
                      onConfirm: async () => {
                        await removeAutoTracked({
                          variables: { ids: selectedIds },
                        });
                        setPendingRemoval(null);
                      },
                    })
                  }
                >
                  Remove
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-card">
          {autoTrackedData?.autoTrackedList.autoTracked.map(
            ({ id, createdAt, meta, item, tvItem }, i, arr) => (
              <div
                key={id}
                className={Classes.INTENT_PRIMARY}
                style={{
                  position: 'relative',
                }}
              >
                {selectedIds.includes(id) && (
                  <Icon
                    icon="tick-circle"
                    intent={Intent.PRIMARY}
                    iconSize={16}
                    style={{
                      position: 'absolute',
                      left: -8,
                      top: -8,
                      zIndex: 1,
                    }}
                  />
                )}
                <AutoTrackedItem
                  id={id}
                  createdAt={createdAt}
                  meta={meta}
                  item={item}
                  tvItem={tvItem}
                  isSelected={selectedIds.includes(id)}
                  onSelect={() => setSelectedIds([...selectedIds, id])}
                  onDeselect={() =>
                    setSelectedIds(selectedIds.filter(sid => sid !== id))
                  }
                  onSave={() =>
                    convertAutoTracked({ variables: { ids: [id] } })
                  }
                  onEdit={() => setEditingAutoTracked(arr[i])}
                  onRemove={() =>
                    setPendingRemoval({
                      title: (
                        <p>Are you sure you want to remove the tracked item?</p>
                      ),
                      onConfirm: async () => {
                        await removeAutoTracked({ variables: { ids: [id] } });
                        setPendingRemoval(null);
                      },
                    })
                  }
                />
              </div>
            ),
          )}
        </div>
        <div className="p-4 pb-1">
          <H2>Your last seen</H2>
        </div>
        <div className="grid grid-card">
          {watchesData?.watches.watched.map(
            ({ id, itemType, item, createdAt, tvItem }) => (
              <Seen
                key={id}
                type={itemType}
                item={item}
                tvItem={tvItem || undefined}
                date={createdAt}
              />
            ),
          )}
        </div>
      </div>
      {editingAutoTracked && (
        <AutoTrackedDialog
          item={editingAutoTracked.item as any}
          editingWatched={{
            isEditing: false,
            autoTracked: {
              id: editingAutoTracked.id,
              createdAt: editingAutoTracked.createdAt,
              meta: editingAutoTracked.meta,
              tvItemId: editingAutoTracked.tvItem?.id,
            },
          }}
          onClose={() => setEditingAutoTracked(null)}
        />
      )}
      {pendingRemoval && (
        <DeleteConfirmation
          isOpen={!!pendingRemoval}
          isLoading={loading}
          title={pendingRemoval.title}
          onConfirm={pendingRemoval.onConfirm}
          onCancel={() => setPendingRemoval(null)}
        />
      )}
    </>
  );
}
