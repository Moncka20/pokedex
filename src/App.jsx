import { useEffect, useMemo, useState } from 'react';
import { getPokemonList } from './services/pokemonService';
import LoadingGrid from './components/LoadingGrid';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';

const PAGE_SIZE = 24;

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchPokemons() {
    try {
      setLoading(true);
      setError(null);
      const data = await getPokemonList(PAGE_SIZE);
      setPokemonList(data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPokemons();
  }, []);

  const filteredPokemons = useMemo(
    () => pokemonList.filter(({ name }) => name.toLowerCase().includes(search.trim().toLowerCase())),
    [pokemonList, search],
  );

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero__content">
          <div className="brand-mark" aria-hidden="true">
            <span />
          </div>
          <h1>Pokédex</h1>
        </div>
        <div className="hero__orb hero__orb--one" aria-hidden="true" />
        <div className="hero__orb hero__orb--two" aria-hidden="true" />
      </header>

      <main className="content">
        <section className="toolbar" aria-label="Controles del catálogo">
          <div>
            <p className="section-kicker">Catálogo</p>
          </div>
          <SearchBar value={search} onChange={setSearch} />
        </section>

        {loading && <LoadingGrid count={8} />}

        {!loading && error && (
          <section className="state-message state-message--error" role="alert">
            <span className="state-message__icon" aria-hidden="true">!</span>
            <h2>Algo salió mal</h2>
            <p>{error}</p>
            <button type="button" className="button" onClick={fetchPokemons}>Intentar de nuevo</button>
          </section>
        )}

        {!loading && !error && (
          filteredPokemons.length > 0 ? (
            <div className="pokemon-grid">
              {filteredPokemons.map(({ name }) => (
                <PokemonCard key={name} pokemonName={name} />
              ))}
            </div>
          ) : (
            <section className="state-message">
              <span className="state-message__icon" aria-hidden="true">?</span>
              <h2>No encontramos resultados</h2>
              <p>Prueba con otro nombre para continuar explorando.</p>
            </section>
          )
        )}
      </main>
    </div>
  );
}
