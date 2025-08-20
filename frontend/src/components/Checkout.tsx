import { useState } from 'react';
import useCart from '../hooks/useCart';
import { useTheme } from '../context/ThemeContext';


export default function Checkout() {
    const { getTotal } = useCart();
    const { darkMode } = useTheme();
    const [installments, setInstallments] = useState('');
    const [cvv, setCvv] = useState('');
    const user = { name: 'Valentina Aguirre' };
    const card = { type: 'Mastercard', last4: '1234', bank: 'Banco BBVA' };

    return (
        <div className={`min-h-screen flex flex-col items-center pt-12 ${darkMode ? 'bg-dark' : 'bg-gray-100'}`}>
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row p-8 gap-8 border border-gray-100">
                {/* Main payment form */}
                <div className="flex-1 min-w-[300px]">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">Para terminar, confirma tu pago <span className="text-primary text-base font-normal ml-2 cursor-pointer">Promos y beneficios</span></h2>
                    <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-3 mb-8 border border-gray-100">
                        <div className="flex items-center gap-2">
                            <span className="inline-block w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
                            </span>
                            <span className="font-medium text-gray-900">{user.name}</span>
                            <button className="ml-auto text-primary text-sm font-medium hover:underline">Cerrar sesión</button>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-block w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                            </span>
                            <span className="font-medium text-gray-900">{card.type} ****{card.last4}</span>
                            <span className="text-xs text-gray-500 ml-2">{card.bank}</span>
                            <button className="ml-auto text-primary text-sm font-medium hover:underline">Modificar</button>
                        </div>
                    </div>
                    <div className="mb-5">
                        <label className="block text-gray-800 mb-1 font-medium">Cuotas</label>
                        <select value={installments} onChange={e => setInstallments(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-primary focus:outline-none">
                            <option value="">Elige</option>
                            <option value="1">1 cuota</option>
                            <option value="3">3 cuotas</option>
                            <option value="6">6 cuotas</option>
                            <option value="12">12 cuotas</option>
                        </select>
                    </div>
                    <div className="mb-8">
                        <label className="block text-gray-800 mb-1 font-medium">Código de seguridad</label>
                        <div className="flex items-center gap-2">
                            <input type="password" maxLength={3} value={cvv} onChange={e => setCvv(e.target.value.replace(/[^0-9]/g, ''))} className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Últimos 3 números en el dorso." />
                            <span className="inline-block w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
                                <svg className="w-8 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 32 24"><rect x="2" y="4" width="28" height="16" rx="2" fill="#fff" stroke="#888" /><text x="16" y="16" textAnchor="middle" fontSize="10" fill="#888">***</text></svg>
                            </span>
                        </div>
                    </div>
                </div>
                {/* Order summary */}
                <div className="w-full md:w-80 bg-white rounded-2xl border border-primary/20 p-6 flex flex-col gap-4 self-start shadow-md">
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-primary"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg> Mi tienda</h3>
                    <div className="flex justify-between text-gray-700"><span>Productos</span><span className="font-medium">${getTotal().toFixed(2)}</span></div>
                    <div className="flex justify-between text-gray-900 font-bold text-lg"><span>Pagas</span><span>${getTotal().toFixed(2)}</span></div>
                    <button className="w-full mt-4 py-2 bg-primary hover:bg-accent text-white rounded-lg text-lg font-semibold transition-colors duration-200">Pagar</button>
                </div>
            </div>
            <div className="mt-8 text-sm text-gray-400">Demo visual de pasarela de pago</div>
        </div>
    );
}
