import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const APIKEY = "26529dc0d47147f382da0f0facb5f26c";
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${APIKEY}`)
            .then((info) => {
                setData(info.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching recipe details:", error);
                setError("Failed to load recipe details. Please try again later.");
                setLoading(false);
            });
    }, [id]);

    // Load favorites from localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const handleAddToFavorite = (recipe) => {
        const newFavorites = [...favorites];
        const index = newFavorites.findIndex(fav => fav.id === recipe.id);
        
        if (index >= 0) {
            // Remove from favorites if already exists
            newFavorites.splice(index, 1);
        } else {
            // Add to favorites
            newFavorites.push({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image
            });
        }
        
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const isFavorite = (recipeId) => {
        return favorites.some(fav => fav.id === recipeId);
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
                    <button 
                        onClick={() => navigate(-1)} 
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <button 
                onClick={() => navigate(-1)} 
                className="mb-6 flex items-center text-cyan-600 hover:text-cyan-800 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Recipes
            </button>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <img 
                            src={data.image} 
                            alt={data.title}
                            className="w-full h-64 md:h-full object-cover" 
                        />
                    </div>
                    <div className="p-6 md:w-1/2">
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">{data.title}</h1>
                            <button 
                                onClick={() => handleAddToFavorite(data.id)} 
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label={isFavorite(data.id) ? "Remove from favorites" : "Add to favorites"}
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-8 w-8" 
                                    fill={isFavorite(data.id) ? "currentColor" : "none"} 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    color={isFavorite(data.id) ? "#f97316" : "#6b7280"}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {data.diets && data.diets.map((diet, index) => (
                                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                                    {diet}
                                </span>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-50 p-3 rounded">
                                <p className="text-gray-500 text-sm">Ready in</p>
                                <p className="text-gray-800 font-semibold">{data.readyInMinutes} minutes</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <p className="text-gray-500 text-sm">Servings</p>
                                <p className="text-gray-800 font-semibold">{data.servings}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <p className="text-gray-500 text-sm">Health Score</p>
                                <p className="text-gray-800 font-semibold">{data.healthScore}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                                <p className="text-gray-500 text-sm">Weight Watcher Points</p>
                                <p className="text-gray-800 font-semibold">{data.weightWatcherSmartPoints || 'N/A'}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Summary</h2>
                            <div 
                                className="text-gray-600"
                                dangerouslySetInnerHTML={{ __html: data.summary }}
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t">
                    <div className="md:flex gap-8">
                        <div className="md:w-1/2 mb-6 md:mb-0">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h2>
                            <ul className="space-y-2">
                                {data.extendedIngredients && data.extendedIngredients.map((ingredient) => (
                                    <li key={ingredient.id} className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700">
                                            {ingredient.amount} {ingredient.unit} {ingredient.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="md:w-1/2">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Instructions</h2>
                            {data.analyzedInstructions && data.analyzedInstructions.length > 0 ? (
                                <ol className="list-decimal list-inside space-y-4">
                                    {data.analyzedInstructions[0].steps.map((step) => (
                                        <li key={step.number} className="text-gray-700">
                                            <span className="font-medium">Step {step.number}:</span> {step.step}
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <div 
                                    className="text-gray-600"
                                    dangerouslySetInnerHTML={{ __html: data.instructions || 'No instructions available.' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeDetails;