export default function LoadingGrid({ count = 8 }) {
  return (
    <div className="pokemon-grid" aria-label="Cargando catálogo" aria-busy="true">
      {Array.from({ length: count }, (_, index) => (
        <article className="pokemon-card pokemon-card--loading" key={index} />
      ))}
    </div>
  );
}
