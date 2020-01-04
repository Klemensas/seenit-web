import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};



export type Author = {
   __typename?: 'Author',
  id?: Maybe<Scalars['Int']>,
  credit_id?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  gender?: Maybe<Scalars['Int']>,
  profile_path?: Maybe<Scalars['String']>,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Collection = {
   __typename?: 'Collection',
  id?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  poster_path?: Maybe<Scalars['String']>,
  backdrop_path?: Maybe<Scalars['String']>,
};

export type Company = {
   __typename?: 'Company',
  id?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  logo_path?: Maybe<Scalars['String']>,
  origin_country?: Maybe<Scalars['String']>,
};

export type Country = {
   __typename?: 'Country',
  iso_3166_1?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type Episode = {
   __typename?: 'Episode',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  episode_number?: Maybe<Scalars['Int']>,
  air_date?: Maybe<Scalars['String']>,
  production_code?: Maybe<Scalars['String']>,
  still_path?: Maybe<Scalars['String']>,
  vote_average?: Maybe<Scalars['Float']>,
  vote_count?: Maybe<Scalars['Int']>,
  tmdbId?: Maybe<Scalars['Int']>,
  seasonId?: Maybe<Scalars['ID']>,
  season?: Maybe<Array<Maybe<Season>>>,
};

export type Genre = {
   __typename?: 'Genre',
  id?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
};

export type Item = Movie | Tv;

export enum ItemType {
  Movie = 'Movie',
  Tv = 'Tv'
}

export type Language = {
   __typename?: 'Language',
  iso_639_1?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type LocalAuth = {
   __typename?: 'LocalAuth',
  user: User,
  token: Scalars['String'],
};

export type Movie = {
   __typename?: 'Movie',
  id: Scalars['ID'],
  adult: Scalars['Boolean'],
  backdrop_path: Scalars['String'],
  belongs_to_collection?: Maybe<Collection>,
  budget: Scalars['Int'],
  genre?: Maybe<Array<Maybe<Genre>>>,
  homepage?: Maybe<Scalars['String']>,
  imdb_id?: Maybe<Scalars['String']>,
  original_language?: Maybe<Scalars['String']>,
  original_title?: Maybe<Scalars['String']>,
  overview: Scalars['String'],
  popularity?: Maybe<Scalars['Float']>,
  poster_path: Scalars['String'],
  production_companies?: Maybe<Array<Maybe<Company>>>,
  production_countries?: Maybe<Array<Maybe<Country>>>,
  release_date: Scalars['String'],
  revenue?: Maybe<Scalars['Int']>,
  runtime?: Maybe<Scalars['Int']>,
  spoken_languages?: Maybe<Array<Maybe<Language>>>,
  status?: Maybe<Scalars['String']>,
  tagline?: Maybe<Scalars['String']>,
  title: Scalars['String'],
  video?: Maybe<Scalars['Boolean']>,
  vote_average: Scalars['Float'],
  vote_count: Scalars['Int'],
  tmdbId?: Maybe<Scalars['Int']>,
  watched: WatchedCursor,
};


export type MovieWatchedArgs = {
  cursor?: Maybe<Scalars['String']>,
  filter?: Maybe<Scalars['String']>
};

export type Mutation = {
   __typename?: 'Mutation',
  _?: Maybe<Scalars['Boolean']>,
  addWatched: Watched,
  register: LocalAuth,
  login: LocalAuth,
  setIsLoggedIn: Scalars['Boolean'],
  setUserData: User,
};


export type MutationAddWatchedArgs = {
  itemId: Scalars['ID'],
  mediaType: TmdbMediaType,
  rating?: Maybe<RatingInput>,
  review?: Maybe<ReviewInput>,
  tvData?: Maybe<TvDataInput>,
  createdAt?: Maybe<Scalars['Float']>
};


export type MutationRegisterArgs = {
  name: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationSetIsLoggedInArgs = {
  isLoggedIn: Scalars['Boolean']
};


export type MutationSetUserDataArgs = {
  userData: UserInput
};

export type Network = {
   __typename?: 'Network',
  id?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  logo_path?: Maybe<Scalars['String']>,
  origin_country?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  _?: Maybe<Scalars['Boolean']>,
  movie?: Maybe<Movie>,
  tv?: Maybe<Tv>,
  season?: Maybe<Season>,
  episode?: Maybe<Episode>,
  allWatched?: Maybe<Array<Watched>>,
  watched: Watched,
  users?: Maybe<Array<User>>,
  user: User,
  me: User,
  searchContent: Array<SearchItem>,
  isLoggedIn: Scalars['Boolean'],
  userData: User,
};


export type QueryMovieArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryTvArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QuerySeasonArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryEpisodeArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryWatchedArgs = {
  id: Scalars['ID']
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>
};


export type QuerySearchContentArgs = {
  title: Scalars['String']
};

export type Rating = {
   __typename?: 'Rating',
  id: Scalars['ID'],
  value: Scalars['Float'],
  tmdbId: Scalars['Int'],
  userId: Scalars['ID'],
  createdAt: Scalars['Float'],
  updatedAt: Scalars['Float'],
  user?: Maybe<User>,
  watched?: Maybe<Watched>,
  tvData?: Maybe<TvData>,
};

export type RatingInput = {
  value: Scalars['Float'],
};

export type Review = {
   __typename?: 'Review',
  id: Scalars['ID'],
  body: Scalars['String'],
  tmdbId: Scalars['Int'],
  userId: Scalars['ID'],
  user?: Maybe<User>,
  watched?: Maybe<Watched>,
  tvData?: Maybe<TvData>,
};

export type ReviewInput = {
  body: Scalars['String'],
};

export type Search = {
   __typename?: 'Search',
  results?: Maybe<Array<TmdbMedia>>,
  page: Scalars['Int'],
  total_pages: Scalars['Int'],
  total_results: Scalars['Int'],
};

export type SearchItem = {
   __typename?: 'SearchItem',
  id: Scalars['String'],
  tmdbId: Scalars['Int'],
  title: Scalars['String'],
  release_date?: Maybe<Scalars['String']>,
  type?: Maybe<TmdbMediaType>,
};

export type Season = {
   __typename?: 'Season',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  air_date?: Maybe<Scalars['String']>,
  episode_count?: Maybe<Scalars['Int']>,
  poster_path?: Maybe<Scalars['String']>,
  season_number?: Maybe<Scalars['Int']>,
  tmdbId?: Maybe<Scalars['Int']>,
  tvId?: Maybe<Scalars['ID']>,
  tv?: Maybe<Tv>,
  episodes?: Maybe<Array<Maybe<Episode>>>,
};

export type Subscription = {
   __typename?: 'Subscription',
  _?: Maybe<Scalars['Boolean']>,
};

export type TmdbMedia = TmdbMovie | TmdbTv;

export enum TmdbMediaType {
  Movie = 'Movie',
  Tv = 'Tv'
}

export type TmdbMovie = {
   __typename?: 'TmdbMovie',
  id?: Maybe<Scalars['Int']>,
  title?: Maybe<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  original_title?: Maybe<Scalars['String']>,
  original_language?: Maybe<Scalars['String']>,
  poster_path?: Maybe<Scalars['String']>,
  genre_ids?: Maybe<Array<Maybe<Scalars['Int']>>>,
  adult?: Maybe<Scalars['Boolean']>,
  release_date?: Maybe<Scalars['String']>,
  backdrop_path?: Maybe<Scalars['String']>,
  video?: Maybe<Scalars['Boolean']>,
  vote_count?: Maybe<Scalars['Int']>,
  vote_average?: Maybe<Scalars['Float']>,
  popularity?: Maybe<Scalars['Int']>,
  media_type?: Maybe<TmdbMediaType>,
};

export type TmdbPerson = {
   __typename?: 'TmdbPerson',
  popularity?: Maybe<Scalars['Int']>,
  id?: Maybe<Scalars['Int']>,
  vote_average?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  profile_path?: Maybe<Scalars['String']>,
  adult?: Maybe<Scalars['String']>,
  known_for?: Maybe<TmdbMedia>,
  media_type?: Maybe<TmdbMediaType>,
};

export type TmdbTv = {
   __typename?: 'TmdbTv',
  id?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  overview?: Maybe<Scalars['String']>,
  original_name?: Maybe<Scalars['String']>,
  original_language?: Maybe<Scalars['String']>,
  poster_path?: Maybe<Scalars['String']>,
  genre_ids?: Maybe<Array<Maybe<Scalars['Int']>>>,
  backdrop_path?: Maybe<Scalars['String']>,
  first_air_date?: Maybe<Scalars['String']>,
  origin_country?: Maybe<Array<Maybe<Scalars['String']>>>,
  vote_count?: Maybe<Scalars['Int']>,
  vote_average?: Maybe<Scalars['Float']>,
  popularity?: Maybe<Scalars['Int']>,
  media_type?: Maybe<TmdbMediaType>,
};

export type Tv = {
   __typename?: 'Tv',
  id: Scalars['ID'],
  backdrop_path: Scalars['String'],
  created_by?: Maybe<Array<Maybe<Author>>>,
  episode_run_time?: Maybe<Array<Maybe<Scalars['Int']>>>,
  first_air_date: Scalars['String'],
  genres?: Maybe<Array<Maybe<Genre>>>,
  homepage?: Maybe<Scalars['String']>,
  in_production?: Maybe<Scalars['Boolean']>,
  languages?: Maybe<Array<Maybe<Scalars['String']>>>,
  last_air_date?: Maybe<Scalars['String']>,
  last_episode_to_air?: Maybe<Episode>,
  name: Scalars['String'],
  next_episode_to_air?: Maybe<Episode>,
  networks?: Maybe<Array<Maybe<Network>>>,
  number_of_episodes?: Maybe<Scalars['Int']>,
  number_of_seasons?: Maybe<Scalars['Int']>,
  origin_country?: Maybe<Array<Maybe<Scalars['String']>>>,
  original_language?: Maybe<Scalars['String']>,
  original_name?: Maybe<Scalars['String']>,
  overview: Scalars['String'],
  popularity?: Maybe<Scalars['Int']>,
  poster_path: Scalars['String'],
  production_companies?: Maybe<Array<Maybe<Company>>>,
  seasons?: Maybe<Array<Maybe<Season>>>,
  status?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  vote_average: Scalars['Float'],
  vote_count: Scalars['Int'],
  tmdbId?: Maybe<Scalars['Int']>,
  season: Array<Maybe<Season>>,
  watched: Array<Maybe<Watched>>,
};

export type TvData = {
   __typename?: 'TvData',
  season?: Maybe<Scalars['Int']>,
  episode?: Maybe<Scalars['Int']>,
};

export type TvDataInput = {
  episode?: Maybe<Scalars['Int']>,
  season?: Maybe<Scalars['Int']>,
};


export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  createdAt: Scalars['Float'],
  updatedAt: Scalars['Float'],
  watched: WatchedCursor,
};


export type UserWatchedArgs = {
  cursor?: Maybe<Scalars['String']>
};

export type UserInput = {
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  updatedAt?: Maybe<Scalars['Float']>,
};

export type Watched = {
   __typename?: 'Watched',
  id: Scalars['ID'],
  tmdbId: Scalars['Int'],
  createdAt: Scalars['Float'],
  updatedAt: Scalars['Float'],
  userId: Scalars['ID'],
  user: User,
  itemType: ItemType,
  item: Item,
  rating?: Maybe<Rating>,
  review?: Maybe<Review>,
  tvData?: Maybe<TvData>,
};

export type WatchedCursor = {
   __typename?: 'WatchedCursor',
  watched: Array<Watched>,
  cursor?: Maybe<Scalars['String']>,
  filter?: Maybe<WatchedFilter>,
  hasMore: Scalars['Boolean'],
};

export enum WatchedFilter {
  Reviewed = 'Reviewed'
}

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LocalAuth' }
    & Pick<LocalAuth, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'>
    ) }
  ) }
);

