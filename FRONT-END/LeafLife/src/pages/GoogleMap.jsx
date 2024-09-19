import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 0,
    lng: 0
};

const GoogleMapComponent = () => {
    const [markerPosition, setMarkerPosition] = useState(center);

    const handleMapClick = (e) => {
        setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        // Update the form coordinates
    };

    return (
        <LoadScript
            googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={handleMapClick}
            >
                <Marker position={markerPosition} />
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapComponent;
