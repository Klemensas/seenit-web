import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Author = {
  __typename?: 'Author';
  id?: Maybe<Scalars['Int']>;
  credit_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['Int']>;
  profile_path?: Maybe<Scalars['String']>;
};

export type AutoTracked = {
  __typename?: 'AutoTracked';
  id: Scalars['ID'];
  userId: Scalars['ID'];
  user: User;
  itemType?: Maybe<ItemType>;
  item?: Maybe<Item>;
  tvItemType?: Maybe<TvItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItem?: Maybe<TvItem>;
  meta: AutoTrackedMeta;
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
};

export type AutoTrackedCursor = {
  __typename?: 'AutoTrackedCursor';
  autoTracked: Array<AutoTracked>;
  cursor?: Maybe<Scalars['String']>;
  hasMore: Scalars['Boolean'];
};

export type AutoTrackedMeta = {
  __typename?: 'AutoTrackedMeta';
  title?: Maybe<Scalars['String']>;
  tvData?: Maybe<AutoTrackedMetaTvData>;
  filename?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
};

export type AutoTrackedMetaInput = {
  title?: Maybe<Scalars['String']>;
  tvData?: Maybe<TvDataInput>;
  filename?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
};

export type AutoTrackedMetaTvData = {
  __typename?: 'AutoTrackedMetaTvData';
  season?: Maybe<Scalars['String']>;
  episode?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Collection = {
  __typename?: 'Collection';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  backdrop_path?: Maybe<Scalars['String']>;
};

export type Company = {
  __typename?: 'Company';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  logo_path?: Maybe<Scalars['String']>;
  origin_country?: Maybe<Scalars['String']>;
};

export type ConvertedAutoTracked = {
  __typename?: 'ConvertedAutoTracked';
  removedIds: Array<Scalars['ID']>;
  watched: Array<Watched>;
};

export type Country = {
  __typename?: 'Country';
  iso_3166_1?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Episode = {
  __typename?: 'Episode';
  id: Scalars['ID'];
  name: Scalars['String'];
  overview: Scalars['String'];
  episode_number: Scalars['Int'];
  air_date?: Maybe<Scalars['String']>;
  production_code?: Maybe<Scalars['String']>;
  still_path?: Maybe<Scalars['String']>;
  vote_average: Scalars['Float'];
  vote_count: Scalars['Int'];
  tmdbId: Scalars['Int'];
  seasonId: Scalars['ID'];
  season: Season;
};

export type Genre = {
  __typename?: 'Genre';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type Item = Movie | Tv;

export enum ItemType {
  Movie = 'Movie',
  Tv = 'Tv',
}

export type Language = {
  __typename?: 'Language';
  iso_639_1?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type LocalAuth = {
  __typename?: 'LocalAuth';
  user: User;
  token: Scalars['String'];
};

export type Movie = {
  __typename?: 'Movie';
  id: Scalars['ID'];
  adult: Scalars['Boolean'];
  backdrop_path?: Maybe<Scalars['String']>;
  belongs_to_collection?: Maybe<Collection>;
  budget: Scalars['Int'];
  genre?: Maybe<Array<Maybe<Genre>>>;
  homepage?: Maybe<Scalars['String']>;
  imdb_id?: Maybe<Scalars['String']>;
  original_language?: Maybe<Scalars['String']>;
  original_title?: Maybe<Scalars['String']>;
  overview: Scalars['String'];
  popularity?: Maybe<Scalars['Float']>;
  poster_path?: Maybe<Scalars['String']>;
  production_companies?: Maybe<Array<Maybe<Company>>>;
  production_countries?: Maybe<Array<Maybe<Country>>>;
  release_date: Scalars['String'];
  revenue?: Maybe<Scalars['Int']>;
  runtime?: Maybe<Scalars['Int']>;
  spoken_languages?: Maybe<Array<Maybe<Language>>>;
  status?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  video?: Maybe<Scalars['Boolean']>;
  vote_average: Scalars['Float'];
  vote_count: Scalars['Int'];
  tmdbId?: Maybe<Scalars['Int']>;
  watched: WatchedCursor;
};

export type MovieWatchedArgs = {
  cursor?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  addAutoTracked: AutoTracked;
  addWatched: Watched;
  convertAutoTracked: ConvertedAutoTracked;
  editWatched: Watched;
  login: LocalAuth;
  logout?: Maybe<Scalars['Boolean']>;
  register: LocalAuth;
  removeAutoTracked: Array<Scalars['ID']>;
  removeWatched: Scalars['ID'];
};

export type MutationAddAutoTrackedArgs = {
  meta: AutoTrackedMetaInput;
  createdAt: Scalars['Float'];
  itemId?: Maybe<Scalars['ID']>;
  itemType?: Maybe<ItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
};

export type MutationAddWatchedArgs = {
  itemId: Scalars['ID'];
  itemType: ItemType;
  rating?: Maybe<RatingInput>;
  review?: Maybe<ReviewInput>;
  createdAt?: Maybe<Scalars['Float']>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
  autoTrackedId?: Maybe<Scalars['ID']>;
};

export type MutationConvertAutoTrackedArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationEditWatchedArgs = {
  id: Scalars['ID'];
  createdAt?: Maybe<Scalars['Float']>;
  rating?: Maybe<RatingInput>;
  review?: Maybe<ReviewInput>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationRegisterArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationRemoveAutoTrackedArgs = {
  ids: Array<Scalars['ID']>;
};

export type MutationRemoveWatchedArgs = {
  itemId: Scalars['ID'];
};

export type Network = {
  __typename?: 'Network';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  logo_path?: Maybe<Scalars['String']>;
  origin_country?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  auth?: Maybe<User>;
  autoTracked: AutoTracked;
  autoTrackedList: AutoTrackedCursor;
  episode: Episode;
  me: User;
  movie: Movie;
  reviews: ReviewCursor;
  searchContent: Array<SearchItem>;
  season: Season;
  seasons: Array<Season>;
  tv: Tv;
  user: User;
  users?: Maybe<Array<User>>;
  watched: Watched;
  watches: WatchedCursor;
};

export type QueryAutoTrackedArgs = {
  id: Scalars['ID'];
};

export type QueryAutoTrackedListArgs = {
  userId: Scalars['ID'];
  cursor?: Maybe<Scalars['String']>;
};

export type QueryEpisodeArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryMovieArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryReviewsArgs = {
  userId?: Maybe<Scalars['ID']>;
  itemId?: Maybe<Scalars['ID']>;
  itemType?: Maybe<ItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
  cursor?: Maybe<Scalars['String']>;
};

export type QuerySearchContentArgs = {
  title: Scalars['String'];
};

export type QuerySeasonArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QuerySeasonsArgs = {
  itemId: Scalars['ID'];
};

export type QueryTvArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type QueryWatchedArgs = {
  id: Scalars['ID'];
};

export type QueryWatchesArgs = {
  userId?: Maybe<Scalars['ID']>;
  itemId?: Maybe<Scalars['ID']>;
  itemType?: Maybe<ItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
  cursor?: Maybe<Scalars['String']>;
};

export type Rating = {
  __typename?: 'Rating';
  id: Scalars['ID'];
  value: Scalars['Float'];
  tmdbId: Scalars['Int'];
  userId: Scalars['ID'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  user?: Maybe<User>;
  watched?: Maybe<Watched>;
  tvItemType?: Maybe<TvItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItem?: Maybe<TvItem>;
};

export type RatingInput = {
  id?: Maybe<Scalars['ID']>;
  value: Scalars['Float'];
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['ID'];
  body: Scalars['String'];
  tmdbId: Scalars['Int'];
  userId: Scalars['ID'];
  user: User;
  watched: Watched;
  tvItemType?: Maybe<TvItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItem?: Maybe<TvItem>;
};

export type ReviewCursor = {
  __typename?: 'ReviewCursor';
  reviews: Array<Review>;
  cursor?: Maybe<Scalars['String']>;
  hasMore: Scalars['Boolean'];
};

export type ReviewInput = {
  id?: Maybe<Scalars['ID']>;
  body: Scalars['String'];
};

export type Search = {
  __typename?: 'Search';
  results?: Maybe<Array<TmdbMedia>>;
  page: Scalars['Int'];
  total_pages: Scalars['Int'];
  total_results: Scalars['Int'];
};

export type SearchItem = {
  __typename?: 'SearchItem';
  id: Scalars['String'];
  tmdbId: Scalars['Int'];
  title: Scalars['String'];
  release_date?: Maybe<Scalars['String']>;
  type?: Maybe<ItemType>;
};

export type Season = {
  __typename?: 'Season';
  id: Scalars['ID'];
  name: Scalars['String'];
  overview: Scalars['String'];
  air_date: Scalars['String'];
  episode_count: Scalars['Int'];
  poster_path?: Maybe<Scalars['String']>;
  season_number: Scalars['Int'];
  tmdbId: Scalars['Int'];
  tvId: Scalars['ID'];
  tv: Tv;
  episodes: Array<Episode>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']>;
};

export type TmdbMedia = TmdbMovie | TmdbTv;

export enum TmdbMediaType {
  Movie = 'Movie',
  Tv = 'Tv',
}

export type TmdbMovie = {
  __typename?: 'TmdbMovie';
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  original_title?: Maybe<Scalars['String']>;
  original_language?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  genre_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  adult?: Maybe<Scalars['Boolean']>;
  release_date?: Maybe<Scalars['String']>;
  backdrop_path?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['Boolean']>;
  vote_count?: Maybe<Scalars['Int']>;
  vote_average?: Maybe<Scalars['Float']>;
  popularity?: Maybe<Scalars['Int']>;
  media_type?: Maybe<TmdbMediaType>;
};

export type TmdbPerson = {
  __typename?: 'TmdbPerson';
  popularity?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  vote_average?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  profile_path?: Maybe<Scalars['String']>;
  adult?: Maybe<Scalars['String']>;
  known_for?: Maybe<TmdbMedia>;
  media_type?: Maybe<TmdbMediaType>;
};

export type TmdbTv = {
  __typename?: 'TmdbTv';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  original_name?: Maybe<Scalars['String']>;
  original_language?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  genre_ids?: Maybe<Array<Maybe<Scalars['Int']>>>;
  backdrop_path?: Maybe<Scalars['String']>;
  first_air_date?: Maybe<Scalars['String']>;
  origin_country?: Maybe<Array<Maybe<Scalars['String']>>>;
  vote_count?: Maybe<Scalars['Int']>;
  vote_average?: Maybe<Scalars['Float']>;
  popularity?: Maybe<Scalars['Int']>;
  media_type?: Maybe<TmdbMediaType>;
};

export type Tv = {
  __typename?: 'Tv';
  id: Scalars['ID'];
  backdrop_path?: Maybe<Scalars['String']>;
  created_by?: Maybe<Array<Maybe<Author>>>;
  episode_run_time?: Maybe<Array<Maybe<Scalars['Int']>>>;
  first_air_date: Scalars['String'];
  genres?: Maybe<Array<Maybe<Genre>>>;
  homepage: Scalars['String'];
  in_production: Scalars['Boolean'];
  languages?: Maybe<Array<Maybe<Scalars['String']>>>;
  last_air_date: Scalars['String'];
  last_episode_to_air?: Maybe<Episode>;
  name: Scalars['String'];
  next_episode_to_air?: Maybe<Episode>;
  networks?: Maybe<Array<Maybe<Network>>>;
  number_of_episodes: Scalars['Int'];
  number_of_seasons: Scalars['Int'];
  origin_country?: Maybe<Array<Maybe<Scalars['String']>>>;
  original_language: Scalars['String'];
  original_name: Scalars['String'];
  overview: Scalars['String'];
  popularity: Scalars['Int'];
  poster_path?: Maybe<Scalars['String']>;
  production_companies?: Maybe<Array<Maybe<Company>>>;
  seasons: Array<Season>;
  status: Scalars['String'];
  type: Scalars['String'];
  vote_average: Scalars['Float'];
  vote_count: Scalars['Int'];
  tmdbId?: Maybe<Scalars['Int']>;
  watched: WatchedCursor;
};

export type TvWatchedArgs = {
  cursor?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
};

export type TvDataInput = {
  season?: Maybe<Scalars['String']>;
  episode?: Maybe<Scalars['String']>;
};

export type TvItem = Season | Episode;

export enum TvItemType {
  Season = 'Season',
  Episode = 'Episode',
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  watched: WatchedCursor;
};

export type UserWatchedArgs = {
  cursor?: Maybe<Scalars['String']>;
};

export type UserInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  updatedAt?: Maybe<Scalars['Float']>;
};

export type Watched = {
  __typename?: 'Watched';
  id: Scalars['ID'];
  tmdbId: Scalars['Int'];
  createdAt: Scalars['Float'];
  updatedAt: Scalars['Float'];
  userId: Scalars['ID'];
  user: User;
  itemType: ItemType;
  item: Item;
  rating?: Maybe<Rating>;
  review?: Maybe<Review>;
  tvItemType?: Maybe<TvItemType>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItem?: Maybe<TvItem>;
};

export type WatchedCursor = {
  __typename?: 'WatchedCursor';
  watched: Array<Watched>;
  cursor?: Maybe<Scalars['String']>;
  hasMore: Scalars['Boolean'];
};

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'LocalAuth' } & Pick<LocalAuth, 'token'> & {
      user: { __typename?: 'User' } & Pick<
        User,
        'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'
      >;
    };
};

export type RegisterMutationVariables = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'LocalAuth' } & Pick<LocalAuth, 'token'> & {
      user: { __typename?: 'User' } & Pick<
        User,
        'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'
      >;
    };
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'logout'
>;

export type AddWatchedMutationVariables = {
  itemId: Scalars['ID'];
  itemType: ItemType;
  createdAt: Scalars['Float'];
  rating?: Maybe<RatingInput>;
  review?: Maybe<ReviewInput>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
  autoTrackedId?: Maybe<Scalars['ID']>;
};

export type AddWatchedMutation = { __typename?: 'Mutation' } & {
  addWatched: { __typename?: 'Watched' } & Pick<
    Watched,
    'id' | 'itemType' | 'createdAt' | 'tvItemType'
  > & {
      rating?: Maybe<{ __typename?: 'Rating' } & Pick<Rating, 'id' | 'value'>>;
      review?: Maybe<{ __typename?: 'Review' } & Pick<Review, 'id' | 'body'>>;
      tvItem?: Maybe<
        | ({ __typename?: 'Season' } & Pick<Season, 'id' | 'season_number'>)
        | ({ __typename?: 'Episode' } & Pick<
            Episode,
            'id' | 'episode_number'
          > & {
              season: { __typename?: 'Season' } & Pick<
                Season,
                'id' | 'season_number'
              >;
            })
      >;
    };
};

export type EditWatchedMutationVariables = {
  id: Scalars['ID'];
  createdAt: Scalars['Float'];
  rating?: Maybe<RatingInput>;
  review?: Maybe<ReviewInput>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
};

export type EditWatchedMutation = { __typename?: 'Mutation' } & {
  editWatched: { __typename?: 'Watched' } & Pick<
    Watched,
    'id' | 'itemType' | 'createdAt' | 'tvItemType'
  > & {
      rating?: Maybe<{ __typename?: 'Rating' } & Pick<Rating, 'id' | 'value'>>;
      review?: Maybe<{ __typename?: 'Review' } & Pick<Review, 'id' | 'body'>>;
      tvItem?: Maybe<
        | ({ __typename?: 'Season' } & Pick<Season, 'id' | 'season_number'>)
        | ({ __typename?: 'Episode' } & Pick<
            Episode,
            'id' | 'episode_number'
          > & {
              season: { __typename?: 'Season' } & Pick<
                Season,
                'id' | 'season_number'
              >;
            })
      >;
    };
};

export type RemoveWatchedMutationVariables = {
  itemId: Scalars['ID'];
};

export type RemoveWatchedMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'removeWatched'
>;

export type RemoveAutoTrackedMutationVariables = {
  ids: Array<Scalars['ID']>;
};

export type RemoveAutoTrackedMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'removeAutoTracked'
>;

export type ConvertAutoTrackedMutationVariables = {
  ids: Array<Scalars['ID']>;
};

export type ConvertAutoTrackedMutation = { __typename?: 'Mutation' } & {
  convertAutoTracked: { __typename?: 'ConvertedAutoTracked' } & Pick<
    ConvertedAutoTracked,
    'removedIds'
  >;
};

export type AuthQueryVariables = {};

export type AuthQuery = { __typename?: 'Query' } & {
  auth?: Maybe<
    { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'email' | 'createdAt'>
  >;
};

export type WatchedPropsFragment = { __typename?: 'Watched' } & Pick<
  Watched,
  'id' | 'createdAt' | 'tvItemType'
> & {
    tvItem?: Maybe<
      | ({ __typename?: 'Season' } & WatchedTvItemProps_Season_Fragment)
      | ({ __typename?: 'Episode' } & WatchedTvItemProps_Episode_Fragment)
    >;
    rating?: Maybe<{ __typename?: 'Rating' } & Pick<Rating, 'id' | 'value'>>;
    review?: Maybe<{ __typename?: 'Review' } & Pick<Review, 'id' | 'body'>>;
    user: { __typename?: 'User' } & Pick<User, 'id' | 'name'>;
  };

export type WatchedItemPropsFragment = { __typename?: 'Watched' } & Pick<
  Watched,
  'itemType'
> & {
    item:
      | ({ __typename?: 'Movie' } & Pick<
          Movie,
          'id' | 'title' | 'release_date' | 'poster_path' | 'backdrop_path'
        >)
      | ({ __typename?: 'Tv' } & Pick<
          Tv,
          'id' | 'name' | 'first_air_date' | 'poster_path' | 'backdrop_path'
        >);
  };

type WatchedTvItemProps_Season_Fragment = { __typename?: 'Season' } & Pick<
  Season,
  'id' | 'season_number'
>;

type WatchedTvItemProps_Episode_Fragment = { __typename?: 'Episode' } & Pick<
  Episode,
  'id' | 'episode_number'
> & {
    season: { __typename?: 'Season' } & Pick<Season, 'id' | 'season_number'>;
  };

export type WatchedTvItemPropsFragment =
  | WatchedTvItemProps_Season_Fragment
  | WatchedTvItemProps_Episode_Fragment;

export type WatchedCursorPropsFragment = {
  __typename?: 'WatchedCursor';
} & Pick<WatchedCursor, 'cursor' | 'hasMore'> & {
    watched: Array<{ __typename?: 'Watched' } & WatchedPropsFragment>;
  };

export type WatchedCursorWithItemsPropsFragment = {
  __typename?: 'WatchedCursor';
} & Pick<WatchedCursor, 'cursor' | 'hasMore'> & {
    watched: Array<
      { __typename?: 'Watched' } & WatchedPropsFragment &
        WatchedItemPropsFragment
    >;
  };

export type SeasonPropsFragment = { __typename?: 'Season' } & Pick<
  Season,
  | 'id'
  | 'name'
  | 'overview'
  | 'episode_count'
  | 'air_date'
  | 'poster_path'
  | 'season_number'
> & {
    episodes: Array<
      { __typename?: 'Episode' } & Pick<
        Episode,
        | 'id'
        | 'name'
        | 'overview'
        | 'episode_number'
        | 'air_date'
        | 'vote_average'
        | 'vote_count'
      >
    >;
  };

export type UserQueryVariables = {
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  cursor?: Maybe<Scalars['String']>;
};

export type UserQuery = { __typename?: 'Query' } & {
  user: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'createdAt'> & {
      watched: {
        __typename?: 'WatchedCursor';
      } & WatchedCursorWithItemsPropsFragment;
    };
};

export type MovieQueryVariables = {
  id?: Maybe<Scalars['ID']>;
  cursor?: Maybe<Scalars['String']>;
};

export type MovieQuery = { __typename?: 'Query' } & {
  movie: { __typename?: 'Movie' } & Pick<
    Movie,
    | 'id'
    | 'title'
    | 'overview'
    | 'release_date'
    | 'poster_path'
    | 'backdrop_path'
    | 'vote_average'
    | 'vote_count'
  > & {
      watched: { __typename?: 'WatchedCursor' } & WatchedCursorPropsFragment;
    };
};

export type TvQueryVariables = {
  id?: Maybe<Scalars['ID']>;
  cursor?: Maybe<Scalars['String']>;
};

export type TvQuery = { __typename?: 'Query' } & {
  tv: { __typename?: 'Tv' } & Pick<
    Tv,
    | 'id'
    | 'name'
    | 'overview'
    | 'first_air_date'
    | 'poster_path'
    | 'backdrop_path'
    | 'vote_average'
    | 'vote_count'
  > & {
      seasons: Array<{ __typename?: 'Season' } & SeasonPropsFragment>;
      watched: { __typename?: 'WatchedCursor' } & WatchedCursorPropsFragment;
    };
};

export type WatchedQueryVariables = {
  id: Scalars['ID'];
};

export type WatchedQuery = { __typename?: 'Query' } & {
  watched: { __typename?: 'Watched' } & WatchedPropsFragment;
};

export type WatchesQueryVariables = {
  userId?: Maybe<Scalars['ID']>;
  itemId?: Maybe<Scalars['ID']>;
  itemType?: Maybe<ItemType>;
  cursor?: Maybe<Scalars['String']>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
};

export type WatchesQuery = { __typename?: 'Query' } & {
  watches: {
    __typename?: 'WatchedCursor';
  } & WatchedCursorWithItemsPropsFragment;
};

export type ReviewsQueryVariables = {
  userId?: Maybe<Scalars['ID']>;
  itemId?: Maybe<Scalars['ID']>;
  itemType?: Maybe<ItemType>;
  cursor?: Maybe<Scalars['String']>;
  tvItemId?: Maybe<Scalars['ID']>;
  tvItemType?: Maybe<TvItemType>;
};

export type ReviewsQuery = { __typename?: 'Query' } & {
  reviews: { __typename?: 'ReviewCursor' } & Pick<
    ReviewCursor,
    'cursor' | 'hasMore'
  > & {
      reviews: Array<
        { __typename?: 'Review' } & Pick<Review, 'id' | 'body'> & {
            watched: { __typename?: 'Watched' } & Pick<
              Watched,
              'id' | 'createdAt' | 'tvItemType'
            > & {
                rating?: Maybe<
                  { __typename?: 'Rating' } & Pick<Rating, 'id' | 'value'>
                >;
                tvItem?: Maybe<
                  | ({
                      __typename?: 'Season';
                    } & WatchedTvItemProps_Season_Fragment)
                  | ({
                      __typename?: 'Episode';
                    } & WatchedTvItemProps_Episode_Fragment)
                >;
                user: { __typename?: 'User' } & Pick<User, 'id' | 'name'>;
              };
          }
      >;
    };
};

export type SearchContentQueryVariables = {
  title: Scalars['String'];
};

export type SearchContentQuery = { __typename?: 'Query' } & {
  searchContent: Array<
    { __typename?: 'SearchItem' } & Pick<
      SearchItem,
      'id' | 'tmdbId' | 'title' | 'release_date' | 'type'
    >
  >;
};

export type AutoTrackedListQueryVariables = {
  userId: Scalars['ID'];
  cursor?: Maybe<Scalars['String']>;
};

export type AutoTrackedListQuery = { __typename?: 'Query' } & {
  autoTrackedList: { __typename?: 'AutoTrackedCursor' } & Pick<
    AutoTrackedCursor,
    'cursor' | 'hasMore'
  > & {
      autoTracked: Array<
        { __typename?: 'AutoTracked' } & Pick<
          AutoTracked,
          'id' | 'itemType' | 'tvItemType' | 'createdAt'
        > & {
            item?: Maybe<
              | ({ __typename?: 'Movie' } & Pick<
                  Movie,
                  | 'id'
                  | 'title'
                  | 'release_date'
                  | 'poster_path'
                  | 'backdrop_path'
                >)
              | ({ __typename?: 'Tv' } & Pick<
                  Tv,
                  | 'id'
                  | 'name'
                  | 'first_air_date'
                  | 'poster_path'
                  | 'backdrop_path'
                >)
            >;
            tvItem?: Maybe<
              | ({ __typename?: 'Season' } & WatchedTvItemProps_Season_Fragment)
              | ({
                  __typename?: 'Episode';
                } & WatchedTvItemProps_Episode_Fragment)
            >;
            meta: { __typename?: 'AutoTrackedMeta' } & Pick<
              AutoTrackedMeta,
              'title' | 'filename' | 'url' | 'provider'
            > & {
                tvData?: Maybe<
                  { __typename?: 'AutoTrackedMetaTvData' } & Pick<
                    AutoTrackedMetaTvData,
                    'season' | 'episode'
                  >
                >;
              };
          }
      >;
    };
};

export type SeasonsQueryVariables = {
  itemId: Scalars['ID'];
};

export type SeasonsQuery = { __typename?: 'Query' } & {
  seasons: Array<{ __typename?: 'Season' } & SeasonPropsFragment>;
};

export const WatchedTvItemPropsFragmentDoc = gql`
  fragment WatchedTvItemProps on TvItem {
    ... on Episode {
      id
      episode_number
      season {
        id
        season_number
      }
    }
    ... on Season {
      id
      season_number
    }
  }
`;
export const WatchedPropsFragmentDoc = gql`
  fragment WatchedProps on Watched {
    id
    createdAt
    tvItemType
    tvItem {
      ...WatchedTvItemProps
    }
    rating {
      id
      value
    }
    review {
      id
      body
    }
    user {
      id
      name
    }
  }
  ${WatchedTvItemPropsFragmentDoc}
`;
export const WatchedCursorPropsFragmentDoc = gql`
  fragment WatchedCursorProps on WatchedCursor {
    cursor
    hasMore
    watched {
      ...WatchedProps
    }
  }
  ${WatchedPropsFragmentDoc}
`;
export const WatchedItemPropsFragmentDoc = gql`
  fragment WatchedItemProps on Watched {
    itemType
    item {
      ... on Movie {
        id
        title
        release_date
        poster_path
        backdrop_path
      }
      ... on Tv {
        id
        name
        first_air_date
        poster_path
        backdrop_path
      }
    }
  }
`;
export const WatchedCursorWithItemsPropsFragmentDoc = gql`
  fragment WatchedCursorWithItemsProps on WatchedCursor {
    cursor
    hasMore
    watched {
      ...WatchedProps
      ...WatchedItemProps
    }
  }
  ${WatchedPropsFragmentDoc}
  ${WatchedItemPropsFragmentDoc}
`;
export const SeasonPropsFragmentDoc = gql`
  fragment SeasonProps on Season {
    id
    name
    overview
    episode_count
    air_date
    poster_path
    season_number
    episodes {
      id
      name
      overview
      episode_number
      air_date
      vote_average
      vote_count
    }
  }
`;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        createdAt
        updatedAt
      }
    }
  }
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
        createdAt
        updatedAt
      }
    }
  }
