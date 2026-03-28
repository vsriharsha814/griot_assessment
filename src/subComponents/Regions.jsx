import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../api/products";

const countByRegion = (products, region) =>
  products.filter((p) => (p.region || "").toLowerCase() === region).length;

const Regions = () => {
  const [counts, setCounts] = useState({ mountains: null, coastline: null });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const products = await getAllProducts();
        if (!cancelled && Array.isArray(products)) {
          setCounts({
            mountains: countByRegion(products, "mountains"),
            coastline: countByRegion(products, "coastline"),
          });
        }
      } catch {
        if (!cancelled) setCounts({ mountains: 0, coastline: 0 });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const fmt = (n) => (typeof n === "number" ? n : "—");

  return (
    <>
      <section id="regions">
        <h1>OUR REGIONS</h1>
        <p>
          From misty peaks to ocean air, pick a region and explore hand-picked homes. Tap a card to
          filter listings.
        </p>
        <div className="region_container">
          <Link to="/villas?region=mountains" className="card">
            <img src="/region1.jpg" alt="mountains" />
            <h2>Mountains</h2>
            <p>
              <span>{fmt(counts.mountains)}</span> Properties
            </p>
          </Link>
          <Link to="/villas?region=coastline" className="card">
            <img src="/region2.jpg" alt="coastline" />
            <h2>Coastline</h2>
            <p>
              <span>{fmt(counts.coastline)}</span> Properties
            </p>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Regions;