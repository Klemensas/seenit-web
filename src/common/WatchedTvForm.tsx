import * as React from 'react';
import { Formik, FormikHelpers } from 'formik';
import {
  FormGroup,
  TextArea,
  Button,
  Intent,
  MenuItem,
  PopoverPosition,
  MenuDivider,
  Tooltip,
} from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';

import { TvQuery } from '../graphql';
import RatingInput from './RatingInput';
import { Suggest, ItemRenderer } from '@blueprintjs/select';

interface ItemSelection {
  id: string;
  name: string;
  seasonName: string;
  lastSeasonEpisode: boolean;
  lastSeason: boolean;
}

const itemFilter = (query: string, items: ItemSelection[]) =>
  items.filter(({ name, seasonName }) =>
    `${name} ${seasonName}`.toLowerCase().includes(query.toLowerCase()),
  );

const getSelectOptions = (seasons: TvQuery['tv']['seasons']) =>
  seasons.reduce(
    (
      acc: Array<ItemSelection>,
      { season_number: season, episodes },
      seasonIndex,
    ) => {
      acc.push(
        ...episodes.map(
          ({ id, name, episode_number: episode }, episodeIndex) => ({
            id,
            name,
            seasonName: season ? `S${season}E${episode}` : '',
            value: { season, episode },
            lastSeasonEpisode: episodeIndex + 1 === episodes.length,
            lastSeason: seasonIndex + 1 === seasons.length,
          }),
        ),
      );

      return acc;
    },
    [],
  );

const renderEpisode: ItemRenderer<ItemSelection> = (
  episode,
  { handleClick, modifiers, query },
) => {
  if (!modifiers.matchesPredicate) return null;

  return (
    <React.Fragment key={episode.id}>
      <MenuItem
        active={modifiers.active}
        text={episode.name}
        label={episode.seasonName || undefined}
        onClick={handleClick}
      />
      {!query && episode.lastSeasonEpisode && !episode.lastSeason && (
        <MenuDivider />
      )}
    </React.Fragment>
  );
};

export type WatchedValues = {
  createdAt: number;
  tvItemId?: string;
  review: string;
  rating?: number;
};

interface Props {
  item: NonNullable<TvQuery['tv']>;
  values?: WatchedValues;
  onSubmit: (
    values: WatchedValues,
    formActions: FormikHelpers<WatchedValues>,
  ) => void;
  isLoading: boolean;
}

export default function WatchedTvForm({
  item,
  onSubmit,
  isLoading,
  values = { createdAt: Date.now(), review: '' },
}: Props) {
  const seasons = item.seasons;
  const options = getSelectOptions(seasons);
  return (
    <React.Fragment>
      <div className="flex p-3">
        {item.poster_path && (
          <div className="pr-3">
            <img
              src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
              alt={`Poster for ${item.name}`}
              className="img-responsive"
            />
          </div>
        )}
        <Formik<WatchedValues>
          enableReinitialize
          initialValues={values}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, handleSubmit, setFieldValue }) => (
            <form className="flex-grow" onSubmit={handleSubmit}>
              <FormGroup label="Watched on" labelFor="createdAt">
                <DateInput
                  popoverProps={{
                    fill: true,
                  }}
                  formatDate={date => date.toLocaleString()}
                  parseDate={str => new Date(str)}
                  placeholder="M/D/YYYY"
                  onChange={date => setFieldValue('createdAt', +new Date(date))}
                  value={new Date(values.createdAt)}
                />
              </FormGroup>
              <FormGroup
                label="Episode"
                labelFor="tvItemId"
                helperText="Empty episode field indicates the whole show"
              >
                <Suggest<ItemSelection>
                  selectedItem={
                    options.find(({ id }) => id === values.tvItemId) || null
                  }
                  inputValueRenderer={({ name }) => name}
                  itemRenderer={renderEpisode}
                  items={options}
                  itemListPredicate={itemFilter}
                  onItemSelect={({ id }) => setFieldValue('tvItemId', id)}
                  noResults={<MenuItem disabled text="Got nothing :(" />}
                  popoverProps={{
                    minimal: true,
                    fill: true,
                    usePortal: false,
                    position: PopoverPosition.BOTTOM,
                  }}
                  inputProps={{
                    placeholder: 'Select an episode',
                    rightElement: (
                      <Tooltip content="Clear selection">
                        <Button
                          icon="cross"
                          minimal
                          onClick={() => setFieldValue('tvItemId', null)}
                        />
                      </Tooltip>
                    ),
                  }}
                  className="select-popover-centered"
                />
              </FormGroup>
              <FormGroup label="Review" labelFor="review">
                <TextArea
                  fill
                  growVertically
                  large
                  name="review"
                  onChange={handleChange}
                  value={values.review}
                  placeholder="Any thoughts on what you watched?"
                />
              </FormGroup>
              <FormGroup label="Rating" labelFor="rating">
                <div className="flex flex-content-between flex-items-center">
                  <div>
                    <RatingInput
                      value={values.rating || 0}
                      className="seen-rating"
                      onChange={value => setFieldValue('rating', value)}
                    />{' '}
                    <span>{values.rating || '?'}/5</span>
                  </div>
                  {values.rating && (
                    <Button
                      icon="cross"
                      intent={Intent.DANGER}
                      minimal
                      small
                      onClick={() => setFieldValue('rating', undefined)}
                    />
                  )}
                </div>
              </FormGroup>
              <Button
                type="submit"
                large
                fill
                intent={Intent.PRIMARY}
                loading={isLoading}
              >
                Add
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
}