`;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions);
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<
  RegisterMutation
>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout @client
  }
`;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions,
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<
  LogoutMutation
>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const AddWatchedDocument = gql`
  mutation AddWatched(
    $itemId: ID!
    $itemType: ItemType!
    $createdAt: Float!
    $rating: RatingInput
    $review: ReviewInput
    $tvItemId: ID
    $tvItemType: TvItemType
    $autoTrackedId: ID
  ) {
    addWatched(
      itemId: $itemId
      itemType: $itemType
      createdAt: $createdAt
      rating: $rating
      review: $review
      tvItemId: $tvItemId
      tvItemType: $tvItemType
      autoTrackedId: $autoTrackedId
    ) {
      id
      itemType
      createdAt
      rating {
        id
        value
      }
      review {
        id
        body
      }
      tvItemType
      tvItem {
        ... on Episode {
          id
          episode_number
          season {
            id
            season_number
          }
        }
        ... on Season {
          id
          season_number
        }
      }
    }
  }
`;
export type AddWatchedMutationFn = ApolloReactCommon.MutationFunction<
  AddWatchedMutation,
  AddWatchedMutationVariables
>;

/**
 * __useAddWatchedMutation__
 *
 * To run a mutation, you first call `useAddWatchedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWatchedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWatchedMutation, { data, loading, error }] = useAddWatchedMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      itemType: // value for 'itemType'
 *      createdAt: // value for 'createdAt'
 *      rating: // value for 'rating'
 *      review: // value for 'review'
 *      tvItemId: // value for 'tvItemId'
 *      tvItemType: // value for 'tvItemType'
 *      autoTrackedId: // value for 'autoTrackedId'
 *   },
 * });
 */
