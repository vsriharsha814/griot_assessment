import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios';
import { RxDot } from "react-icons/rx";
import { IoIosPeople } from "react-icons/io";
import { FaBed } from "react-icons/fa";
import { BiArea } from "react-icons/bi";
import { FaBath } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Villas = () => {
  const [apiVillas, setApiVillas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const fetchVillas = async () => {
      try {
        setLoadError('');
        const response = await axios.get('http://localhost:5000/api/products/getAll');
        setApiVillas(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error loading villas from API:', error);
        setLoadError('Unable to load properties right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchVillas();
  }, []);

  const villas = useMemo(() => {
    return apiVillas.map((villa) => ({
      id: villa._id,
      name: villa.name || 'Untitled Villa',
      location: 'Unknown',
      category: 'Property',
      guests: 0,
      bedrooms: 0,
      bathrooms: 0,
      squareMeter: '-',
      image: villa.imageUrl ? `http://localhost:5000/${villa.imageUrl}` : '/villa1.jpg',
      dailyRent: villa.startingBid ?? 0,
    }));
  }, [apiVillas]);

  return (
    <>
        <div className="page" id='allVillas'>
          <h1>ALL VILLAS</h1>
          {loading && <p>Loading properties...</p>}
          {!loading && loadError && <p>{loadError}</p>}
          {!loading && !loadError && <p>{villas.length} Properties</p>}
          <div className="villasContainer">
        {villas.map((element) => {
          return (
              <Link to={`/villa/${element.id}`} className="card" key={element.id}>
                <img src={element.image} alt={element.name} />
                <div className="location_text">
                  <span>{element.location}</span>
                  <span>
                    <RxDot />
                  </span>
                  <span>{element.category}</span>
                </div>
                <div className="title_text">{element.name}</div>
                <div className="specifications">
                  <div className="spec">
                    <IoIosPeople />
                    <span>{element.guests}</span>
                    Guests
                  </div>
                  <div className="spec">
                    <FaBed />
                    <span>{element.bedrooms}</span>
                    Bedrooms
                  </div>
                  <div className="spec">
                    <BiArea />
                    <span>{element.squareMeter}</span>
                    Area
                  </div>
                  <div className="spec">
                    <FaBath />
                    <span>{element.bathrooms}</span>
                    Bathrooms
                  </div>
                </div>
                <div className="badge">
                  From <span>Rs.{element.dailyRent} / Day </span>
                </div>
              </Link>
          );
        })}
      </div>
        </div>
    </>
  )
}

export default Villas