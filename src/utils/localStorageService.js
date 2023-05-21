export const localStorageService = {
    getCartItems: () => JSON.parse(localStorage.getItem('cart')) || [],
    setCartItems: (cart) => localStorage.setItem('cart', JSON.stringify(cart)),
    clearCartItems: () => localStorage.removeItem('cart')
};
