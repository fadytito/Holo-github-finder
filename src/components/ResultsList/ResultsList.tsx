import { useCallback } from 'react';
import Grid from '../../UI/Grid/Grid';
import InfiniteScroll from '../../UI/InifniteScroll/InfiniteScroll';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getResults } from '../../store/actions';
import RepoCard from '../RepoCard/RepoCard';
import UserCard from '../UserCard/UserCard';

function ResultsList() {
  const { items, value, type, page, totalCount, isLoading, error } =
    useAppSelector((state) => state.results);
  const dispatch = useAppDispatch();

  const nextPage = page + 1;

  const memoizedScrollCallback = useCallback(
    () => dispatch(getResults(type, value, nextPage)),
    [type, value, nextPage, dispatch]
  );

  if (!error && !items.length && value && !isLoading && page === 1) {
    return <h3>No results found!</h3>;
  }

  return (
    <InfiniteScroll
      isScrolling={!!items.length && totalCount > items.length && !!value}
      isLoading={isLoading && page > 0}
      isInfinite={page > 3}
      callback={memoizedScrollCallback}
    >
      <>
        {type === 'users' && (
          <Grid items={items} component={UserCard} identifier={'id'} />
        )}
        {type !== 'users' && (
          <Grid items={items} component={RepoCard} identifier={'id'} />
        )}
      </>
    </InfiniteScroll>
  );
}

export default ResultsList;
