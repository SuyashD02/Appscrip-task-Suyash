'use client';
import React, { useEffect, useState } from 'react';
import Classes from './Wishlist.module.css';

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlistItems(storedWishlist);
    }, []);

    return (
        <>
        <div className={Classes.wishlistContainer}>
            <h1>My Wishlist</h1>
            {wishlistItems.length > 0 ? (
                <div className={Classes.productContainer}>
                    {wishlistItems.map((product) => (
                        <div key={product.id} className={Classes.productCard}>
                            <img src={product.image} alt={product.title} className={Classes.productImage} />
                            <h2 className={Classes.productTitle}>{product.title}</h2>
                            <p className={Classes.productPrice}>${product.price}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Your wishlist is empty.</p>
            )}
            <h2>Comming Soon</h2>
        </div>
        </>
    );
}



