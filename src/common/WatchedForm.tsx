import React from 'react';

import { MovieQuery, TvQuery, WatchesQuery, AutoTrackedMeta } from '../graphql';
import WatchedMovieForm from './WatchedMovieForm';
import WatchedTvForm from './WatchedTvForm';
import { FormikConfig } from 'formik';

export type EditingWatched =
  | null
  | {
      isEditing: false;
      autoTracked?: {
        id: string;
        createdAt: number;
        meta: AutoTrackedMeta;
        tvItemId?: string;
      };
    }
  | { isEditing: true; item: WatchesQuery['watches']['watched'][0] };

export type WatchedFormItemData = {
  id: string;
  title: string;
  poster: string;
};

export type WatchedValues = {
  createdAt: number;
  review: string;
  rating?: number;
  tvItemId?: string;
};

type Props = {
  editingWatched: EditingWatched;
  onSubmit: FormikConfig<WatchedValues>['onSubmit'];
  isLoading: boolean;
  item: TvQuery['tv'] | MovieQuery['movie'];
};

export default function WatchedForm({
  editingWatched,
  onSubmit,
  isLoading,
  item,
}: Props) {
  const values = editingWatched?.isEditing
    ? {
        createdAt: editingWatched.item.createdAt,
        review: editingWatched.item.review?.body || '',
        rating: editingWatched.item.rating?.value,
        tvItemId: editingWatched.item.tvItem?.id,
      }
    : editingWatched?.autoTracked
    ? {
        createdAt: editingWatched.autoTracked.createdAt,
        tvItemId: editingWatched.autoTracked.tvItemId,
        review: '',
      }
    : undefined;

  if ('title' in item) {
    return (
      <WatchedMovieForm
        item={{
          id: item.id,
          title: item.title,
          poster: item.poster_path || '',
        }}
        values={values}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    );
  }

  if ('name' in item) {
    return (
      <WatchedTvForm
        item={{
          id: item.id,
          title: item.name,
          poster: item.poster_path || '',
          seasons: item.seasons,
        }}
        values={values}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    );
  }

  return null;
}
