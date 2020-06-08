import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { MenuItem, PopoverPosition, Spinner } from '@blueprintjs/core';
import { Suggest, IItemRendererProps } from '@blueprintjs/select';

import { useSearchContentQuery, SearchItem } from '../graphql';
import useThrottle from './useThrottle';

export interface SearchOption {
  label: string;
  value: string | number;
  item: SearchItem;
}

const renderOption = (
  { label, item }: SearchOption,
  { handleClick, modifiers }: IItemRendererProps,
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }

  return (
    <MenuItem
      active={modifiers.active}
      key={item.id}
      text={label}
      onClick={handleClick}
    />
  );
};

const Search: React.FC<{
  selected?: SearchItem;
  setSelected: (item: SearchItem) => void;
}> = ({ selected, setSelected }) => {
  const [query, setQuery] = React.useState('');

  const { callback } = useThrottle(
    (payload: string) => setQuery(payload),
    1000,
  );

  const shouldSearch = query.length > 2;
  const searchQuery = useSearchContentQuery({
    variables: { title: query },
    skip: query.length < 3,
  });
  const options =
    searchQuery.data && searchQuery.data.searchContent
      ? searchQuery.data.searchContent.reduce(
          (acc: SearchOption[], item) =>
            acc.concat({
              label: `${item.title} (${
                (item.release_date || '?').split('-')[0]
              })`,
              value: item.id,
              item,
            }),
          [],
        )
      : [];

  return (
    <Suggest<SearchOption>
      itemRenderer={renderOption}
      items={options}
      onQueryChange={callback}
      onItemSelect={({ item }) => setSelected(item)}
      noResults={
        <MenuItem
          disabled
          text={
            shouldSearch
              ? searchQuery.loading
                ? 'Loading...'
                : 'Got nothing :('
              : 'Type more to start seach'
          }
        />
      }
      initialContent={<MenuItem disabled text="Type more to start seach" />}
      inputValueRenderer={item => item.label}
      popoverProps={{
        minimal: true,
        fill: true,
        usePortal: false,
        position: PopoverPosition.BOTTOM,
      }}
      inputProps={{
        rightElement: searchQuery?.loading ? <Spinner size={16} /> : undefined,
      }}
      className="select-popover-centered"
    />
  );
};

export function SearchPage() {
  const history = useHistory();

  return (
    <Search
      setSelected={({ type, id }) => {
        history.push(`/${type?.toLowerCase()}/${id}`);
      }}
    />
  );
}

export default Search;