export function useAddWatchedMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddWatchedMutation,
    AddWatchedMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    AddWatchedMutation,
    AddWatchedMutationVariables
  >(AddWatchedDocument, baseOptions);
}
export type AddWatchedMutationHookResult = ReturnType<
  typeof useAddWatchedMutation
>;
export type AddWatchedMutationResult = ApolloReactCommon.MutationResult<
  AddWatchedMutation
>;
export type AddWatchedMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddWatchedMutation,
  AddWatchedMutationVariables
>;
export const EditWatchedDocument = gql`
  mutation EditWatched(
    $id: ID!
    $createdAt: Float!
    $rating: RatingInput
    $review: ReviewInput
    $tvItemId: ID
    $tvItemType: TvItemType
  ) {
    editWatched(
      id: $id
      createdAt: $createdAt
      rating: $rating
      review: $review
      tvItemId: $tvItemId
      tvItemType: $tvItemType
    ) {
      id
      itemType
      createdAt
      rating {
        id
        value
      }
      review {
        id
        body
      }
      tvItemType
      tvItem {
        ... on Episode {
          id
          episode_number
          season {
            id
            season_number
          }
        }
        ... on Season {
          id
          season_number
        }
      }
    }
  }
`;
export type EditWatchedMutationFn = ApolloReactCommon.MutationFunction<
  EditWatchedMutation,
  EditWatchedMutationVariables
