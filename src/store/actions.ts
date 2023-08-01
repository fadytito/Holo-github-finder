import { AppDispatch, RootState } from '.';
import { SearchType } from '../constants';
import { resultsActions } from './resultsSlice';

export const getResults = (type: SearchType, value: string, page: number) => {
  const cache_key = `${type}?q=${value}&page=${page}`;
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/search/${cache_key}`
        );
        if (!response.ok) {
          throw new Error('Could not get the results!');
        }
        return response.json();
      } catch {
        dispatch(resultsActions.errorReceived('Could not get the results!'));
      }
    };

    const cachedResults = getState().results.cache[cache_key];

    let items, totalCount;

    if (cachedResults) {
      items = cachedResults.items;
      totalCount = cachedResults.totalCount;
    } else {
      dispatch(resultsActions.fetchStarted());
      const results = await fetchResults();
      items = results.items;
      totalCount = results.total_count;
      dispatch(
        resultsActions.cacheUpdated({
          cache_key,
          response: { items, totalCount },
        })
      );
    }

    dispatch(
      resultsActions.resultsUpdated({
        items,
        totalCount,
        page,
      })
    );
  };
};
