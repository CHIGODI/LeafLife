import { Link } from 'react-router-dom';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

const BedCard = ({ bed, onAdd, onDelete }) => {
    const garden_id = location.pathname.split('/')[2];

    return (
        <div className="border rounded-lg p-4 relative">
            {/* View Icon positioned at the top right */}
            <Link 
                to={`/gardenstats/${garden_id}/bed/${bed.id}`}
                className="absolute top-2 right-4 text-gray-600 hover:text-hover transition-colors duration-300 ease-in-out"
            >
                <FontAwesomeIcon icon={faEye} />
            </Link>

            <h3 className="font-bold">{`Bed ${bed.bed_number}`}</h3>
            <p>{`Type: ${bed.bed_type}`}</p>
            <p>{`Dimensions: ${bed.length}m x ${bed.width}m`}</p>
            <p>{`Soil Type: ${bed.soil_type}`}</p>

            <div className="flex flex-row justify-between items-center mt-4">
                {/* Add Crops Button */}
                <button
                    onClick={onAdd}
                    className="py-1 px-3 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-300 ease-in-out"
                >
                    Add Crops
                </button>
                
                {/* Delete Icon */}
                <button
                    onClick={() => onDelete(bed.id)}
                    className="hover:text-red-500 transition-colors duration-300 ease-in-out"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
};

export default BedCard;
