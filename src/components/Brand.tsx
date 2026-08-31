export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <span
      className={`brand ${inverse ? "brand--inverse" : ""}`}
      aria-label="VS Odonto"
    >
      <span className="brand__mark" aria-hidden="true">
        VS
      </span>
      <span className="brand__words">
        <b>Dr. Vinicius</b>
        <small>Odontologia Planejada</small>
      </span>
    </span>
  );
}
