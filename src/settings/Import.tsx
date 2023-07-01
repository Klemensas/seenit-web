import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Classes,
  FileInput,
  FormGroup,
  Icon,
  Intent,
  Tab,
  Tabs,
} from '@blueprintjs/core';
import { supportEmail } from '../common/constants';
import { useImportLetterboxdLazyQuery } from '../graphql';
import { ImportedItem } from './ImportedItem';
import { useRef } from 'react';

export default function Import() {
  const [importActive, setImportActive] = useState(!false);
  const [targetFile, setTargetFile] = useState<File | null>(null);
  const sizeLimitExceeded = !!targetFile && targetFile.size > 102400;
  const [query, result] = useImportLetterboxdLazyQuery({
    notifyOnNetworkStatusChange: true,
  });
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [importState, setImportState] = useState<'initial' | 'selecting'>(
    'initial',
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (result.data && !result.loading) setImportState('selecting');
  }, [result.data, result.loading]);

  useEffect(() => {
    if (!result.data) return;

    setSelectedItems(Array.from(result.data.importLetterboxd.keys()));
  }, [result.data]);

  function startImport() {
    return (
      <>
        <p>
          Letterboxd allows{' '}
          <a
            href="https://letterboxd.com/settings/data/"
            target="_blank"
            rel="noopener noreferrer"
          >
            exporting your data
          </a>
          . The export should download a zip file. Input that file here.
        </p>
        <p>
          Filesize is limited to 100kb. If your file exceeds this limit let us
          know at <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
        </p>
        <FormGroup
          intent={sizeLimitExceeded ? Intent.DANGER : undefined}
          helperText={sizeLimitExceeded && 'Maximum size is 100kb'}
        >
          <FileInput
            hasSelection={!!targetFile}
            text={targetFile?.name || 'Letterboxd zip file'}
            inputProps={{
              accept: '.zip',
              ref: fileInputRef,
            }}
            onInputChange={event => {
              setTargetFile(
                (event.target as HTMLInputElement).files?.[0] || null,
              );
            }}
          />
        </FormGroup>
        <Button
          disabled={!targetFile || sizeLimitExceeded}
          onClick={() => {
            const variables = { file: targetFile };
            if (result.refetch) return result.refetch(variables);

            query({ variables });
          }}
          loading={result.loading}
          text="Start import"
        />
      </>
    );
  }

  function selectImport() {
    return (
      <>
        <p>
          Successfully read your import. You can edit the items before saving.
        </p>
        <div className="p-2 sticky-below-header flex flex-items-center">
          <Button
            icon="chevron-left"
            text="Cancel"
            small
            className="mr-4"
            onClick={() => {
              setImportState('initial');
              setTargetFile(null);
              if (fileInputRef.current) fileInputRef.current.files = null;
            }}
          />
          <div className="flex flex-grow flex-content-end flex-items-center">
            <Checkbox
              className="m-0 py-2"
              checked={
                selectedItems.length === result.data?.importLetterboxd.length
              }
              indeterminate={
                !!selectedItems.length &&
                selectedItems.length <
                  (result.data?.importLetterboxd.length || 0)
              }
              label={
                selectedItems.length
                  ? `${selectedItems.length} Selected`
                  : 'Select all'
              }
              onChange={() =>
                setSelectedItems(
                  selectedItems.length === result.data?.importLetterboxd.length
                    ? []
                    : Array.from((result.data?.importLetterboxd || []).keys()),
                )
              }
            />
            <Button
              small
              className="ml-2"
              icon="tick"
              disabled={!selectedItems.length}
              onClick={async () => {
                // const ids = selectedItems.filter(id => {
                //   const trackedItem = autoTrackedData?.autoTrackedList.autoTracked.find(
                //     item => item.id === id,
                //   );
                //   return trackedItem && trackedItem.item;
                // });
                // const hasItemlessIds = ids.length !== selectedItems.length;
                // await convertAutoTracked({ variables: { ids } });
                // if (hasItemlessIds) {
                //   AppToaster.show({
                //     message: "Couldn't save items without shows",
                //     intent: Intent.WARNING,
                //   });
                // }
                // setSelectedItems([]);
              }}
            >
              Save
            </Button>
          </div>
        </div>

        <div className="grid grid-card">
          {result.data?.importLetterboxd.map(
            ({ imported, original }, index) => (
              <div
                key={index}
                className={Classes.INTENT_PRIMARY}
                style={{ position: 'relative' }}
              >
                {selectedItems.includes(index) && (
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
                <ImportedItem
                  imported={imported}
                  original={original}
                  isSelected={selectedItems.includes(index)}
                  onSave={() => {}}
                  onSelect={() => setSelectedItems([...selectedItems, index])}
                  onDeselect={() =>
                    setSelectedItems(selectedItems.filter(sid => sid !== index))
                  }
                  onRemove={() => {}}
                />
              </div>
            ),
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <p>
        We support a multitude of import formats including our custom own. All
        of the formats are CSV based, select the desired format to learn more.
      </p>
      <p className="mb-4">
        After uploading a file and startig import you'll be able to preview the
        data.
      </p>
      {!importActive ? (
        <Button text="Import data" onClick={() => setImportActive(true)} />
      ) : (
        <Tabs defaultSelectedTabId="letterboxd" vertical>
          <Tab
            id="general"
            title="General"
            panel={
              <p>
                We support a multitude of import formats including our custom
                own.
              </p>
            }
          />
          <Tab
            id="letterboxd"
            title="Letterboxd"
            panelClassName="flex-grow"
            panel={importState === 'selecting' ? selectImport() : startImport()}
          />
          <Tab id="rotten" title="Rotten Tomatoes" panel={<div>tmasd</div>} />
          <Tab id="imdb" title="IMDB" panel={<div>tmasd</div>} />
        </Tabs>
      )}
    </>
  );
}
