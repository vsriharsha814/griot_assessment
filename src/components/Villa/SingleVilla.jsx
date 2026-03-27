import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleVilla = () => {
  const { id } = useParams();
  const [apiVilla, setApiVilla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const fetchVilla = async () => {
      try {
        setLoadError("");
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setApiVilla(response.data || null);
      } catch (error) {
        console.error("Error loading villa details from API:", error);
        setLoadError("Unable to load property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchVilla();
  }, [id]);

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
        </div>
      </section>
    </>
  );
};

export default SingleVilla;