>;

/**
 * __useEditWatchedMutation__
 *
 * To run a mutation, you first call `useEditWatchedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditWatchedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editWatchedMutation, { data, loading, error }] = useEditWatchedMutation({
 *   variables: {
 *      id: // value for 'id'
 *      createdAt: // value for 'createdAt'
 *      rating: // value for 'rating'
 *      review: // value for 'review'
 *      tvItemId: // value for 'tvItemId'
 *      tvItemType: // value for 'tvItemType'
 *   },
 * });
 */
export function useEditWatchedMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    EditWatchedMutation,
    EditWatchedMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    EditWatchedMutation,
    EditWatchedMutationVariables
  >(EditWatchedDocument, baseOptions);
}
export type EditWatchedMutationHookResult = ReturnType<
  typeof useEditWatchedMutation
>;
export type EditWatchedMutationResult = ApolloReactCommon.MutationResult<
  EditWatchedMutation
>;
export type EditWatchedMutationOptions = ApolloReactCommon.BaseMutationOptions<
  EditWatchedMutation,
  EditWatchedMutationVariables
>;
export const RemoveWatchedDocument = gql`
  mutation RemoveWatched($itemId: ID!) {
    removeWatched(itemId: $itemId)
  }
`;
export type RemoveWatchedMutationFn = ApolloReactCommon.MutationFunction<
  RemoveWatchedMutation,
  RemoveWatchedMutationVariables
