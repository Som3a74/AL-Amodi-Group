export type NavItem = {
    title: string;
    href: string;
    key: string;
};

export interface SocialLink {
    name: string;
    href: string;
    icon: string;
}

export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    icon: string;
}

export interface PortfolioItem {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    link?: string;
}

export interface TeamMember {
    id: string;
    name: string;
    title: string;
    imageUrl: string;
    bio: string;
    socialLinks?: SocialLink[];
}

export interface Locale {
    code: string;
    name: string;
    dir: "ltr" | "rtl";
}

// Product related types
export interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: number;
    price_per_m2?: number;
    price_per_m2_original?: number;
    originalPrice: number;
    discount: number;
    image: string;
    thumbnail: string;
    description: string;
    material: string;
    style: string;
    rating: number;
    reviews: number;
    isOnSale: boolean;
    isNew: boolean;
    inStock: boolean;
    features: string[];
    specifications: {
        dimensions: string;
        weight: string;
        warranty: string;
    };
}

// Cart related types
export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
}

export interface CartState {
    items: CartItem[];
    isOpen: boolean;
    total: number;
    itemCount: number;
}

export interface CartContextType {
    cart: CartState;
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    closeCart: () => void;
}