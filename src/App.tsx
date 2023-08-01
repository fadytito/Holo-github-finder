import ResultsList from './components/ResultsList/ResultsList';
import SearchForm from './components/SearchForm/SearchForm';
import { useAppSelector } from './hooks/redux';

function App() {
  const { isLoading, error, page } = useAppSelector((state) => state.results);

  let result;
  if (isLoading && page === 0) {
    result = <h3>Loading...</h3>;
  } else if (error) {
    result = <h3 style={{ color: '#e21e1e' }}>{error}</h3>;
  } else {
    result = <ResultsList />;
  }

  return (
    <div>
      <SearchForm />
      {result}
    </div>
  );
}

export default App;
