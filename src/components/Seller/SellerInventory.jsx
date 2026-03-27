import { useEffect, useState } from "react";
import { getSellerInventory } from "../../api/seller";
import { useAuth } from "../../context/AuthContext";

const SellerInventory = () => {
  const { auth } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const response = await getSellerInventory(auth.token);
        setInventory(Array.isArray(response) ? response : []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load inventory");
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
  }, [auth.token]);

  return (
    <section className="page authPage">
      <div className="authCard inventoryCard">
        <h3>Seller Inventory</h3>
        {loading ? <p>Loading inventory...</p> : null}
        {error ? <p className="authError">{error}</p> : null}
        {!loading && !error && inventory.length === 0 ? <p>No properties yet.</p> : null}
        {!loading && !error && inventory.length > 0 ? (
          <ul className="inventoryList">
            {inventory.map((item) => (
              <li key={item._id}>
                <strong>{item.name}</strong>
                <span>Starting Bid: {item.startingBid}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
};

export default SellerInventory;