>;

/**
 * __useRemoveWatchedMutation__
 *
 * To run a mutation, you first call `useRemoveWatchedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveWatchedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeWatchedMutation, { data, loading, error }] = useRemoveWatchedMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useRemoveWatchedMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveWatchedMutation,
    RemoveWatchedMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RemoveWatchedMutation,
    RemoveWatchedMutationVariables
  >(RemoveWatchedDocument, baseOptions);
}
export type RemoveWatchedMutationHookResult = ReturnType<
  typeof useRemoveWatchedMutation
>;
export type RemoveWatchedMutationResult = ApolloReactCommon.MutationResult<
  RemoveWatchedMutation
>;
export type RemoveWatchedMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveWatchedMutation,
  RemoveWatchedMutationVariables
>;
export const RemoveAutoTrackedDocument = gql`
  mutation RemoveAutoTracked($ids: [ID!]!) {
    removeAutoTracked(ids: $ids)
  }
`;
export type RemoveAutoTrackedMutationFn = ApolloReactCommon.MutationFunction<
  RemoveAutoTrackedMutation,
  RemoveAutoTrackedMutationVariables
>;

/**
 * __useRemoveAutoTrackedMutation__
 *
 * To run a mutation, you first call `useRemoveAutoTrackedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAutoTrackedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAutoTrackedMutation, { data, loading, error }] = useRemoveAutoTrackedMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useRemoveAutoTrackedMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveAutoTrackedMutation,
    RemoveAutoTrackedMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    RemoveAutoTrackedMutation,
    RemoveAutoTrackedMutationVariables
  >(RemoveAutoTrackedDocument, baseOptions);
}
export type RemoveAutoTrackedMutationHookResult = ReturnType<
  typeof useRemoveAutoTrackedMutation
>;
export type RemoveAutoTrackedMutationResult = ApolloReactCommon.MutationResult<
  RemoveAutoTrackedMutation
>;
export type RemoveAutoTrackedMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveAutoTrackedMutation,
  RemoveAutoTrackedMutationVariables
>;
export const ConvertAutoTrackedDocument = gql`
  mutation ConvertAutoTracked($ids: [ID!]!) {
    convertAutoTracked(ids: $ids) {
      removedIds
    }
  }
`;
export type ConvertAutoTrackedMutationFn = ApolloReactCommon.MutationFunction<
  ConvertAutoTrackedMutation,
  ConvertAutoTrackedMutationVariables
>;

/**
 * __useConvertAutoTrackedMutation__
 *
 * To run a mutation, you first call `useConvertAutoTrackedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConvertAutoTrackedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [convertAutoTrackedMutation, { data, loading, error }] = useConvertAutoTrackedMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useConvertAutoTrackedMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ConvertAutoTrackedMutation,
    ConvertAutoTrackedMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    ConvertAutoTrackedMutation,
    ConvertAutoTrackedMutationVariables
  >(ConvertAutoTrackedDocument, baseOptions);
}
export type ConvertAutoTrackedMutationHookResult = ReturnType<
  typeof useConvertAutoTrackedMutation
>;
export type ConvertAutoTrackedMutationResult = ApolloReactCommon.MutationResult<
  ConvertAutoTrackedMutation
>;
export type ConvertAutoTrackedMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ConvertAutoTrackedMutation,
  ConvertAutoTrackedMutationVariables
>;
export const AuthDocument = gql`
  query Auth {
    auth @client {
      id
      name
      email
      createdAt
    }
  }
`;

/**
 * __useAuthQuery__
 *
 * To run a query within a React component, call `useAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AuthQuery,
    AuthQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<AuthQuery, AuthQueryVariables>(
    AuthDocument,
    baseOptions,
  );
}
export function useAuthLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AuthQuery,
    AuthQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<AuthQuery, AuthQueryVariables>(
    AuthDocument,
    baseOptions,
  );
}
export type AuthQueryHookResult = ReturnType<typeof useAuthQuery>;
export type AuthLazyQueryHookResult = ReturnType<typeof useAuthLazyQuery>;
export type AuthQueryResult = ApolloReactCommon.QueryResult<
  AuthQuery,
  AuthQueryVariables
>;
export const UserDocument = gql`
  query User($name: String, $id: ID, $cursor: String) {
    user(name: $name, id: $id) {
      id
      name
      createdAt
      watched(cursor: $cursor) {
        ...WatchedCursorWithItemsProps
      }
    }
  }
  ${WatchedCursorWithItemsPropsFragmentDoc}
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      name: // value for 'name'
 *      id: // value for 'id'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    UserQuery,
    UserQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions,
  );
}
export function useUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UserQuery,
    UserQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions,
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<
  UserQuery,
  UserQueryVariables
>;
export const MovieDocument = gql`
  query Movie($id: ID, $cursor: String) {
    movie(id: $id) {
      id
      title
      overview
      release_date
      poster_path
      backdrop_path
      vote_average
      vote_count
      watched(cursor: $cursor, filter: "Reviewed") {
        ...WatchedCursorProps
      }
    }
  }
  ${WatchedCursorPropsFragmentDoc}
`;

/**
 * __useMovieQuery__
 *
 * To run a query within a React component, call `useMovieQuery` and pass it any options that fit your needs.
 * When your component renders, `useMovieQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMovieQuery({
 *   variables: {
 *      id: // value for 'id'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useMovieQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    MovieQuery,
    MovieQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<MovieQuery, MovieQueryVariables>(
    MovieDocument,
    baseOptions,
  );
}
export function useMovieLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MovieQuery,
    MovieQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<MovieQuery, MovieQueryVariables>(
    MovieDocument,
    baseOptions,
  );
}
export type MovieQueryHookResult = ReturnType<typeof useMovieQuery>;
export type MovieLazyQueryHookResult = ReturnType<typeof useMovieLazyQuery>;
export type MovieQueryResult = ApolloReactCommon.QueryResult<
  MovieQuery,
  MovieQueryVariables
>;
export const TvDocument = gql`
  query Tv($id: ID, $cursor: String) {
    tv(id: $id) {
      id
      name
      overview
      first_air_date
      poster_path
      backdrop_path
      vote_average
      vote_count
      seasons {
        ...SeasonProps
      }
      watched(cursor: $cursor, filter: "Reviewed") {
        ...WatchedCursorProps
      }
    }
  }
  ${SeasonPropsFragmentDoc}
  ${WatchedCursorPropsFragmentDoc}
`;

/**
 * __useTvQuery__
 *
 * To run a query within a React component, call `useTvQuery` and pass it any options that fit your needs.
 * When your component renders, `useTvQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTvQuery({
 *   variables: {
 *      id: // value for 'id'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useTvQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<TvQuery, TvQueryVariables>,
) {
  return ApolloReactHooks.useQuery<TvQuery, TvQueryVariables>(
    TvDocument,
    baseOptions,
  );
}
export function useTvLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    TvQuery,
    TvQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<TvQuery, TvQueryVariables>(
    TvDocument,
    baseOptions,
  );
}
export type TvQueryHookResult = ReturnType<typeof useTvQuery>;
export type TvLazyQueryHookResult = ReturnType<typeof useTvLazyQuery>;
export type TvQueryResult = ApolloReactCommon.QueryResult<
  TvQuery,
  TvQueryVariables
>;
export const WatchedDocument = gql`
  query Watched($id: ID!) {
    watched(id: $id) {
      ...WatchedProps
    }
  }
  ${WatchedPropsFragmentDoc}
`;

/**
 * __useWatchedQuery__
 *
 * To run a query within a React component, call `useWatchedQuery` and pass it any options that fit your needs.
 * When your component renders, `useWatchedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchedQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWatchedQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    WatchedQuery,
    WatchedQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<WatchedQuery, WatchedQueryVariables>(
    WatchedDocument,
    baseOptions,
  );
}
export function useWatchedLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    WatchedQuery,
    WatchedQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<WatchedQuery, WatchedQueryVariables>(
    WatchedDocument,
    baseOptions,
  );
}
export type WatchedQueryHookResult = ReturnType<typeof useWatchedQuery>;
export type WatchedLazyQueryHookResult = ReturnType<typeof useWatchedLazyQuery>;
export type WatchedQueryResult = ApolloReactCommon.QueryResult<
  WatchedQuery,
  WatchedQueryVariables
>;
export const WatchesDocument = gql`
  query Watches(
    $userId: ID
    $itemId: ID
    $itemType: ItemType
    $cursor: String
    $tvItemId: ID
    $tvItemType: TvItemType
  ) {
    watches(
      userId: $userId
      itemId: $itemId
      itemType: $itemType
      cursor: $cursor
      tvItemId: $tvItemId
      tvItemType: $tvItemType
    ) {
      ...WatchedCursorWithItemsProps
    }
  }
  ${WatchedCursorWithItemsPropsFragmentDoc}
`;

/**
 * __useWatchesQuery__
 *
 * To run a query within a React component, call `useWatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useWatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      itemId: // value for 'itemId'
 *      itemType: // value for 'itemType'
 *      cursor: // value for 'cursor'
 *      tvItemId: // value for 'tvItemId'
 *      tvItemType: // value for 'tvItemType'
 *   },
 * });
 */
