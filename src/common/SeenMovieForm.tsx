import * as React from 'react';
import { MutationFunction } from 'react-apollo';
import { Formik } from 'formik';
import { FormGroup, TextArea, Button, Intent } from '@blueprintjs/core';
import { DateInput } from '@blueprintjs/datetime';

import {
  TmdbMediaType,
  MovieQuery,
  AddWatchedMutation,
  AddWatchedMutationVariables,
} from '../graphql';
import RatingInput from './RatingInput';

interface Props {
  item: NonNullable<MovieQuery['movie']>;
  onSubmit: MutationFunction<AddWatchedMutation, AddWatchedMutationVariables>;
  isLoading: boolean;
}

const SeenMovieForm: React.FC<Props> = ({ item, onSubmit, isLoading }) => {
  return (
    <React.Fragment>
      <div className="flex p-3">
        {item.poster_path ? (
          <div className="pr-3">
            <img
              src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
              alt={`Poster for ${item.title}`}
              className="img-responsive"
            />
          </div>
        ) : null}
        {/* <div style={{ padding: '0 0.5em' }}>
          Did you enjoy watching {item.title}?
        </div> */}
        <Formik<{
          review: string;
          rating: undefined | number;
          createdAt: number;
        }>
          enableReinitialize
          initialValues={{
            review: '',
            rating: undefined,
            createdAt: Date.now(),
          }}
          onSubmit={(values, actions) => {
            onSubmit({
              variables: {
                ...values,
                itemId: item.id,
                mediaType: TmdbMediaType.Movie,
                rating: values.rating
                  ? {
                      value: values.rating,
                    }
                  : undefined,
                review: values.review
                  ? {
                      body: values.review,
                    }
                  : undefined,
              },
            }).then(() => actions.setSubmitting(false));
          }}
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
                <p>
                  <RatingInput
                    value={values.rating || 0}
                    onChange={value => setFieldValue('rating', value)}
                  />{' '}
                  {values.rating || '?'}/5
                </p>
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
