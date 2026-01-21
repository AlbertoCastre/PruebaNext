import Head from "next/head";

export async function getServerSideProps({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  
  try {
    const res = await fetch(`${baseUrl}/api/items/${params.id}`);
    const item = await res.json();
    return { props: { item: item || null } };
  } catch (error) {
    console.error("Error:", error);
    return { props: { item: null } };
  }
}

export default function Detail({ item }) {
  if (!item) {
    return <div className="container my-4">Cargando o producto no encontrado...</div>;
  }

  return (
    <>
      <Head>
        <title>{item.title}</title>
        <meta property="og:title" content={item.title} />
        <meta property="og:description" content={item.description} />
      </Head>

      <div className="container my-4">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 mb-3 text-center">
            {item.images && (
              <img
                src={item.images[0]}
                className="img-fluid rounded"
                alt={item.title}
              />
            )}
          </div>
          <div className="col-12 col-md-6">
            <h2>{item.title}</h2>
            <p className="text-muted">{item.category}</p>
            <h4 className="text-success">${item.price}</h4>
            <p>{item.description}</p>
            <button className="btn btn-success">Comprar</button>
          </div>
        </div>
      </div>
    </>
  );
}