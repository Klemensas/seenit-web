import React from 'react';
import {
  H1,
  H2,
  Switch,
  FormGroup,
  NumericInput,
  Button,
  Spinner,
} from '@blueprintjs/core';
import { Formik, Form } from 'formik';

import {
  useUpdateSettingsMutation,
  useAuthQuery,
  useSettingsQuery,
} from '../graphql';
import Blacklist from './Blacklist';
import { updateUserSettings } from '../graphql/helpers';

export default function Settings() {
  const { data, loading } = useSettingsQuery({
    pollInterval: 60000,
    fetchPolicy: 'network-only',
  });
  const { data: localUser } = useAuthQuery();
  const currentSettings = data?.settings;
  const [updateSettings] = useUpdateSettingsMutation({
    update: (cache, { data }) => {
      if (!data) return;

      updateUserSettings(cache, {
        ...localUser?.auth!,
        settings: data.updateSettings,
      });
    },
  });

  const form =
    loading || !currentSettings
      ? null
      : {
          general: {
            autoConvert: currentSettings.general.autoConvert,
          },
          extension: {
            autoTrack: currentSettings.extension.autoTrack,
            minLengthSeconds: currentSettings.extension.minLengthSeconds,
            blacklist: currentSettings.extension.blacklist,
          },
        };

  return (
    <>
      <H1>Settings</H1>
      <p className="mb-4">
        Set your preferences for browser extension, desktop app and control how
        tracking works
      </p>
      {!form ? (
        <Spinner size={16} />
      ) : (
        <Formik
          onSubmit={values => updateSettings({ variables: values })}
          enableReinitialize
          initialValues={form}
        >
          {({ values, handleChange, setFieldValue, isSubmitting }) => (
            <Form>
              <div>
                <H2 className="mt-4">General</H2>
                <p className="mb-4">Site specific settings</p>

                <FormGroup
                  label="Auto tracked"
                  helperText="Enabling this saves identified auto tracked items directly to your watched list instead of a draft"
                >
                  <Switch
                    name="general.autoConvert"
                    label="Automatically save eligible items"
                    checked={values.general.autoConvert}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
              <div>
                <H2 className="mt-4">Extension</H2>
                <p className="mb-4">Controls the browser extension behavior</p>

                <FormGroup
                  label="Tracking"
                  helperText="Enabling this removes the watched popup after finishing a video and instead automatically saves the item as a draft"
                >
                  <Switch
                    name="extension.autoTrack"
                    label="Automatically track finished videos"
                    checked={values.extension.autoTrack}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup
                  label="Minimum video length"
                  helperText="Specify minimum amount in seconds for videos to be registered as watched"
                >
                  <NumericInput
                    onValueChange={value =>
                      setFieldValue('extension.minLengthSeconds', value)
                    }
                    value={values.extension.minLengthSeconds}
                  />
                </FormGroup>
                <Blacklist
                  list={values.extension.blacklist}
                  updateList={list =>
                    setFieldValue('extension.blacklist', list)
                  }
                  helperTextPrefix={<p>List of domains that are not tracked</p>}
                />
              </div>
              <Button type="submit" loading={isSubmitting}>
                Save
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}
