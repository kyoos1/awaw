import { useState } from "react";

export default function TShirtShop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState({});

  const categories = ["All", "Men's", "Women's", "Unisex"];

  const products = [
    {
      id: 1,
      name: "Minimalist Face",
      price: 199.00,
      image: "/api/placeholder/200/200",
      category: "Men's"
    },
    {
      id: 2,
      name: "Classic Cotton Set",
      price: 199.00,
      image: "/api/placeholder/200/200",
      category: "Men's"
    },
    {
      id: 3,
      name: "Essential Duo Pack",
      price: 199.00,
      image: "/api/placeholder/200/200",
      category: "Unisex"
    },
    {
      id: 4,
      name: "Toji zenin",
      price: 199.00,
      image: "/api/placeholder/200/200",
      category: "Men's"
    },
    {
      id: 5,
      name: "Toji zenin",
      price: 199.00,
      image: "/api/placeholder/200/200",
      category: "Men's"
    },
    {
      id: 6,
      name: "Toji zenin",
      price: 199.00,
      image: "/api/placeholder/200/200",
      category: "Men's"
    },
    {
      id: 7,
      name: "Toji zenin",
      price: 199.00,
      image: "/api/placeholder/200/200",
      category: "Men's"
    },
    {
      id: 8,
      name: "Toji zenin",
      price: 199.00,
      image: "/api/placeholder/200/200",
      category: "Men's"
    },
    {
      id: 9,
      name: "Toji zenin",
      price: 199.00,
      image: "/api/placeholder/200/200",
      category: "Men's"
    },
    {
      id: 10,
      name: "Toji zenin",
      price: 199.00,
      image: "/api/placeholder/200/200",
      category: "Men's"
    },
    {
      id: 11,
      name: "Toji zenin",
      price: 199.00,
      image: "/api/placeholder/200/200",
      category: "Men's"
    },
    {
      id: 12,
      name: "Toji zenin",
      price: 199.00,
      image: "/api/placeholder/200/200",
      category: "Men's"
    },
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-orange-500 px-6 py-3 flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold min-w-[120px]">Tee-Shirt</h1>
        
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search ..."
              className="w-full bg-white rounded-full px-5 py-2 pr-10 outline-none text-sm"
            />
            <img src="/icons/search.png" alt="Search" className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 opacity-40" />
          </div>
        </div>

        <div className="flex items-center gap-5 min-w-[80px] justify-end">
          <button className="hover:opacity-80 transition">
            <img src="/icons/user.png" alt="User" className="w-6 h-6" />
          </button>
          <button className="hover:opacity-80 transition">
            <img src="/icons/cart.png" alt="Cart" className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Category Filters */}
      <div className="bg-white px-6 py-4 flex items-center justify-center gap-4 shadow-sm">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all text-sm ${
              activeCategory === category
                ? "bg-orange-500 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <main className="px-6 py-5">
        <div className="grid grid-cols-6 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <div className="relative bg-gray-100 aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow"
                >
                  <img 
                    src={favorites[product.id] ? "/icons/heart-filled.png" : "/icons/heart.png"} 
                    alt="Favorite" 
                    className="w-4 h-4"
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-3 bg-orange-50">
                <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 min-h-[40px]">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-orange-600 font-bold text-sm">
                    ₱ {product.price.toFixed(2)}
                  </span>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded font-medium transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
