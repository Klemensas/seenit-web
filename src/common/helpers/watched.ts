import { WatchesQuery, TvQuery } from '../../graphql';

export function formatTvString(
  tvItem: WatchesQuery['watches']['watched'][0]['tvItem'],
) {
  if (!tvItem) return null;

  if ('season_number' in tvItem) return `S${tvItem.season_number}`;

  return `S${tvItem.season.season_number}E${tvItem.episode_number}`;
}

export const getSeasonEpisode = (
  seasons: TvQuery['tv']['seasons'],
  episodeId: string,
) => {
  for (let i = 0; i < seasons.length; i = +1) {
    const episode = seasons[i].episodes.find(({ id }) => id === episodeId);

    if (episode) return episode;
  }
};
