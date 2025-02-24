import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const APIKEY = "26529dc0d47147f382da0f0facb5f26c";
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}`)
            .then((info) => {
                setData(info.data.results);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch recipes");
                setLoading(false);
                console.error(err);
            });
    }, []);

    // Load favorites from localStorage on component mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/recipe/${id}`);
    };

    const handleAddToFavorite = (recipe) => {
        const newFavorites = [...favorites];
        const index = newFavorites.findIndex(fav => fav.id === recipe.id);
        
        if (index >= 0) {
            // Remove from favorites if already exists
            newFavorites.splice(index, 1);
        } else {
            // Add to favorites
            newFavorites.push(recipe);
        }
        
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const isFavorite = (id) => {
        return favorites.some(fav => fav.id === id);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Delicious Recipes</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.map((recipe) => (
                    <div key={recipe.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="relative">
                            <img 
                                src={recipe.image} 
                                alt={recipe.title}
                                className="w-full h-48 object-cover" 
                            />
                            <button 
                                onClick={() => handleAddToFavorite(recipe)} 
                                className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-6 w-6" 
                                    fill={isFavorite(recipe.id) ? "currentColor" : "none"} 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    color={isFavorite(recipe.id) ? "#f97316" : "#6b7280"}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{recipe.title}</h2>
                            <button 
                                onClick={() => handleViewDetails(recipe.id)} 
                                className="w-full mt-2 py-2 px-4 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded transition-colors duration-300"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {data.length === 0 && !loading && !error && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No recipes found. Try adjusting your search.</p>
                </div>
            )}
        </div>
    );
};

export default Home;