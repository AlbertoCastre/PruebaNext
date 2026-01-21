import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/items?search=${search}`);
  };

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center">
      <h1 className="text-center mb-4">Bazar</h1>

      <form onSubmit={handleSubmit} className="d-flex gap-2">
        <input
          className="form-control"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary">Buscar</button>
      </form>
    </div>
  );
}