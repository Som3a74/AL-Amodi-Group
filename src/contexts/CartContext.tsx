import { createContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartContextType, Product } from '@/types/types';
import { initialCartState, cartReducer } from './cart-utils';

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, dispatch] = useReducer(cartReducer, initialCartState);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                dispatch({ type: 'LOAD_CART', payload: { items: parsedCart } });
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart.items));
    }, [cart.items]);

    const addToCart = (product: Product, quantity: number = 1) => {
        dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    };

    const removeFromCart = (id: number) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
    };

    const updateQuantity = (id: number, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const toggleCart = () => {
        dispatch({ type: 'TOGGLE_CART' });
    };

    const closeCart = () => {
        dispatch({ type: 'CLOSE_CART' });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                toggleCart,
                closeCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

 