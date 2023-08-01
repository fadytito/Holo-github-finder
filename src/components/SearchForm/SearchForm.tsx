import { useEffect } from 'react';
import { SearchType } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { resultsActions } from '../../store/resultsSlice';
import { getResults } from '../../store/actions';
import styles from './SearchForm.module.scss';

function SearchFrom() {
  const { value, type, items, error } = useAppSelector(
    (state) => state.results
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value.length >= 3) {
        dispatch(getResults(type, value, 1));
      } else {
        dispatch(resultsActions.resultsCleared());
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, type, dispatch]);

  const isCentered = !value.length && !error && !items?.length;

  return (
    <div
      className={`${styles['search-form']} ${
        isCentered ? styles['search-form--centered'] : ''
      }`}
    >
      <h1 className={styles['search-form__title']}>GitHub Searcher</h1>
      <h3 className={styles['search-form__desc']}>
        Search users or repositories below
      </h3>
      <form className={styles['search-form__form']}>
        <input
          type='text'
          placeholder='Start typing to search...'
          value={value}
          onChange={(e) =>
            dispatch(resultsActions.valueUpdated(e.target.value))
          }
          className={styles['search-form__text-input']}
        />
        <select
          name='type'
          id='type'
          value={type}
          onChange={(e) =>
            dispatch(resultsActions.typeUpdated(e.target.value as SearchType))
          }
          className={styles['search-form__select-input']}
        >
          <option value={SearchType.users}>Users</option>
          <option value={SearchType.repositories}>Repositories</option>
        </select>
      </form>
    </div>
  );
}

export default SearchFrom;
