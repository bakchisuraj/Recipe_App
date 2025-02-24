import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const heroImages = [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
        "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80",
        "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80"
    ];

    // Testimonials data
    const testimonials = [
        {
            quote: "This recipe app completely changed how I cook. The recipes are amazing and so easy to follow!",
            author: "Sarah Johnson",
            role: "Home Chef"
        },
        {
            quote: "I've tried dozens of recipe sites, but this one stands out with its beautiful interface and detailed instructions.",
            author: "Michael Chen",
            role: "Food Blogger"
        },
        {
            quote: "Being able to save my favorite recipes and access them anywhere has made meal planning so much easier.",
            author: "Emma Williams",
            role: "Busy Parent"
        }
    ];

    // Featured categories
    const categories = [
        { name: "Quick & Easy", icon: "⏱️", description: "Delicious meals ready in 30 minutes or less" },
        { name: "Vegetarian", icon: "🥗", description: "Plant-based recipes packed with flavor" },
        { name: "Desserts", icon: "🍰", description: "Sweet treats to satisfy any craving" },
        { name: "Healthy", icon: "💪", description: "Nutritious recipes for a balanced lifestyle" }
    ];

    // Image slider effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Modal state for login/signup
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="text-cyan-600 font-bold text-2xl">RecipeHub</div>
                        </div>
                        <div className="flex space-x-4">
                            <button 
                                onClick={() => { setShowModal(true); setIsLogin(true); }}
                                className="px-4 py-2 border border-cyan-600 text-cyan-600 rounded hover:bg-cyan-50 transition-colors"
                            >
                                Log In
                            </button>
                            <button 
                                onClick={() => { setShowModal(true); setIsLogin(false); }}
                                className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Image Slider */}
            <div className="relative h-screen max-h-96 md:max-h-[500px] overflow-hidden">
                {heroImages.map((img, index) => (
                    <div 
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <img 
                            src={img} 
                            alt="Delicious Food" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
                
                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-4 text-center text-white">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Discover Delicious Recipes</h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Find, save, and cook amazing meals with our collection of handpicked recipes.</p>
                        <Link 
                            to="/home" 
                            className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg text-lg transition-colors inline-block"
                        >
                            Explore Recipes
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Recipe Platform?</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-gray-50 rounded-lg">
                            <div className="bg-cyan-100 text-cyan-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Easy to Find</h3>
                            <p className="text-gray-600">Search thousands of recipes by ingredients, cuisine, or dietary preferences.</p>
                        </div>
                        
                        <div className="text-center p-6 bg-gray-50 rounded-lg">
                            <div className="bg-cyan-100 text-cyan-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Save Favorites</h3>
                            <p className="text-gray-600">Bookmark your favorite recipes for quick access anytime, anywhere.</p>
                        </div>
                        
                        <div className="text-center p-6 bg-gray-50 rounded-lg">
                            <div className="bg-cyan-100 text-cyan-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Detailed Instructions</h3>
                            <p className="text-gray-600">Step-by-step guides with ingredient amounts and preparation times.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">Popular Categories</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Explore our most popular recipe collections to find exactly what you're looking for.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">{category.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                                <p className="text-gray-600 mb-4">{category.description}</p>
                                <a href="#" className="text-cyan-600 font-medium hover:text-cyan-700">
                                    Explore {category.name} →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quote Section */}
            <div className="py-16 bg-cyan-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold italic mb-4">"Cooking is like love. It should be entered into with abandon or not at all."</h2>
                    <p className="text-xl">— Harriet Van Horne</p>
                </div>
            </div>

            {/* Testimonials */}
            <div className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="p-6 bg-gray-50 rounded-lg shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                                <div>
                                    <p className="font-bold">{testimonial.author}</p>
                                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="py-16 bg-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Start Cooking?</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Join thousands of home chefs who have discovered new recipes and improved their cooking skills with our platform.</p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button 
                            onClick={() => { setShowModal(true); setIsLogin(false); }}
                            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Create Free Account
                        </button>
                        <Link 
                            to="/recipes" 
                            className="px-8 py-3 border border-cyan-600 text-cyan-600 hover:bg-cyan-50 font-medium rounded-lg transition-colors"
                        >
                            Browse Recipes
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">RecipeHub</h3>
                            <p className="text-gray-400">Discover delicious recipes from around the world and elevate your cooking experience.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Explore</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">Categories</a></li>
                                <li><a href="#" className="hover:text-white">Popular Recipes</a></li>
                                <li><a href="#" className="hover:text-white">Seasonal</a></li>
                                <li><a href="#" className="hover:text-white">Trending</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                                <li><a href="#" className="hover:text-white">Careers</a></li>
                                <li><a href="#" className="hover:text-white">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Connect</h4>
                            <div className="flex space-x-4 mb-4">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" /></svg>
                                </a>
                            </div>
                            <p className="text-gray-400">Subscribe to our newsletter</p>
                            <div className="mt-2 flex">
                                <input 
                                    type="email" 
                                    placeholder="Your email" 
                                    className="px-3 py-2 text-gray-800 rounded-l w-full"
                                />
                                <button className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-r">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>© 2025 RecipeHub. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Login/Signup Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-xl font-semibold">{isLogin ? 'Log In' : 'Create Account'}</h3>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <form>
                                {!isLogin && (
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                                        <input 
                                            type="text" 
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                )}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                                    <input 
                                        type="password" 
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        placeholder="Enter your password"
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded transition-colors"
                                >
                                    {isLogin ? 'Log In' : 'Sign Up'}
                                </button>
                            </form>
                            <div className="mt-4 text-center">
                                <button 
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-cyan-600 hover:text-cyan-700 text-sm"
                                >
                                    {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;