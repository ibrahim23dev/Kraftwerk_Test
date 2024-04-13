import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaEye, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Product from './Products';
import TopProduct from './TopProducts';

function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`https://dummyjson.com/products?limit=8&skip=${(currentPage - 1) * 8}`)
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  }, [currentPage]);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Product />
      <TopProduct/>
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-center mb-8 mt-6 font-serif">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden relative transition duration-300 ease-in-out transform hover:scale-105">
            <img src={product.thumbnail} alt={product.title} className="w-full h-40 sm:h-56 object-cover object-center" />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-gray-800 font-semibold line-clamp-1 text-lg">{product.title}</h2>
                <p className="text-gray-700 font-medium">${product.price}</p>
              </div>
              <p className="text-gray-700 line-clamp-2 mb-2">{product.description}</p>
              <div className="flex justify-between items-center mb-2">
                <p className="text-red-600 font-semibold"> In Stock: {product.stock}</p>
                {product.discountPercentage && (
                  <p className="text-green-600 font-semibold">-{product.discountPercentage}%</p>
                )}
              </div>
              <div className="flex justify-center mt-2">
                <button className="bg-yellow-400 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-full mx-2 transition-colors duration-300 ease-in-out transform hover:scale-105">
                  <FaShoppingCart className="inline-block mr-1" />
                  Add to Cart
                </button>
                <button className="bg-yellow-400 hover:bg-yellow-600 text-white font-semibold py-1 px-2 rounded-full mx-2 transition-colors duration-300 ease-in-out transform hover:scale-105">
                  <FaEye className="inline-block mr-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {/* Pagination buttons */}
        <button
          className="mx-1 p-2 rounded-full border border-gray-300 focus:outline-none hover:bg-blue-200"
          onClick={() => handlePaginationClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
        {[...Array(3)].map((_, index) => (
          <button
            key={index}
            className={`mx-1 p-2 rounded-full border border-gray-300 focus:outline-none ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'hover:bg-blue-200'
            }`}
            onClick={() => handlePaginationClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="mx-1 p-2 rounded-full border border-gray-300 focus:outline-none hover:bg-blue-200"
          onClick={() => handlePaginationClick(currentPage + 1)}
          disabled={currentPage === 3}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
    </div>
    
  );
}

export default Home;
