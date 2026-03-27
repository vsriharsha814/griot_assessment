import React, { useEffect, useState } from "react";
import { RxDot } from "react-icons/rx";
import { IoIosPeople } from "react-icons/io";
import { FaBed } from "react-icons/fa";
import { BiArea } from "react-icons/bi";
import { FaBath } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { formatUSD } from "../utils/currency";
import { mediaUrl } from "../utils/media";
import { getAllProducts } from "../api/products";
import { villas as fallbackVillas } from "../villas";

const mapFallbackVilla = (villa) => ({
  _id: `fallback-${villa.id}`,
  name: villa.name,
  imageUrl: villa.image,
  startingBid: villa.dailyRent,
});

const getAddedLabel = (createdAt) => {
  if (!createdAt) return "Sample listing";
  const createdMs = new Date(createdAt).getTime();
  if (Number.isNaN(createdMs)) return "Recently added";
  const diffMs = Date.now() - createdMs;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  if (diffMinutes < 1) return "Added just now";
  if (diffMinutes < 60) return `Added ${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `Added ${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays >= 7) {
    return `Added on ${new Date(createdMs).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  }
  return `Added ${diffDays}d ago`;
};

const TopVillas = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setError("");
        const products = await getAllProducts();
        if (!cancelled && Array.isArray(products)) {
          setItems(products.slice(0, 3));
        }
      } catch {
        if (!cancelled) {
          setError("Could not load featured listings. Showing sample properties instead.");
          setItems(fallbackVillas.slice(0, 3).map(mapFallbackVilla));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="topVillas">
      <h1>TOP PICK VILLAS</h1>
      <p>
        Hand-picked from live listings. Open a property to view details and place a bid.
      </p>
      {loading && <p style={{ textAlign: "center" }}>Loading featured listings...</p>}
      {!loading && error && <p style={{ textAlign: "center" }}>{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No listings yet.{" "}
          <Link to="/villas">Browse all properties</Link>
        </p>
      )}
      {!loading && items.length > 0 ? (
        <div className="villasContainer">
          {items.map((product) => {
            const id = product._id || product.id;
            const isFallback = typeof id === "string" && id.startsWith("fallback-");
            const imageSrc = mediaUrl(product.imageUrl) || "/villa1.jpg";
            const title = product.name || "Listing";
            const starting = product.startingBid ?? 0;
            const addedLabel = getAddedLabel(product.createdAt);
            return (
              <Link to={isFallback ? "/villas" : `/villa/${id}`} className="card" key={id}>
                <img src={imageSrc} alt={title} />
                <div className="location_text">
                  <span>Featured</span>
                  <span>
                    <RxDot />
                  </span>
                  <span>{addedLabel}</span>
                </div>
                <div className="title_text">{title}</div>
                <div className="specifications">
                  <div className="spec">
                    <IoIosPeople />
                    <span>—</span>
                    Guests
                  </div>
                  <div className="spec">
                    <FaBed />
                    <span>—</span>
                    Bedrooms
                  </div>
                  <div className="spec">
                    <BiArea />
                    <span>—</span>
                    Area
                  </div>
                  <div className="spec">
                    <FaBath />
                    <span>—</span>
                    Bathrooms
                  </div>
                </div>
                <div className="badge">
                  From <span>{formatUSD(starting)} / Night </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : null}
    </section>
  );
};

export default TopVillas;