export type RegisterMutationVariables = {
  name: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String']
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'LocalAuth' }
    & Pick<LocalAuth, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'>
    ) }
  ) }
);

export type SetIsLoggedInMutationVariables = {
  isLoggedIn: Scalars['Boolean']
};


export type SetIsLoggedInMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'setIsLoggedIn'>
);

export type SetUserDataMutationVariables = {
  userData: UserInput
};


export type SetUserDataMutation = (
  { __typename?: 'Mutation' }
  & { setUserData: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'createdAt'>
  ) }
);

export type IsUserLoggedInQueryVariables = {};


export type IsUserLoggedInQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isLoggedIn'>
);

export type UserDataQueryVariables = {};


export type UserDataQuery = (
  { __typename?: 'Query' }
  & { userData: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'createdAt'>
  ) }
);

export type UserQueryVariables = {
  name?: Maybe<Scalars['String']>,
  id?: Maybe<Scalars['ID']>,
  cursor?: Maybe<Scalars['String']>
};


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'createdAt'>
    & { watched: (
      { __typename?: 'WatchedCursor' }
      & Pick<WatchedCursor, 'cursor' | 'hasMore'>
      & { watched: Array<(
        { __typename?: 'Watched' }
        & Pick<Watched, 'id' | 'createdAt' | 'userId' | 'itemType'>
        & { rating: Maybe<(
          { __typename?: 'Rating' }
          & Pick<Rating, 'value'>
        )>, review: Maybe<(
          { __typename?: 'Review' }
          & Pick<Review, 'body'>
        )>, tvData: Maybe<(
          { __typename?: 'TvData' }
          & Pick<TvData, 'season' | 'episode'>
        )>, item: (
          { __typename?: 'Movie' }
          & Pick<Movie, 'id' | 'title' | 'release_date' | 'poster_path' | 'backdrop_path'>
        ) | (
          { __typename?: 'Tv' }
          & Pick<Tv, 'id' | 'name' | 'first_air_date' | 'poster_path' | 'backdrop_path'>
        ) }
      )> }
    ) }
  ) }
);