export function useWatchesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    WatchesQuery,
    WatchesQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<WatchesQuery, WatchesQueryVariables>(
    WatchesDocument,
    baseOptions,
  );
}
export function useWatchesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    WatchesQuery,
    WatchesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<WatchesQuery, WatchesQueryVariables>(
    WatchesDocument,
    baseOptions,
  );
}
export type WatchesQueryHookResult = ReturnType<typeof useWatchesQuery>;
export type WatchesLazyQueryHookResult = ReturnType<typeof useWatchesLazyQuery>;
export type WatchesQueryResult = ApolloReactCommon.QueryResult<
  WatchesQuery,
  WatchesQueryVariables
>;
export const ReviewsDocument = gql`
  query Reviews(
    $userId: ID
    $itemId: ID
    $itemType: ItemType
    $cursor: String
    $tvItemId: ID
    $tvItemType: TvItemType
  ) {
    reviews(
      userId: $userId
      itemId: $itemId
      itemType: $itemType
      cursor: $cursor
      tvItemId: $tvItemId
      tvItemType: $tvItemType
    ) {
      cursor
      hasMore
      reviews {
        id
        body
        watched {
          id
          createdAt
          rating {
            id
            value
          }
          tvItemType
          tvItem {
            ...WatchedTvItemProps
          }
          user {
            id
            name
          }
        }
      }
    }
  }
  ${WatchedTvItemPropsFragmentDoc}
`;

