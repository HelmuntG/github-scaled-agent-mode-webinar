# Shopping Cart Feature Implementation Plan

## Overview
Implement a shopping cart feature for the OctoCAT Supply Chain Management application, matching the provided UI design. The cart will support adding/removing items, quantity updates, discounts, shipping, and order summary.

## Steps

1. **Create Cart Context**
   - Implement `CartContext.tsx` in `frontend/src/context/` to manage cart state globally (add, remove, update, persist to localStorage).
   - Create a custom hook `useCart.ts` in `frontend/src/hooks/` for easy cart access.

2. **Cart Page Component**
   - Create `Cart.tsx` in `frontend/src/components/` to display cart items in a table, allow quantity changes, removal, and show order summary (subtotal, discount, shipping, total).
   - Add coupon code input and update cart logic.

3. **Cart Icon in Navigation**
   - Create `CartIcon.tsx` in `frontend/src/components/` to show a cart icon with item count badge.
   - Add the icon to the navigation bar in `Navigation.tsx`.

4. **Integrate with Product Listing**
   - Update `Products.tsx` to use the cart context for adding items to the cart.

5. **Routing**
   - Add a `/cart` route in `App.tsx` for the cart page.

6. **Provider Setup**
   - Wrap the app in `CartProvider` in `main.tsx` to enable global cart state.

## Considerations
- Cart state is persisted in localStorage.
- Responsive design and dark/light mode support.
- Discounts and shipping are calculated in context.
- User experience: empty cart message, badge on cart icon, etc.

---

**References:**
- See `/frontend/src/components/entity/product/Products.tsx` for product listing integration.
- See `/frontend/src/components/Navigation.tsx` for navigation updates.
- See `/frontend/src/context/ThemeContext.tsx` for theme support.

---

*This issue tracks the implementation of the shopping cart feature as described above.*
