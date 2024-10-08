import { Link } from 'react-router-dom';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const BedCard = ({ bed, onAdd }) => {
    const garden_id = location.pathname.split('/')[2];
    return (
        <div className="border rounded-lg p-4 relative">
            <h3 className="font-bold">{`Bed ${bed.bed_number}`}</h3>
            <p>{`Type: ${bed.bed_type}`}</p>
            <p>{`Dimensions: ${bed.length}m x ${bed.width}m`}</p>
            <p>{`Soil Type: ${bed.soil_type}`}</p>

            <div className="flex flex-row justify-between items-center">
                <button
                    onClick={onAdd}
                    className="mt-2 py-1 px-3 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 ease-in-out"
                >
                    Add Crops
                </button>
                <Link to={`/gardenstats/${garden_id}/bed/${bed.id}`} className='font-xl hover:text-hover transition-colors duration-300 ease-in-out'>
                    <FontAwesomeIcon icon={faEye} />
                </Link>
            </div>
        </div>
    );
};

export default BedCard;
