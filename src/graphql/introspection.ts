export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}

const result: PossibleTypesResultData = {
  possibleTypes: {
    Item: ['Movie', 'Tv'],
    TmdbMedia: ['TmdbMovie', 'TmdbTv'],
  },
};

export default result;
