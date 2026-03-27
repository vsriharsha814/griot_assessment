import { useEffect, useState } from "react";
import { getSellerInventory } from "../../api/seller";
import { useAuth } from "../../context/AuthContext";
import { createProduct, updateProduct } from "../../api/products";

const SellerInventory = () => {
  const { auth } = useAuth();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
    startingBid: "",
    minBidAmount: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    startingBid: "",
    minBidAmount: "",
  });

  const loadInventory = async () => {
    try {
      setError("");
      const response = await getSellerInventory(auth.token);
      setInventory(Array.isArray(response) ? response : []);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, [auth.token]); // eslint-disable-line react-hooks/exhaustive-deps

  const onCreateChange = (event) => {
    setCreateForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onEditChange = (event) => {
    setEditForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const submitCreate = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      await createProduct(
        {
          ...createForm,
          startingBid: Number(createForm.startingBid),
          minBidAmount: Number(createForm.minBidAmount),
        },
        auth.token
      );
      setCreateForm({ name: "", description: "", startingBid: "", minBidAmount: "" });
      setMessage("Listing created.");
      await loadInventory();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create listing");
    } finally {
      setSubmitting(false);
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditForm({
      name: item.name || "",
      description: item.description || "",
      startingBid: item.startingBid ?? "",
      minBidAmount: item.minBidAmount ?? "",
    });
  };

  const submitEdit = async (event) => {
    event.preventDefault();
    if (!editingId) return;

    setSubmitting(true);
    setMessage("");
    setError("");
    try {
      await updateProduct(
        editingId,
        {
          ...editForm,
          startingBid: Number(editForm.startingBid),
          minBidAmount: Number(editForm.minBidAmount),
        },
        auth.token
      );
      setEditingId(null);
      setMessage("Listing updated.");
      await loadInventory();
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || "Failed to update listing");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="page authPage">
      <div className="authCard inventoryCard">
        <h3>Seller Inventory</h3>
        <form onSubmit={submitCreate} className="authForm">
          <input name="name" placeholder="Listing name" value={createForm.name} onChange={onCreateChange} required />
          <input
            name="description"
            placeholder="Description"
            value={createForm.description}
            onChange={onCreateChange}
            required
          />
          <input
            name="startingBid"
            type="number"
            placeholder="Starting bid"
            value={createForm.startingBid}
            onChange={onCreateChange}
            required
          />
          <input
            name="minBidAmount"
            type="number"
            placeholder="Minimum bid increment"
            value={createForm.minBidAmount}
            onChange={onCreateChange}
            required
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Create Listing"}
          </button>
        </form>
        {message ? <p className="authSuccess">{message}</p> : null}
        {loading ? <p>Loading inventory...</p> : null}
        {error ? <p className="authError">{error}</p> : null}
        {!loading && !error && inventory.length === 0 ? <p>No properties yet.</p> : null}
        {!loading && !error && inventory.length > 0 ? (
          <ul className="inventoryList">
            {inventory.map((item) => (
              <li key={item._id}>
                <div>
                  <strong>{item.name}</strong>
                  <span>Starting Bid: {item.startingBid}</span>
                </div>
                <button type="button" onClick={() => startEdit(item)}>
                  Edit
                </button>
              </li>
            ))}
          </ul>
        ) : null}
        {editingId ? (
          <form onSubmit={submitEdit} className="authForm">
            <h4>Edit Listing</h4>
            <input name="name" placeholder="Listing name" value={editForm.name} onChange={onEditChange} required />
            <input
              name="description"
              placeholder="Description"
              value={editForm.description}
              onChange={onEditChange}
              required
            />
            <input
              name="startingBid"
              type="number"
              placeholder="Starting bid"
              value={editForm.startingBid}
              onChange={onEditChange}
              required
            />
            <input
              name="minBidAmount"
              type="number"
              placeholder="Minimum bid increment"
              value={editForm.minBidAmount}
              onChange={onEditChange}
              required
            />
            <button type="submit" disabled={submitting}>
              {submitting ? "Updating..." : "Update Listing"}
            </button>
            <button type="button" onClick={() => setEditingId(null)}>
              Cancel
            </button>
          </form>
        ) : null}
      </div>
    </section>
  );
};

export default SellerInventory;