export type MovieQueryVariables = {
  id?: Maybe<Scalars['ID']>,
  cursor?: Maybe<Scalars['String']>
};


export type MovieQuery = (
  { __typename?: 'Query' }
  & { movie: Maybe<(
    { __typename?: 'Movie' }
    & Pick<Movie, 'id' | 'title' | 'overview' | 'release_date' | 'poster_path' | 'backdrop_path' | 'vote_average' | 'vote_count'>
    & { watched: (
      { __typename?: 'WatchedCursor' }
      & Pick<WatchedCursor, 'cursor' | 'hasMore' | 'filter'>
      & { watched: Array<(
        { __typename?: 'Watched' }
        & Pick<Watched, 'id' | 'createdAt'>
        & { tvData: Maybe<(
          { __typename?: 'TvData' }
          & Pick<TvData, 'season' | 'episode'>
        )>, rating: Maybe<(
          { __typename?: 'Rating' }
          & Pick<Rating, 'value'>
        )>, review: Maybe<(
          { __typename?: 'Review' }
          & Pick<Review, 'body'>
        )>, user: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'name'>
        ) }
      )> }
    ) }
  )> }
);

export type WatchedQueryVariables = {
  id: Scalars['ID']
};


export type WatchedQuery = (
  { __typename?: 'Query' }
  & { watched: (
    { __typename?: 'Watched' }
    & Pick<Watched, 'id' | 'createdAt'>
    & { tvData: Maybe<(
      { __typename?: 'TvData' }
      & Pick<TvData, 'season' | 'episode'>
    )>, rating: Maybe<(
      { __typename?: 'Rating' }
      & Pick<Rating, 'value'>
    )>, review: Maybe<(
      { __typename?: 'Review' }
      & Pick<Review, 'body'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  ) }
);

export type SearchContentQueryVariables = {
  title: Scalars['String']
};


export type SearchContentQuery = (
  { __typename?: 'Query' }
  & { searchContent: Array<(
    { __typename?: 'SearchItem' }
    & Pick<SearchItem, 'id' | 'tmdbId' | 'title' | 'release_date' | 'type'>
  )> }
);


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
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LoginMutation, LoginMutationVariables> | TChildProps;
export function withLogin<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};

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
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;
export type RegisterComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterMutation, RegisterMutationVariables>, 'mutation'>;

    export const RegisterComponent = (props: RegisterComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables> mutation={RegisterDocument} {...props} />
    );
    
export type RegisterProps<TChildProps = {}> = ApolloReactHoc.MutateProps<RegisterMutation, RegisterMutationVariables> | TChildProps;
export function withRegister<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RegisterMutation,
  RegisterMutationVariables,
  RegisterProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, RegisterMutation, RegisterMutationVariables, RegisterProps<TChildProps>>(RegisterDocument, {
      alias: 'register',
      ...operationOptions
    });
};

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
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SetIsLoggedInDocument = gql`
    mutation SetIsLoggedIn($isLoggedIn: Boolean!) {
  setIsLoggedIn(isLoggedIn: $isLoggedIn) @client
}
    `;
