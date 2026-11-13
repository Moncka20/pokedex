export default function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar">
      <span className="sr-only">Buscar Pokémon por nombre</span>
      <span className="search-bar__icon" aria-hidden="true">⌕</span>
      <input
        type="search"
        placeholder="Buscar por nombre..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value && (
        <button type="button" className="search-bar__clear" onClick={() => onChange('')} aria-label="Limpiar búsqueda">
          x
        </button>
      )}
    </label>
  );
}
