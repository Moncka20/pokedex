import { useEffect, useState } from 'react';
import { getPokemonDetails } from '../services/pokemonService';

function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export default function PokemonCard({ pokemonName }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadDetails() {
      try {
        setLoading(true);
        setError(null);
        const data = await getPokemonDetails(pokemonName);
        if (active) setPokemon(data);
      } catch (requestError) {
        if (active) setError(requestError.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDetails();
    return () => {
      active = false;
    };
  }, [pokemonName]);

  if (loading) {
    return <article className="pokemon-card pokemon-card--loading" aria-label="Cargando Pokémon" />;
  }

  if (error || !pokemon) {
    return (
      <article className="pokemon-card pokemon-card--error">
        <span aria-hidden="true">!</span>
        <p>{error || 'No hay información disponible.'}</p>
      </article>
    );
  }

  return (
    <article className="pokemon-card">
      <div className="pokemon-card__number">#{String(pokemon.id).padStart(3, '0')}</div>
      <img
        className="pokemon-card__image"
        src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
        alt={formatName(pokemon.name)}
        loading="lazy"
      />
      <h2>{formatName(pokemon.name)}</h2>
      <div className="pokemon-card__types">
        {pokemon.types.map(({ type }) => (
          <span className={`type-badge type-badge--${type.name}`} key={type.name}>
            {type.name}
          </span>
        ))}
      </div>
      <dl className="pokemon-card__stats">
        <div>
          <dt>HP</dt>
          <dd>{pokemon.stats[0].base_stat}</dd>
        </div>
        <div>
          <dt>Ataque</dt>
          <dd>{pokemon.stats[1].base_stat}</dd>
        </div>
        <div>
          <dt>Altura</dt>
          <dd>{pokemon.height / 10} m</dd>
        </div>
      </dl>
    </article>
  );
}