export type SetIsLoggedInMutationFn = ApolloReactCommon.MutationFunction<SetIsLoggedInMutation, SetIsLoggedInMutationVariables>;
export type SetIsLoggedInComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SetIsLoggedInMutation, SetIsLoggedInMutationVariables>, 'mutation'>;

    export const SetIsLoggedInComponent = (props: SetIsLoggedInComponentProps) => (
      <ApolloReactComponents.Mutation<SetIsLoggedInMutation, SetIsLoggedInMutationVariables> mutation={SetIsLoggedInDocument} {...props} />
    );
    
export type SetIsLoggedInProps<TChildProps = {}> = ApolloReactHoc.MutateProps<SetIsLoggedInMutation, SetIsLoggedInMutationVariables> | TChildProps;
export function withSetIsLoggedIn<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SetIsLoggedInMutation,
  SetIsLoggedInMutationVariables,
  SetIsLoggedInProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, SetIsLoggedInMutation, SetIsLoggedInMutationVariables, SetIsLoggedInProps<TChildProps>>(SetIsLoggedInDocument, {
      alias: 'setIsLoggedIn',
      ...operationOptions
    });
};

/**
 * __useSetIsLoggedInMutation__
 *
 * To run a mutation, you first call `useSetIsLoggedInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetIsLoggedInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setIsLoggedInMutation, { data, loading, error }] = useSetIsLoggedInMutation({
 *   variables: {
 *      isLoggedIn: // value for 'isLoggedIn'
 *   },
 * });
 */
