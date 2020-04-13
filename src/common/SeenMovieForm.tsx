import * as React from 'react';
import { Formik, FormikHelpers } from 'formik';
import { FormGroup, TextArea, Button, Intent } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';

import { MovieQuery } from '../graphql';
import RatingInput from './RatingInput';

export type WatchedValues = {
  review: string;
  rating?: number;
  createdAt: number;
};

interface Props {
  item: NonNullable<MovieQuery['movie']>;
  values?: WatchedValues;
  onSubmit: (
    values: WatchedValues,
    formActions: FormikHelpers<WatchedValues>,
  ) => void;
  isLoading: boolean;
}

const SeenMovieForm: React.FC<Props> = ({
  item,
  onSubmit,
  isLoading,
  values = { review: '', createdAt: Date.now() },
}) => {
  return (
    <React.Fragment>
      <div className="flex p-3">
        {item.poster_path && (
          <div className="pr-3">
            <img
              src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
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
};

export default SeenMovieForm;
