# Ved-Stationary-Ecommerce-WebApp

An online platform for Ved Stationary, allowing users to browse products, add items to their cart, and complete purchases. The website also includes an admin dashboard for managing products, orders, and users.

## ✨ Features

### User Authentication
-   **Detail:** Provides a secure and seamless authentication experience. Users can create an account, log in, and log out. The system also handles protected routes, ensuring that only authenticated users can access certain pages like the product details, cart, and checkout.
-   **Implementation:**
    -   The UI is built with `React` and components from `LoginPage.jsx` and `RegisterPage.jsx`.
    -   State management is handled by `AuthContext.jsx`, which uses the `React Context API` to provide authentication state and functions throughout the application.
    -   The backend is powered by **Supabase**, which handles user data and authentication securely.
-   **APIs Used:**
    -   `supabase.auth.signUp()`: For new user registration.
    -   `supabase.auth.signInWithPassword()`: For user login.
    -   `supabase.auth.signOut()`: For user logout.
    -   `supabase.auth.onAuthStateChange()`: To listen for changes in the authentication state.

### Product Catalog
-   **Detail:** Users can browse a wide range of stationary products. The catalog page features filtering, sorting, and search functionality to help users find what they're looking for quickly.
-   **Implementation:**
    -   `ProductsPage.jsx` serves as the main container for the product catalog.
    -   `ProductGrid.jsx` and `ProductCard.jsx` are used to display the products in a responsive grid layout.
    -   `ProductFilters.jsx` and `ProductSearchBar.jsx` provide the filtering and search capabilities.
-   **APIs Used:**
    -   Products are fetched from a Supabase table. The `select()` method from the Supabase client is used to query all products.

### Shopping Cart
-   **Detail:** A fully functional shopping cart allows users to add products, update quantities, and remove items. The cart state is persisted throughout the user's session.
-   **Implementation:**
    -   The `CartPage.jsx` component renders the shopping cart interface.
    -   `CartContext.jsx` manages the state of the cart using the `React Context API`. It provides functions to add, remove, and update items in the cart.
-   **APIs Used:**
    -   The cart's state is managed locally within the browser using `React's useState` and `useContext` hooks. No external APIs are called for cart management.

### Checkout and Payment Integration
-   **Detail:** A smooth and secure checkout process is implemented using **Razorpay**. Users can enter their shipping details and complete the payment using various methods supported by Razorpay.
-   **Implementation:**
    -   `CheckoutPage.jsx` contains the form for shipping details.
    -   The payment flow is handled by a custom utility in `razorpay.js`.
    -   When the user clicks the "Pay Now" button, a request is made to a serverless function (or a backend endpoint) to create a Razorpay order.
    -   The Razorpay checkout modal is then opened with the `order_id` received from the backend.
-   **APIs Used:**
    -   **Razorpay API:**
        -   `POST /v1/orders`: Called from the backend to create an order.
        -   **Razorpay Web SDK:** The frontend uses the Razorpay SDK to display the checkout modal. It is configured with the `key_id` and the `order_id`.
    -   **Supabase API:**
        -   After a successful payment, the order details are saved to the `orders` table in the Supabase database.

### Admin Dashboard
-   **Detail:** A comprehensive dashboard for administrators to manage the e-commerce store. It provides an overview of key statistics and allows for order management.
-   **Implementation:**
    -   `AdminDashboard.jsx` is the main page for the admin panel.
    -   It includes components like `AdminStatsCards.jsx` for displaying statistics and `OrderTable.jsx` for managing orders.
    -   Admins can view order details and delete orders.
-   **APIs Used:**
    -   **Supabase API:** The dashboard heavily relies on the Supabase API to fetch, display, and manage data.
        -   `select()`: To retrieve orders and statistics.
        -   `delete()`: To remove orders from the database.

### Responsive Design & Dark Mode
-   **Detail:** The website is fully responsive and works seamlessly on desktops, tablets, and mobile devices. It also features a theme toggle for switching between light and dark modes.
-   **Implementation:**
    -   **Responsive Design:** Achieved using **Tailwind CSS**, a utility-first CSS framework.
    -   **Dark Mode:** Implemented using `ThemeContext.jsx` and Tailwind's dark mode utility. The selected theme is saved in the browser's local storage.
-   **APIs Used:**
    -   `localStorage.setItem()` and `localStorage.getItem()`: To persist the theme preference.

## 🛠️ Tech Stack

-   **Frontend:** React, Vite, Tailwind CSS
-   **UI Components:** Radix UI, Lucide React
-   **Routing:** React Router
-   **State Management:** React Context API
-   **Backend:** Supabase (for database, authentication, and storage)
-   **Payment Gateway:** Razorpay

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v14 or later)
-   npm

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/nishant0820/Ved-Stationary-Ecommerce-WebApp.git
    ```
2.  **Install NPM packages**
    ```sh
    npm install
    ```
3.  **Set up Supabase**
    -   Create a new project on [Supabase](https://supabase.com/).
    -   In your Supabase project, go to the SQL Editor and run the schema from `schema.sql` to create the necessary tables.
    -   Go to `Settings` > `API` and find your Project URL and `anon` public key.
    -   Create a `.env` file in the root of the project and add your Supabase credentials:
        ```
        VITE_SUPABASE_URL=YOUR_SUPABASE_URL
        VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
        ```
4.  **Set up Razorpay**
    -   Create an account on [Razorpay](https://razorpay.com/).
    -   Get your Key ID and Key Secret from the Razorpay dashboard.
    -   Add them to your `.env` file:
        ```
        VITE_RAZORPAY_KEY_ID=YOUR_RAZORPAY_KEY_ID
        ```

5.  **Run the development server**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 📄 Pages

### Home Page
The landing page of the website, featuring a hero section, featured products, and testimonials.


### Products Page
Displays all the products with options to filter and sort. Users can search for products using the search bar.


### Product Detail Page
Shows detailed information about a single product. Users can add the product to their cart from this page.


### Cart Page
Displays the items in the user's shopping cart. Users can update quantities or remove items from the cart.


### Checkout Page
A form for users to enter their shipping details and proceed to payment.


### Login and Register Pages
Secure forms for user authentication.


## 👑 Admin Dashboard

The admin dashboard provides administrators with the tools to manage the e-commerce site efficiently.

### Features for Admins:
-   **Statistics Overview:** View key metrics like total orders, total revenue, and new users at a glance.
-   **Order Management:** View, update the status of, and delete orders.
-   **Product Management:** (Future Scope) Add, edit, and remove products from the store.
-   **User Management:** (Future Scope) View and manage user accounts.

---

Happy Coding! 🚀