export function useSetIsLoggedInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetIsLoggedInMutation, SetIsLoggedInMutationVariables>) {
        return ApolloReactHooks.useMutation<SetIsLoggedInMutation, SetIsLoggedInMutationVariables>(SetIsLoggedInDocument, baseOptions);
      }
export type SetIsLoggedInMutationHookResult = ReturnType<typeof useSetIsLoggedInMutation>;
export type SetIsLoggedInMutationResult = ApolloReactCommon.MutationResult<SetIsLoggedInMutation>;
export type SetIsLoggedInMutationOptions = ApolloReactCommon.BaseMutationOptions<SetIsLoggedInMutation, SetIsLoggedInMutationVariables>;
export const SetUserDataDocument = gql`
    mutation SetUserData($userData: UserInput!) {
  setUserData(userData: $userData) @client {
    id
    name
    email
    createdAt
  }
}
    `;
export type SetUserDataMutationFn = ApolloReactCommon.MutationFunction<SetUserDataMutation, SetUserDataMutationVariables>;
export type SetUserDataComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SetUserDataMutation, SetUserDataMutationVariables>, 'mutation'>;

    export const SetUserDataComponent = (props: SetUserDataComponentProps) => (
      <ApolloReactComponents.Mutation<SetUserDataMutation, SetUserDataMutationVariables> mutation={SetUserDataDocument} {...props} />
    );
    
export type SetUserDataProps<TChildProps = {}> = ApolloReactHoc.MutateProps<SetUserDataMutation, SetUserDataMutationVariables> | TChildProps;
export function withSetUserData<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SetUserDataMutation,
  SetUserDataMutationVariables,
  SetUserDataProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, SetUserDataMutation, SetUserDataMutationVariables, SetUserDataProps<TChildProps>>(SetUserDataDocument, {
      alias: 'setUserData',
      ...operationOptions
    });
};

/**
 * __useSetUserDataMutation__
 *
 * To run a mutation, you first call `useSetUserDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserDataMutation, { data, loading, error }] = useSetUserDataMutation({
 *   variables: {
 *      userData: // value for 'userData'
 *   },
 * });
 */
export function useSetUserDataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetUserDataMutation, SetUserDataMutationVariables>) {
        return ApolloReactHooks.useMutation<SetUserDataMutation, SetUserDataMutationVariables>(SetUserDataDocument, baseOptions);
      }
export type SetUserDataMutationHookResult = ReturnType<typeof useSetUserDataMutation>;
export type SetUserDataMutationResult = ApolloReactCommon.MutationResult<SetUserDataMutation>;
export type SetUserDataMutationOptions = ApolloReactCommon.BaseMutationOptions<SetUserDataMutation, SetUserDataMutationVariables>;
export const IsUserLoggedInDocument = gql`
    query IsUserLoggedIn {
  isLoggedIn @client
}
    `;
export type IsUserLoggedInComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>, 'query'>;

    export const IsUserLoggedInComponent = (props: IsUserLoggedInComponentProps) => (
      <ApolloReactComponents.Query<IsUserLoggedInQuery, IsUserLoggedInQueryVariables> query={IsUserLoggedInDocument} {...props} />
    );
    
