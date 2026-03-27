import React, { useEffect, useMemo, useState } from 'react'
import { getAllProducts } from '../../api/products';
import { RxDot } from "react-icons/rx";
import { IoIosPeople } from "react-icons/io";
import { FaBed } from "react-icons/fa";
import { BiArea } from "react-icons/bi";
import { FaBath } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { formatUSD } from '../../utils/currency';

const Villas = () => {
  const [apiVillas, setApiVillas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [maxDailyRent, setMaxDailyRent] = useState('');

  useEffect(() => {
    const fetchVillas = async () => {
      try {
        setLoadError('');
        const products = await getAllProducts();
        setApiVillas(Array.isArray(products) ? products : []);
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

  const filteredVillas = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const maxRent = maxDailyRent ? Number(maxDailyRent) : null;

    return villas.filter((villa) => {
      const matchesSearch =
        !normalizedSearch ||
        villa.name.toLowerCase().includes(normalizedSearch) ||
        villa.category.toLowerCase().includes(normalizedSearch);
      const matchesRent = maxRent === null || Number(villa.dailyRent) <= maxRent;
      return matchesSearch && matchesRent;
    });
  }, [villas, searchTerm, maxDailyRent]);

  return (
    <>
        <div className="page" id='allVillas'>
          <h1>ALL VILLAS</h1>
          {loading && <p>Loading properties...</p>}
          {!loading && loadError && <p>{loadError}</p>}
          {!loading && !loadError ? (
            <div className="villaFilters">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <input
                type="number"
                placeholder="Max rent (USD)"
                value={maxDailyRent}
                onChange={(event) => setMaxDailyRent(event.target.value)}
              />
            </div>
          ) : null}
          {!loading && !loadError && <p>{filteredVillas.length} Properties</p>}
          <div className="villasContainer">
        {filteredVillas.map((element) => {
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
                  From <span>{formatUSD(element.dailyRent)} / Night </span>
                </div>
              </Link>
          );
        })}
      </div>
      {!loading && !loadError && filteredVillas.length === 0 ? <p>No matching properties found.</p> : null}
        </div>
    </>
  )
}

export default Villas