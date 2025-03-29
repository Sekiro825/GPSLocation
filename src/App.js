import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { fetchNearbyPetStores } from './PetStoreService';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
//import markerIconImage from './marker.jpg'; // Import the marker image
const markerIconImage = new URL('../public/marker.jpg', import.meta.url).toString(); // Resolve the marker image URL

// Adjust the icon size to be smaller (10px by 10px)
const customIcon = L.icon({
  iconUrl: markerIconImage,
  iconSize: [30, 30], // Set the size to 10px by 10px
  iconAnchor: [5, 5], // Adjust the anchor point accordingly
});
function App() {
  const [location, setLocation] = useState(null);
  const [petStores, setPetStores] = useState([]);
  const [error, setError] = useState(null);
  const mapInstanceRef = useRef(null); // Ref for the Leaflet map instance
  const mapContainerRef = useRef(null); // Ref for the map container

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchNearbyPetStores()
        .then(stores => {
          setPetStores(stores);
        })
        .catch(error => {
          console.error("Failed to fetch pet stores", error);
          setError("Failed to fetch pet stores");
        });
    }
  }, [location]);

  useEffect(() => {
    if (location && mapContainerRef.current) {
      // Check if the map instance already exists
      if (!mapInstanceRef.current) {
        // Initialize Leaflet map
        mapInstanceRef.current = L.map(mapContainerRef.current).setView(
          [location.latitude, location.longitude],
          13
        );

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstanceRef.current);
      }

      // Clear existing markers
      mapInstanceRef.current.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          mapInstanceRef.current.removeLayer(layer);
        }
      });

      // Add marker for user's location
      L.marker([location.latitude, location.longitude], { icon: customIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup('Your Location')
        .openPopup();

      // Add markers for pet stores
      petStores.forEach(store => {
        L.marker([store.lat, store.lon], { icon: customIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup(`<b>${store.name}</b><br>${store.address}<br>Rating: ${store.rating}`);
      });
    }

    // Cleanup function to remove the map instance when the component unmounts
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [location, petStores]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pet Store Finder</h1>
        {error && <p>Error: {error}</p>}
        {location ? (
          <div>
            <p>Your location: Latitude {location.latitude}, Longitude {location.longitude}</p>

            {/* Map Section */}
            <h2>Map</h2>
            <div id="map" ref={mapContainerRef} className="map-container"></div>

            <h2>Nearby Pet Stores:</h2>
            <div className="pet-stores-container">
              {petStores.map((store, index) => (
                <div key={index} className="pet-store-card">
                  <h3>{store.name}</h3>
                  <img src={store.image} alt={store.name} className="pet-store-image" />
                  <p>Address: {store.address}</p>
                  <p>Rating: {store.rating}</p>
                  {store.opening_hours && store.opening_hours.open_now !== undefined && (
                    <p>Open Now: {store.opening_hours.open_now ? 'Yes' : 'No'}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading location...</p>
        )}
      </header>
    </div>
  );
}

export default App;