export type IsUserLoggedInProps<TChildProps = {}> = ApolloReactHoc.DataProps<IsUserLoggedInQuery, IsUserLoggedInQueryVariables> | TChildProps;
export function withIsUserLoggedIn<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  IsUserLoggedInQuery,
  IsUserLoggedInQueryVariables,
  IsUserLoggedInProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, IsUserLoggedInQuery, IsUserLoggedInQueryVariables, IsUserLoggedInProps<TChildProps>>(IsUserLoggedInDocument, {
      alias: 'isUserLoggedIn',
      ...operationOptions
    });
};

/**
 * __useIsUserLoggedInQuery__
 *
 * To run a query within a React component, call `useIsUserLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUserLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUserLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsUserLoggedInQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>) {
        return ApolloReactHooks.useQuery<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>(IsUserLoggedInDocument, baseOptions);
      }
export function useIsUserLoggedInLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>(IsUserLoggedInDocument, baseOptions);
        }
export type IsUserLoggedInQueryHookResult = ReturnType<typeof useIsUserLoggedInQuery>;
export type IsUserLoggedInLazyQueryHookResult = ReturnType<typeof useIsUserLoggedInLazyQuery>;
export type IsUserLoggedInQueryResult = ApolloReactCommon.QueryResult<IsUserLoggedInQuery, IsUserLoggedInQueryVariables>;
export const UserDataDocument = gql`
    query UserData {
  userData @client {
    id
    name
    email
    createdAt
  }
}
    `;
export type UserDataComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<UserDataQuery, UserDataQueryVariables>, 'query'>;

    export const UserDataComponent = (props: UserDataComponentProps) => (
      <ApolloReactComponents.Query<UserDataQuery, UserDataQueryVariables> query={UserDataDocument} {...props} />
    );
    
export type UserDataProps<TChildProps = {}> = ApolloReactHoc.DataProps<UserDataQuery, UserDataQueryVariables> | TChildProps;
export function withUserData<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UserDataQuery,
  UserDataQueryVariables,
  UserDataProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, UserDataQuery, UserDataQueryVariables, UserDataProps<TChildProps>>(UserDataDocument, {
      alias: 'userData',
      ...operationOptions
    });
};

/**
 * __useUserDataQuery__
 *
 * To run a query within a React component, call `useUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserDataQuery, UserDataQueryVariables>) {
        return ApolloReactHooks.useQuery<UserDataQuery, UserDataQueryVariables>(UserDataDocument, baseOptions);
      }
export function useUserDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserDataQuery, UserDataQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserDataQuery, UserDataQueryVariables>(UserDataDocument, baseOptions);
        }
export type UserDataQueryHookResult = ReturnType<typeof useUserDataQuery>;
export type UserDataLazyQueryHookResult = ReturnType<typeof useUserDataLazyQuery>;
export type UserDataQueryResult = ApolloReactCommon.QueryResult<UserDataQuery, UserDataQueryVariables>;
export const UserDocument = gql`
    query User($name: String, $id: ID, $cursor: String) {
  user(name: $name, id: $id) {
    id
    name
    createdAt
    watched(cursor: $cursor) {
      cursor
      hasMore
      watched {
        id
        createdAt
        userId
        rating {
          value
        }
        review {
          body
        }
        tvData {
          season
          episode
        }
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
    }
  }
}
    `;
export type UserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<UserQuery, UserQueryVariables>, 'query'>;

    export const UserComponent = (props: UserComponentProps) => (
      <ApolloReactComponents.Query<UserQuery, UserQueryVariables> query={UserDocument} {...props} />
    );
    
export type UserProps<TChildProps = {}> = ApolloReactHoc.DataProps<UserQuery, UserQueryVariables> | TChildProps;
export function withUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UserQuery,
  UserQueryVariables,
  UserProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, UserQuery, UserQueryVariables, UserProps<TChildProps>>(UserDocument, {
      alias: 'user',
      ...operationOptions
    });
};

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
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;
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
      cursor
      hasMore
      filter
      watched {
        id
        createdAt
        tvData {
          season
          episode
        }
        rating {
          value
        }
        review {
          body
        }
        user {
          id
          name
        }
      }
    }
  }
}
    `;
export type MovieComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MovieQuery, MovieQueryVariables>, 'query'>;

    export const MovieComponent = (props: MovieComponentProps) => (
      <ApolloReactComponents.Query<MovieQuery, MovieQueryVariables> query={MovieDocument} {...props} />
    );
    
export type MovieProps<TChildProps = {}> = ApolloReactHoc.DataProps<MovieQuery, MovieQueryVariables> | TChildProps;
export function withMovie<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MovieQuery,
  MovieQueryVariables,
  MovieProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, MovieQuery, MovieQueryVariables, MovieProps<TChildProps>>(MovieDocument, {
      alias: 'movie',
      ...operationOptions
    });
};

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
export function useMovieQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MovieQuery, MovieQueryVariables>) {
        return ApolloReactHooks.useQuery<MovieQuery, MovieQueryVariables>(MovieDocument, baseOptions);
      }
export function useMovieLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MovieQuery, MovieQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MovieQuery, MovieQueryVariables>(MovieDocument, baseOptions);
        }
export type MovieQueryHookResult = ReturnType<typeof useMovieQuery>;
export type MovieLazyQueryHookResult = ReturnType<typeof useMovieLazyQuery>;
export type MovieQueryResult = ApolloReactCommon.QueryResult<MovieQuery, MovieQueryVariables>;
export const WatchedDocument = gql`
    query Watched($id: ID!) {
  watched(id: $id) {
    id
    createdAt
    tvData {
      season
      episode
    }
    rating {
      value
    }
    review {
      body
    }
    user {
      id
      name
    }
  }
}
    `;
export type WatchedComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<WatchedQuery, WatchedQueryVariables>, 'query'> & ({ variables: WatchedQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const WatchedComponent = (props: WatchedComponentProps) => (
      <ApolloReactComponents.Query<WatchedQuery, WatchedQueryVariables> query={WatchedDocument} {...props} />
    );
    
export type WatchedProps<TChildProps = {}> = ApolloReactHoc.DataProps<WatchedQuery, WatchedQueryVariables> | TChildProps;
export function withWatched<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  WatchedQuery,
  WatchedQueryVariables,
  WatchedProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, WatchedQuery, WatchedQueryVariables, WatchedProps<TChildProps>>(WatchedDocument, {
      alias: 'watched',
      ...operationOptions
    });
};

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
export function useWatchedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WatchedQuery, WatchedQueryVariables>) {
        return ApolloReactHooks.useQuery<WatchedQuery, WatchedQueryVariables>(WatchedDocument, baseOptions);
      }
export function useWatchedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WatchedQuery, WatchedQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WatchedQuery, WatchedQueryVariables>(WatchedDocument, baseOptions);
        }
export type WatchedQueryHookResult = ReturnType<typeof useWatchedQuery>;
export type WatchedLazyQueryHookResult = ReturnType<typeof useWatchedLazyQuery>;
export type WatchedQueryResult = ApolloReactCommon.QueryResult<WatchedQuery, WatchedQueryVariables>;
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
export type SearchContentComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<SearchContentQuery, SearchContentQueryVariables>, 'query'> & ({ variables: SearchContentQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const SearchContentComponent = (props: SearchContentComponentProps) => (
      <ApolloReactComponents.Query<SearchContentQuery, SearchContentQueryVariables> query={SearchContentDocument} {...props} />
    );
    
export type SearchContentProps<TChildProps = {}> = ApolloReactHoc.DataProps<SearchContentQuery, SearchContentQueryVariables> | TChildProps;
export function withSearchContent<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SearchContentQuery,
  SearchContentQueryVariables,
  SearchContentProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, SearchContentQuery, SearchContentQueryVariables, SearchContentProps<TChildProps>>(SearchContentDocument, {
      alias: 'searchContent',
      ...operationOptions
    });
};

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
export function useSearchContentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchContentQuery, SearchContentQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchContentQuery, SearchContentQueryVariables>(SearchContentDocument, baseOptions);
      }
export function useSearchContentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchContentQuery, SearchContentQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchContentQuery, SearchContentQueryVariables>(SearchContentDocument, baseOptions);
        }
export type SearchContentQueryHookResult = ReturnType<typeof useSearchContentQuery>;
export type SearchContentLazyQueryHookResult = ReturnType<typeof useSearchContentLazyQuery>;
export type SearchContentQueryResult = ApolloReactCommon.QueryResult<SearchContentQuery, SearchContentQueryVariables>;