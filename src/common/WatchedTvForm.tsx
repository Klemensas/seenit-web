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
  Spinner,
} from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';

import { TvQuery, useSeasonsQuery } from '../graphql';
import RatingInput from './RatingInput';
import { Suggest, ItemRenderer } from '@blueprintjs/select';
import { TvData } from '../show/Tv/WatchedTvDialog';
import { WatchedValues } from './WatchedForm';

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

interface Props {
  item: TvData;
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
  const { data, loading: isSeasonsLoading } = useSeasonsQuery({
    variables: {
      itemId: item.id,
    },
    skip: !!item.seasons,
  });
  const seasons = item.seasons || data?.seasons || [];

  const options = getSelectOptions(seasons);
  return (
    <React.Fragment>
      <div className="flex p-3">
        {item.poster && (
          <div className="pr-3">
            <img
              src={`https://image.tmdb.org/t/p/w185${item.poster}`}
              alt={`Poster for ${item.title}`}
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
                  inputValueRenderer={({ name, seasonName }) =>
                    `${name} - ${seasonName}`
                  }
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
                  disabled={isSeasonsLoading}
                  inputProps={{
                    placeholder: 'Select an episode',
                    rightElement: !isSeasonsLoading ? (
                      <Tooltip content="Clear selection">
                        <Button
                          icon="cross"
                          minimal
                          onClick={() => setFieldValue('tvItemId', null)}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip content="Loading season data">
                        <Spinner size={16} />
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
