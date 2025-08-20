import useCart from '../hooks/useCart';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getSubtotal, getShipping, getTotal } = useCart();
  const { darkMode } = useTheme();

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-24 px-4 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-8 transition-colors duration-300`}>Your Cart</h1>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 shadow-lg text-center`}>
            <p className={`text-xl ${darkMode ? 'text-light' : 'text-gray-700'} mb-6`}>Your cart is empty</p>
            <Link to="/products" className="px-6 py-3 bg-primary hover:bg-accent text-white rounded-lg transition-colors">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-24 px-4 pb-16 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-8 transition-colors duration-300`}>Your Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items Table */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-x-auto flex-grow`}>
            <table className="w-full">
              <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors duration-300`}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium">S. No.</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Product Image</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Product Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Unit Price</th>
                  <th className="px-6 py-4 text-center text-sm font-medium">Quantity</th>
                  <th className="px-6 py-4 text-left text-sm font-medium">Total</th>
                  <th className="px-6 py-4 text-center text-sm font-medium">Remove</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'} transition-colors duration-300`}>
                {cartItems.map((item: any, idx: number) => {
                  const itemPrice = item.discount ? item.price * (1 - item.discount) : item.price;
                  const itemTotal = itemPrice * item.quantity;
                  return (
                    <tr key={item.productId} className={`hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors duration-300`}>
                      <td className="px-6 py-4">{idx + 1}</td>
                      <td className="px-6 py-4">
                        <div className="w-16 h-16 relative">
                          <img src={`/${item.imgName}`} alt={item.name} className="w-full h-full object-contain" />
                        </div>
                      </td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">${itemPrice.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:text-primary transition-colors duration-300" aria-label={`Decrease quantity of ${item.name}`}>-</button>
                          <input type="number" min="1" value={item.quantity} onChange={e => { const v = parseInt(e.target.value); if (!isNaN(v) && v > 0) updateQuantity(item.productId, v); }} className="w-16 px-2 py-1 text-center rounded bg-white text-gray-800 border border-gray-300 transition-colors duration-300" aria-label={`Quantity of ${item.name}`}/>
                          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:text-primary transition-colors duration-300" aria-label={`Increase quantity of ${item.name}`}>+</button>
                        </div>
                      </td>
                      <td className="px-6 py-4">${itemTotal.toFixed(2)}</td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => removeFromCart(item.productId)} className="text-red-500 hover:text-red-700 transition-colors duration-300">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Order Summary */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 lg:w-1/3`}>
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="flex justify-between mb-4 pb-4 border-b border-gray-200">
              <span>Subtotal</span>
              <span>${getSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 pb-4 border-b border-gray-200">
              <span>Shipping</span>
              <span>${getShipping().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-8">
              <span className="text-lg font-bold">Grand Total</span>
              <span className="text-lg font-bold">${getTotal().toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="block w-full">
              <button className="w-full py-3 bg-primary hover:bg-accent text-white font-medium rounded-lg transition-colors duration-300">
                Proceed To Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
