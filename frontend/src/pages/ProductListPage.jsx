import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductListPage = ({ authToken }) => {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]); // Ensure the initial value is an empty array
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCars, setFilteredCars] = useState([]);

    useEffect(() => {
        if (!authToken) {
            navigate('/login');
            return;
        }

        const fetchCars = async () => {
            try {
                const response = await axios.get('https://car-management-1duu.onrender.com/api/cars', {
                    headers: { Authorization: `Bearer ${authToken}` },
                });
                setCars(response.data.cars || []); // Set cars or an empty array if no cars exist
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchCars();
    }, [authToken, navigate]);

    useEffect(() => {
        if (cars && Array.isArray(cars)) {
            setFilteredCars(
                cars.filter(car =>
                    car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    car.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    car.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
                )
            );
        }
    }, [searchTerm, cars]);

    return (
        <div>
            <h1>My Cars</h1>
            <input
                type="text"
                placeholder="Search cars..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <Link to="/product/create">
                <button>Add New Car</button>
            </Link>
            <div className="car-list">
                {filteredCars.map(car => (
                    <div key={car._id} className="car-item">
                        <h3>{car.title}</h3>
                        <p>{car.description}</p>
                        <Link to={`/product/${car._id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

ProductListPage.propTypes = {
    authToken: PropTypes.string,
};

export default ProductListPage;
