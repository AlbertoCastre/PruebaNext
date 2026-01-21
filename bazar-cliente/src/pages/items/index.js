export async function getServerSideProps({ query }) {
  const res = await fetch(
    `http://localhost:3001/api/items?q=${query.search || ""}`,
  );
  const data = await res.json();

  return {
    props: {
      items: data.items,
      search: query.search || "",
    },
  };
}

export default function Results({ items, search }) {
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
                src={item.images[0]}
                className="card-img-top card-img-fixed"
                alt={item.title}
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
