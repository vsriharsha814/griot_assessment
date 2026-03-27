import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getBidHistory, getProductById, placeBid } from "../../api/products";
import { useAuth } from "../../context/AuthContext";

const SingleVilla = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const [apiVilla, setApiVilla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [bidHistory, setBidHistory] = useState(null);
  const [bidForm, setBidForm] = useState({ bidderName: "", bidAmount: "" });
  const [bidError, setBidError] = useState("");
  const [bidMessage, setBidMessage] = useState("");
  const [submittingBid, setSubmittingBid] = useState(false);

  const loadBidData = async (productId) => {
    try {
      const response = await getBidHistory(productId);
      setBidHistory(response);
    } catch (error) {
      console.error("Error loading bid history:", error);
      setBidHistory(null);
    }
  };

  useEffect(() => {
    const fetchVilla = async () => {
      try {
        setLoadError("");
        const product = await getProductById(id);
        setApiVilla(product || null);
        await loadBidData(id);
      } catch (error) {
        console.error("Error loading villa details from API:", error);
        setLoadError("Unable to load property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchVilla();
  }, [id]);

  useEffect(() => {
    if (auth?.userId && !bidForm.bidderName) {
      setBidForm((prev) => ({ ...prev, bidderName: `User-${auth.userId.slice(-6)}` }));
    }
  }, [auth, bidForm.bidderName]);

  const filteredVilla = useMemo(() => {
    if (!apiVilla) return null;
    return {
      name: apiVilla.name || "Untitled Villa",
      image: apiVilla.imageUrl ? `http://localhost:5000/${apiVilla.imageUrl}` : "/villa1.jpg",
      location: "Unknown",
      bathrooms: 0,
      guests: 0,
      squareMeter: "-",
    };
  }, [apiVilla]);

  if (loading) {
    return (
      <section id="singleVilla" className="page">
        <div className="container">
          <h3>Loading property...</h3>
        </div>
      </section>
    );
  }

  if (!filteredVilla) {
    return (
      <section id="singleVilla" className="page">
        <div className="container">
          <h3>{loadError || "Villa not found"}</h3>
        </div>
      </section>
    );
  }

  const onBidChange = (event) => {
    setBidForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onBidSubmit = async (event) => {
    event.preventDefault();
    setBidError("");
    setBidMessage("");
    setSubmittingBid(true);
    try {
      await placeBid(id, {
        bidderName: bidForm.bidderName,
        bidAmount: Number(bidForm.bidAmount),
      });
      setBidMessage("Bid placed successfully.");
      setBidForm((prev) => ({ ...prev, bidAmount: "" }));
      await loadBidData(id);
    } catch (error) {
      setBidError(error.response?.data?.message || "Failed to place bid");
    } finally {
      setSubmittingBid(false);
    }
  };

  return (
    <>
      <section id="singleVilla" className="page">
        <div className="container">
          <h3>{filteredVilla.name}</h3>
          <div className="images">
            <div className="villaImg">
              <img src={filteredVilla.image} alt={filteredVilla.name} />
            </div>
            <div className="otherImgs">
              <div>
                <img src={"/landing.jpg"} alt="villa" />
                <img src={"/people.jpg"} alt="villa" />
              </div>
              <div>
                <img src={"/people2.jpg"} alt="villa" />
                <img src={"/villa10.jpg"} alt="villa" />
              </div>
            </div>
          </div>
          <h4>{filteredVilla.location}</h4>
          <p>
            {filteredVilla.bathrooms} Bedrooms / {filteredVilla.guests} Guests /{" "}
            {filteredVilla.bathrooms} Bathrooms / {filteredVilla.squareMeter}{" "}
            Area
          </p>
          <div className="checkin_out">
            <h5>
              Check In: <span> 9:00 AM</span>
            </h5>
            <h5>
              Check Out <span> 11:00 PM</span>
            </h5>
          </div>
          <div className="location">
            <h4>LOCATION</h4>
            {/* Add map url or co-ordinates */}
            <iframe
              src=" "
              style={{ width: "100%", height: "400px", border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="bidSection">
            <h4>Bidding</h4>
            <p>Current Highest Bid: {bidHistory?.currentHighestBid ?? filteredVilla.startingBid ?? 0}</p>
            <p>Minimum Next Bid: {bidHistory?.minimumNextBid ?? "-"}</p>
            <form className="bidForm" onSubmit={onBidSubmit}>
              <input
                name="bidderName"
                placeholder="Your display name"
                value={bidForm.bidderName}
                onChange={onBidChange}
                required
              />
              <input
                name="bidAmount"
                type="number"
                placeholder="Your bid amount"
                value={bidForm.bidAmount}
                onChange={onBidChange}
                required
              />
              <button type="submit" disabled={submittingBid}>
                {submittingBid ? "Submitting..." : "Place Bid"}
              </button>
            </form>
            {bidError ? <p className="authError">{bidError}</p> : null}
            {bidMessage ? <p className="authSuccess">{bidMessage}</p> : null}
            <div className="bidHistory">
              <h5>Bid History</h5>
              {bidHistory?.bids?.length ? (
                <ul>
                  {bidHistory.bids.map((bid, index) => (
                    <li key={`${bid.bidderName}-${bid.bidTimestamp}-${index}`}>
                      <span>{bid.bidderName}</span>
                      <span>{bid.bidAmount}</span>
                      <span>{new Date(bid.bidTimestamp).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No bids yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleVilla;