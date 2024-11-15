import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductDetailPage = ({ authToken }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(`https://car-management-1duu.onrender.com/api/cars/${id}`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setCar(response.data.car);
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };

        fetchCarDetails();
    }, [authToken, id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`https://car-management-1duu.onrender.com/api/cars/${id}`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            navigate('/');
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    return (
        <div>
            {car ? (
                <div>
                    <h1>{car.title}</h1>
                    <p>{car.description}</p>
                    <p>Tags: {car.tags.join(', ')}</p>
                    {car.images && car.images.length > 0 && (
                        <div className="car-images">
                            {car.images.map((image, idx) => (
                                <img key={idx} src={image} alt={`Car ${idx}`} />
                            ))}
                        </div>
                    )}
                    <button onClick={() => navigate(`https://car-management-1duu.onrender.com/product/edit/${car._id}`)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
ProductDetailPage.propTypes = {
    authToken: PropTypes.string, // Add prop validation for authToken
};

export default ProductDetailPage;
