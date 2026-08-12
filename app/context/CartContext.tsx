"use client";

import {
    createContext,
    useContext,
    useReducer,
    ReactNode,
    useEffect,
    useRef,
} from "react";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    image_url: string;
    quantity: number;
};

type CartState = {
    items: CartItem[];
};

type CartAction =
    | {
          type: "ADD_ITEM";
          payload: Omit<CartItem, "quantity">;
          quantity: number;
      }
    | { type: "REMOVE_ITEM"; payload: { id: string } }
    | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
    | { type: "SET_CART"; payload: CartItem[] }
    | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.items.find(
                (item) => item.id === action.payload.id,
            );
            if (existing) {
                return {
                    items: state.items.map((item) =>
                        item.id === action.payload.id
                            ? {
                                  ...item,
                                  quantity: item.quantity + action.quantity,
                              }
                            : item,
                    ),
                };
            }
            return {
                items: [
                    ...state.items,
                    { ...action.payload, quantity: action.quantity },
                ],
            };
        }

        case "REMOVE_ITEM": {
            return {
                items: state.items.filter(
                    (item) => item.id !== action.payload.id,
                ),
            };
        }

        case "UPDATE_QUANTITY": {
            return {
                items: state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item,
                ),
            };
        }

        case "SET_CART": {
            return { items: action.payload };
        }

        case "CLEAR_CART": {
            return { items: [] };
        }

        default:
            return state;
    }
}

const CartContext = createContext<{
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });
    const isFirstRender = useRef(true);

    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) {
            try {
                dispatch({ type: "SET_CART", payload: JSON.parse(stored) });
            } catch {
                // Corrupted data — ignore and start with an empty cart
            }
        }
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        localStorage.setItem("cart", JSON.stringify(state.items));
    }, [state.items]);

    const addItem = (item: Omit<CartItem, "quantity">, quantity: number = 1) =>
        dispatch({ type: "ADD_ITEM", payload: item, quantity });

    const removeItem = (id: string) => {
        dispatch({ type: "REMOVE_ITEM", payload: { id } });
    };

    const updateQuantity = (id: string, quantity: number) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
}
