export async function getServerSideProps({ query }) {
  // 1. Usamos la variable de entorno que pusiste en Vercel
  // 2. Si no existe (en local), usa localhost
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  
  try {
    const res = await fetch(
      `${baseUrl}/api/items?q=${query.search || ""}`
    );
    const data = await res.json();

    return {
      props: {
        items: data.items || [],
        search: query.search || "",
      },
    };
  } catch (error) {
    console.error("Error cargando productos:", error);
    return {
      props: {
        items: [],
        search: query.search || "",
      },
    };
  }
}

export default function Results({ items, search }) {
  // Si items no existe o está vacío
  if (!items || items.length === 0) {
    return (
      <div className="container my-4">
        <h4>No se encontraron resultados para "{search}"</h4>
        <a href="/" className="btn btn-primary mt-3">Volver al inicio</a>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h4 className="mb-3">
        {items.length} Resultados para "{search}"
      </h4>

      <div className="row g-3">
        {items.map((item) => (
          <div className="col-12 col-sm-6 col-md-4" key={item.id}>
            <div className="card h-100">
              <img
                src={item.images && item.images[0]}
                className="card-img-top card-img-fixed"
                alt={item.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">${item.price}</p>

                <a
                  href={`/items/${item.id}`}
                  className="btn btn-outline-primary mt-auto"
                >
                  Ver detalle
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}