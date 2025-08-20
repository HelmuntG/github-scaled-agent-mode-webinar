import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { useTheme } from '../context/ThemeContext';

export default function CartIcon() {
  const { cartItems } = useCart();
  const { darkMode } = useTheme();
  const count = cartItems.reduce((sum: number, i: { quantity: number }) => sum + i.quantity, 0);
  return (
    <Link to="/cart" className="relative p-2">
      <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors duration-300`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {count > 0 && (
        <div className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{count}</div>
      )}
    </Link>
  );
}