/**
 * __useReviewsQuery__
 *
 * To run a query within a React component, call `useReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReviewsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      itemId: // value for 'itemId'
 *      itemType: // value for 'itemType'
 *      cursor: // value for 'cursor'
 *      tvItemId: // value for 'tvItemId'
 *      tvItemType: // value for 'tvItemType'
 *   },
 * });
 */
export function useReviewsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ReviewsQuery,
    ReviewsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<ReviewsQuery, ReviewsQueryVariables>(
    ReviewsDocument,
    baseOptions,
  );
}
export function useReviewsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ReviewsQuery,
    ReviewsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<ReviewsQuery, ReviewsQueryVariables>(
    ReviewsDocument,
    baseOptions,
  );
}
export type ReviewsQueryHookResult = ReturnType<typeof useReviewsQuery>;
export type ReviewsLazyQueryHookResult = ReturnType<typeof useReviewsLazyQuery>;
export type ReviewsQueryResult = ApolloReactCommon.QueryResult<
  ReviewsQuery,
  ReviewsQueryVariables
>;
export const SearchContentDocument = gql`
  query SearchContent($title: String!) {
    searchContent(title: $title) {
      id
      tmdbId
      title
      release_date
      type
    }
  }
`;

/**
 * __useSearchContentQuery__
 *
 * To run a query within a React component, call `useSearchContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchContentQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useSearchContentQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SearchContentQuery,
    SearchContentQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    SearchContentQuery,
    SearchContentQueryVariables
  >(SearchContentDocument, baseOptions);
}
export function useSearchContentLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SearchContentQuery,
    SearchContentQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    SearchContentQuery,
    SearchContentQueryVariables
  >(SearchContentDocument, baseOptions);
}
export type SearchContentQueryHookResult = ReturnType<
  typeof useSearchContentQuery
>;
export type SearchContentLazyQueryHookResult = ReturnType<
  typeof useSearchContentLazyQuery
>;
export type SearchContentQueryResult = ApolloReactCommon.QueryResult<
  SearchContentQuery,
  SearchContentQueryVariables
>;
export const AutoTrackedListDocument = gql`
  query AutoTrackedList($userId: ID!, $cursor: String) {
    autoTrackedList(userId: $userId, cursor: $cursor) {
      cursor
      hasMore
      autoTracked {
        id
        itemType
        item {
          ... on Movie {
            id
            title
            release_date
            poster_path
            backdrop_path
          }
          ... on Tv {
            id
            name
            first_air_date
            poster_path
            backdrop_path
          }
        }
        tvItemType
        tvItem {
          ...WatchedTvItemProps
        }
        meta {
          title
          filename
          url
          provider
          tvData {
            season
            episode
          }
        }
        createdAt
      }
    }
  }
  ${WatchedTvItemPropsFragmentDoc}
`;

/**
 * __useAutoTrackedListQuery__
 *
 * To run a query within a React component, call `useAutoTrackedListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAutoTrackedListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAutoTrackedListQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useAutoTrackedListQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AutoTrackedListQuery,
    AutoTrackedListQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    AutoTrackedListQuery,
    AutoTrackedListQueryVariables
  >(AutoTrackedListDocument, baseOptions);
}
export function useAutoTrackedListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AutoTrackedListQuery,
    AutoTrackedListQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    AutoTrackedListQuery,
    AutoTrackedListQueryVariables
  >(AutoTrackedListDocument, baseOptions);
}
export type AutoTrackedListQueryHookResult = ReturnType<
  typeof useAutoTrackedListQuery
>;
export type AutoTrackedListLazyQueryHookResult = ReturnType<
  typeof useAutoTrackedListLazyQuery
>;
export type AutoTrackedListQueryResult = ApolloReactCommon.QueryResult<
  AutoTrackedListQuery,
  AutoTrackedListQueryVariables
>;
export const SeasonsDocument = gql`
  query Seasons($itemId: ID!) {
    seasons(itemId: $itemId) {
      ...SeasonProps
    }
  }
  ${SeasonPropsFragmentDoc}
`;

/**
 * __useSeasonsQuery__
 *
 * To run a query within a React component, call `useSeasonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeasonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeasonsQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useSeasonsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    SeasonsQuery,
    SeasonsQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<SeasonsQuery, SeasonsQueryVariables>(
    SeasonsDocument,
    baseOptions,
  );
}
export function useSeasonsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    SeasonsQuery,
    SeasonsQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<SeasonsQuery, SeasonsQueryVariables>(
    SeasonsDocument,
    baseOptions,
  );
}
export type SeasonsQueryHookResult = ReturnType<typeof useSeasonsQuery>;
export type SeasonsLazyQueryHookResult = ReturnType<typeof useSeasonsLazyQuery>;
export type SeasonsQueryResult = ApolloReactCommon.QueryResult<
  SeasonsQuery,
  SeasonsQueryVariables
>;
