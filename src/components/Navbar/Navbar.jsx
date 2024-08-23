'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavIcon from '../../../public/Assets/NavIcon.png'
import Logo from '../../../public/Assets/Logo.png'
import { CiSearch, CiHeart, CiMenuBurger } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoMdClose } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import './Navbar.css';
import Product from '../Product/Product'
import About from '../Product/About/About'
// import { useRouter } from 'next/router';

function Navbar(){
    // const router = useRouter();

	const menuBarList = [
		"Home",
		"Shop",
		"Skills",
		"About",
		"Contact Us"
	]
	const [sideNavbarOpen, setSideNavbarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
    // const handleWishlistClick = () => {
    //     router.push('/wishlist');
    // };
    const handleSearchClick = () => {
		setSearchOpen((prev) => !prev);
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<header>
			<section className="header-top">
				<div className="header-top-item mobile">
					<Image src={NavIcon} alt="headerTopLogo" />
					<p>Lorem ipsum dolor</p>
				</div>
				<div className='header-top-item mobile'>
					<Image src={NavIcon} alt="headerTopLogo" />
					<p>Lorem ipsum dolor</p>
				</div>
				<div className='header-top-item'>
					<Image src={NavIcon} alt="headerTopLogo" />
					<p>Lorem ipsum dolor</p>
				</div>
			</section>

			<section className="header-body">
				<div className="company-logo">
					<div onClick={() => setSideNavbarOpen((prev) => !prev)} className="burger-icon-link" href="#">
						<CiMenuBurger className='burger-icon' />
					</div>
					<Link href="#">
						<Image src={Logo} alt="Company-Logo" />
					</Link>

					{sideNavbarOpen && <div className="header-navbar-list-cont">
						<IoMdClose onClick={() => setSideNavbarOpen((prev) => !prev)} className="close-icon"  />
						<div className="nav-lists">
							{menuBarList.map((list, index) => {
								return (
									<Link key={index} href='#' className="nav-items">
										{list}
									</Link>
								)
							} )}
						</div>
					</div>
					}

				</div>
				<div className="company-title">
					<h1>LOGO</h1>
				</div>
				<div className="header-nav-icons">
					<div className="search-container">
						{searchOpen && (
							<input
								type="text"
								className="search-input"
								placeholder="Search Items..."
								value={searchQuery}
								onChange={handleSearchChange}
							/>
						)}
						<CiSearch className='nav-icons' onClick={handleSearchClick} />
					</div>
					<div>
                    <Link href='/wishlist' >
                            <CiHeart className='nav-icons'/>
                        </Link>
					</div>
					<div>
						<Link href="#">
							<LiaShoppingBagSolid  className='nav-icons' />
						</Link>
					</div>
					<div className='mobile'>
						<Link href="#">
							<IoPersonOutline className='nav-icons' />
						</Link>
					</div>
					<div className="mobile">
						<select name="languages" className='select'>
							<option value="ENG">ENG</option>
							<option value="ESP">ESP</option>
							<option value="FRA">FRA</option>
						</select>
					</div>
				</div>
			</section>

			<section className='header-footer'>
				<nav>
					<div className="footer-item footer-item-active">
						<Link href="#"  className='link-txt'>
							<p>HOME</p>
						</Link>
						<p className='divider'>|</p>
					</div>
					<div className="footer-item">
						<Link href="#" className='link-txt'>
							<p>SHOP</p>
						</Link>
					</div>
					<div className="footer-item mobile">
						<Link href="#" className='link-txt'>
							<p>SKILLS</p>
						</Link>
					</div>
					<div className="footer-item mobile">
						<Link href="#" className='link-txt'>
							<p>STORIES</p>
						</Link>
					</div>
					<div className="footer-item mobile">
						<Link href="#" className='link-txt'>
							<p>ABOUT</p>
						</Link>
					</div>
					<div className="footer-item mobile">
						<Link href="#" className='link-txt'>
							<p>CONTACT US</p>
						</Link>
					</div>
				</nav>

			</section>
			<About/>
            <Product searchQuery={searchQuery.toLowerCase()}/>
		</header>
	)
}

export default Navbar;
