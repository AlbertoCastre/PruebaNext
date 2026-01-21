import Head from "next/head";

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `http://localhost:3001/api/items/${params.id}`
  );
  const item = await res.json();

  return { props: { item } };
}

export default function Detail({ item }) {
  return (
    <>
      <Head>
        <title>{item.title}</title>
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={item.description} />
        <meta property="og:image" content={item.images[0]} />
      </Head>

      <div className="container my-4">
        <div className="row align-items-center">
          {/* Imagen */}
          <div className="col-12 col-md-6 mb-3 text-center">
            <img
              src={item.images[0]}
              className="img-fluid rounded detail-img"
              alt={item.title}
            />
          </div>

          {/* Detalle */}
          <div className="col-12 col-md-6">
            <h2>{item.title}</h2>
            <p className="text-muted">{item.category}</p>

            <h4 className="text-success mb-3">
              ${item.price}
            </h4>

            <h5>Marca: {item.brand}</h5>
            <p className="mt-3">{item.description}</p>
            <p>⭐ {item.rating}</p>

            <button className="btn btn-success mt-3">
              Comprar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
