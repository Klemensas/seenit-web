import { WatchesQuery, MovieQuery } from '.';

export const mergeWatches = (
  prev: WatchesQuery,
  next?: WatchesQuery,
): WatchesQuery =>
  next
    ? {
        watches: {
          ...next.watches,
          watched: [...prev.watches.watched, ...next.watches.watched],
        },
      }
    : prev;

export const mergeMovie = (prev: MovieQuery, next?: MovieQuery): MovieQuery =>
  next
    ? {
        movie: {
          ...next.movie,
          watched: {
            ...next.movie.watched,
            watched: [
              ...prev.movie.watched.watched,
              ...next.movie.watched.watched,
            ],
          },
        },
      }
    : prev;
