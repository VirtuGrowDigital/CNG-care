import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "../contexts/porductContext";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const { Products, remove_product, isLoaded } = useContext(ProductContext);
  const [products, setProducts] = useState(Products);
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    filterProducts();
  }, [Products, category, searchTerm]);

  let urlImage = import.meta.env.VITE_APP_URL_IMAGE;

  const filterProducts = () => {
    let filtered = Products;
    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setProducts(filtered);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-2 box-border bg-white mt-5 rounded-sm w-full h-screen">
      <div className="max-h-[90vh] overflow-auto px-4">
        <div className="flex gap-2 mb-4 w-full items-center">
          <input
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border-2 rounded focus:outline-none w-2/3"
          />
          <select
            className="bg-gray-200 p-2 rounded outline-none px-3 w-1/3"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="all">ALL</option>
            <option value="LPG">LPG</option>
            <option value="CNG">CNG</option>
            <option value="SPARE">SPARE</option>
          </select>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 font-semibold">
              <th className="p-2">IMAGES</th>
              <th className="p-2">NAME</th>
              <th className="p-2">BRAND</th>
              <th className="p-2">PRICE</th>
              <th className="p-2 text-center">CATEGORY</th>
              <th className="p-2 text-center">QUANTITY</th>
              <th className="p-2 text-center">STOCKS</th>
              <th className="p-2 text-center">UPDATE</th>
              <th className="p-2 text-center">REMOVE</th>
            </tr>
          </thead>
          <tbody>
            {!isLoaded ? (
              <tr>
                <td colSpan="9" className="p-2 text-center text-gray-400 text-lg">
                  LOADING...
                </td>
              </tr>
            ) : products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="p-2">
                    <img
                      src={`${urlImage}${product.images[0]}`}
                      alt={product.title}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td className="p-2">{product.title}</td>
                  <td className="p-2">{product.brand}</td>
                  <td className="p-2">
                    {product.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </td>
                  <td className="p-2 text-center">{product.category}</td>
                  <td className="p-2 text-center">{product.quantity}</td>
                  <td className="p-2 text-center">
                    {product.quantity !== 0 ? (
                      <span className="text-green-600">Available</span>
                    ) : (
                      <span className="text-red-400">Out of Stock</span>
                    )}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      className="text-black text-xl p-2 rounded hover:bg-gray-100"
                      onClick={() => navigate(`/updateproduct/${product._id}`)}
                    >
                      <i className="ri-edit-2-fill"></i>
                    </button>
                  </td>
                  <td className="p-2 text-center">
                    <button
                      className="text-red-600 text-xl p-2 rounded hover:bg-gray-100"
                      onClick={() => {
                        remove_product(product._id);
                        setProducts(products.filter((p) => p._id !== product._id));
                      }}
                    >
                      <i className="ri-delete-bin-6-line"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-2 text-center text-gray-400 text-lg">
                  No Products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
