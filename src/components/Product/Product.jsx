'use client';
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import styles from './Product.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Arrow from '../../../public/Assets/arrow-left.png';
import TickIcon from '../../../public/Assets/tik.png';
import Image from 'next/image';

function Product({ searchQuery }) {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedRating, setSelectedRating] = useState('');
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [ratingOpen, setRatingOpen] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [sortOption, setSortOption] = useState('default');
    const [sortOpen, setSortOpen] = useState(false);
    const [sortModalOpen, setSortModalOpen] = useState(false);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(storedWishlist);
    }, []);

    const toggleWishlist = (productId) => {
        setWishlist(prevWishlist => {
            const updatedWishlist = prevWishlist.includes(productId)
                ? prevWishlist.filter(id => id !== productId)
                : [...prevWishlist, productId];

            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            return updatedWishlist;
        });
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategories(prevCategories =>
            prevCategories.includes(category)
                ? prevCategories.filter(cat => cat !== category)
                : [...prevCategories, category]
        );
    };

    const handleRatingChange = (e) => {
        setSelectedRating(e.target.value);
    };

    const handleSortChange = (option) => {
        setSortOption(option);
        setSortModalOpen(false);
    };

    const filteredProducts = products
        .filter(product =>
            product.title && product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter(product =>
            selectedCategories.length === 0 || selectedCategories.includes(product.category)
        )
        .filter(product =>
            selectedRating === '' || Math.floor(product.rating.rate) === Number(selectedRating)
        );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortOption) {
            case 'priceLowToHigh':
                return a.price - b.price;
            case 'priceHighToLow':
                return b.price - a.price;
            case 'ratingHighToLow':
                return b.rating.rate - a.rating.rate;
            case 'ratingLowToHigh':
                return a.rating.rate - b.rating.rate;
            default:
                return 0;
        }
    });

    const renderStars = (rating) => {
        return (
            <>
                {Array.from({ length: 5 }, (_, index) => (
                    <span key={index} className={`${styles.star} ${index < rating ? styles.filled : ''}`}>&#9733;</span>
                ))}
            </>
        );
    };

    return (
        <div className={styles.container}>
            <div className={styles.separator}></div>
            <div className={styles.topBar}>
                <div className={styles.listItems}>
                <span className={styles.itemCount}>Items: {filteredProducts.length}</span>
                <button
                    className={styles.hideSidebarButton}
                    onClick={() => setSidebarVisible(prev => !prev)}
                >
                    {sidebarVisible ? 'HIDE SIDEBAR' : 'SHOW SIDEBAR'}
                </button>
                </div>
                <div className={styles.sortContainer}>
                <h4
                    onClick={() => setSortModalOpen(prev => !prev)}
                    className={styles.sortHeader}
                >
                    SORT BY
                    <Image src={Arrow} alt="Arrow" className={`${styles.arrow} ${sortModalOpen ? styles.arrowOpen : ''}`} />
                </h4>
                {sortModalOpen && (
                    <div className={styles.sortModal}>
                        {['default', 'priceLowToHigh', 'priceHighToLow', 'ratingHighToLow', 'ratingLowToHigh'].map(option => (
                            <div
                                key={option}
                                className={styles.sortOption}
                                onClick={() => handleSortChange(option)}
                            >
                                {option === sortOption && (
                                    <Image src={TickIcon} alt="Tick" className={styles.tickIcon} />
                                )}
                                {option === 'default' ? 'RECOMMENDED' : option.replace(/([A-Z])/g, ' $1').toUpperCase()}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.mainSection}>
                {sidebarVisible && (
                    <div className={styles.filters}>
                        <h3>Filter By</h3>
                        <div className={styles.separator}></div>
                        <div>
                            <h4 onClick={() => setCategoryOpen(prev => !prev)} className={styles.filterHeader}>
                                CATEGORY
                                <Image src={Arrow} alt="Arrow" className={`${styles.arrow} ${categoryOpen ? styles.arrowOpen : ''}`} />
                            </h4>
                            {categoryOpen && (
                                <div className={styles.filterContent}>
                                    {categories.map((category, index) => (
                                        <label key={index} className={styles.filterLabel}>
                                            <input
                                                type="checkbox"
                                                value={category}
                                                checked={selectedCategories.includes(category)}
                                                onChange={handleCategoryChange}
                                                className={styles.checkbox}
                                            />
                                            {category}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={styles.separator}></div>
                        <div>
                            <h4 onClick={() => setRatingOpen(prev => !prev)} className={styles.filterHeader}>
                                RATING
                                <Image src={Arrow} alt="Arrow" className={`${styles.arrow} ${ratingOpen ? styles.arrowOpen : ''}`} />
                            </h4>
                            {ratingOpen && (
                                <div className={styles.filterContent}>
                                    {[1, 2, 3, 4, 5].map(rating => (
                                        <label key={rating} className={styles.filterLabel}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={rating}
                                                checked={selectedRating === String(rating)}
                                                onChange={handleRatingChange}
                                                className={styles.radio}
                                            />
                                            {renderStars(rating)}
                                            {rating}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <div className={styles.productContainer}>
                    {sortedProducts.map(product => (
                        <div key={product.id} className={styles.productCard}>
                            <img src={product.image} alt={product.title} className={styles.productImage} />
                            <h2 className={styles.productTitle}>{product.title}</h2>
                            <p className={styles.productPrice}>${product.price}</p>
                            <Link href="#" style={{ textDecoration: "underline",fontsize: "14px",}}>Sign up</Link>{" or "}<Link href="#">Create an account to view pricing </Link>
                            <button
                                className={styles.wishlistButton}
                                onClick={() => toggleWishlist(product.id)}
                            >
                                <FontAwesomeIcon
                                    icon={wishlist.includes(product.id) ? solidHeart : regularHeart}
                                    className={wishlist.includes(product.id) ? styles.filledHeart : styles.emptyHeart}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Product;
