import type { CartState, Product, CartItem } from '@/types/types';

export const initialCartState: CartState = {
    items: [],
    isOpen: false,
    total: 0,
    itemCount: 0,
};

export type CartAction =
    | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
    | { type: 'REMOVE_FROM_CART'; payload: { id: number } }
    | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'TOGGLE_CART' }
    | { type: 'CLOSE_CART' }
    | { type: 'LOAD_CART'; payload: { items: CartItem[] } };

const calculateTotals = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { total, itemCount };
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const { product, quantity } = action.payload;
            const existingItem = state.items.find(item => item.product.id === product.id);
            
            let newItems: CartItem[];
            if (existingItem) {
                newItems = state.items.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                newItems = [...state.items, { id: product.id, product, quantity }];
            }
            
            const { total, itemCount } = calculateTotals(newItems);
            
            return {
                ...state,
                items: newItems,
                total,
                itemCount,
                isOpen: true,
            };
        }
        
        case 'REMOVE_FROM_CART': {
            const newItems = state.items.filter(item => item.id !== action.payload.id);
            const { total, itemCount } = calculateTotals(newItems);
            
            return {
                ...state,
                items: newItems,
                total,
                itemCount,
            };
        }
        
        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload;
            if (quantity <= 0) {
                return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: { id } });
            }
            
            const newItems = state.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            );
            const { total, itemCount } = calculateTotals(newItems);
            
            return {
                ...state,
                items: newItems,
                total,
                itemCount,
            };
        }
        
        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
                total: 0,
                itemCount: 0,
            };
        
        case 'TOGGLE_CART':
            return {
                ...state,
                isOpen: !state.isOpen,
            };
        
        case 'CLOSE_CART':
            return {
                ...state,
                isOpen: false,
            };
        
        case 'LOAD_CART': {
            const { items } = action.payload;
            const { total, itemCount } = calculateTotals(items);
            
            return {
                ...state,
                items,
                total,
                itemCount,
            };
        }
        
        default:
            return state;
    }
}; 