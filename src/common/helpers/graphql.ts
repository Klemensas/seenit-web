import { ObservableQueryFields } from '@apollo/client';

export const loadMore = <Q extends {}, V extends {}>(
  fetchMore: ObservableQueryFields<Q, V>['fetchMore'],
  variables: V,
  mergeProps: (prev: Q, next?: Q) => Q,
) => () => {
  return fetchMore({
    variables,
    updateQuery: (prev, { fetchMoreResult }) =>
      mergeProps(prev, fetchMoreResult),
  });
};
