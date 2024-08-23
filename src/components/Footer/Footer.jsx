"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import GpayIcon from "../../../public/Assets/G pay.png";
import MasterCardIcon from "../../../public/Assets/MasterCard.png";
import OpayIcon from "../../../public/Assets/PayPal.png";
import PayPalIcon from "../../../public/Assets/G pay.png";
import AmexIcon from "../../../public/Assets/Amex.png";
import ApplePayIcon from "../../../public/Assets/Apple pay.png";
import LangIcon from "../../../public/Assets/Language.png";
import Arrow from "../../../public/Assets/arrow-right.png";
import InstaIcon from "../../../public/Assets/Insta.png";
import LinkedInIcon from "../../../public/Assets/LinkedIn.png";

import Classes from "./Footer.module.css";

const Footer = () => {
  // State for managing dropdowns
  const [showMettaMuse, setShowMettaMuse] = useState(false);
  const [showQuickLinks, setShowQuickLinks] = useState(false);
  const [showFollowUs, setShowFollowUs] = useState(false);

  // State to track if the view is mobile
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Function to check if the current view is mobile
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 690); // Define mobile width here
    };

    // Check on component mount
    checkMobileView();

    // Add event listener on window resize
    window.addEventListener("resize", checkMobileView);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  return (
    <footer className={Classes.footerMain}>
      <div>
        <div className={Classes.letterAndcontact}>
          <div className={Classes.newsletter}>
            <p className={Classes.footHead}>BE THE FIRST TO KNOW</p>
            <p className={Classes.mainP}>Sign up for updates from mettā muse.</p>
            <div className={Classes.inputsBtn}>
              <input type="email" placeholder="Enter your e-mail..." />
              <button className={Classes.subscribeBtn}>subscribe</button>
            </div>
          </div>

          <div className={Classes.contactDetails}>
            <div className={Classes.contactUs}>
              <p className={Classes.footHead}>CONTACT US</p>
              <div className={Classes.contactUsdetails}>
                <p className={Classes.mainP}>+44 221 133 5360</p>
                <span className={Classes.diamond}>&diams;</span>
                <p className={Classes.mainP}>customercare@mettamuse.com</p>
              </div>
            </div>
            <div className={Classes.currency}>
              <p className={Classes.footHead}>CURRENCY</p>
              <Image src={LangIcon} alt="Language Icon" />
              <p className={Classes.smallText}>
                Transactions will be completed in Euros and a currency reference is available on hover.
              </p>
            </div>
          </div>
        </div>

        <hr />

        <div className={Classes.actionsLinksContainer}>
          {/* MettaMuse Section */}
          <div className={Classes.mettaMuse}>
            <p
              className={Classes.footHead}
              onClick={() => isMobileView && setShowMettaMuse(!showMettaMuse)}
            >
              mettā muse
              {isMobileView && (
                <span className={Classes.arrowIcon}>
                  <Image src={Arrow} alt="Arrow Icon" />
                </span>
              )}
            </p>
            {(showMettaMuse || !isMobileView) && (
              <ul className={Classes.mt20}>
                <li>About Us</li>
                <li>Stories</li>
                <li>Artisans</li>
                <li>Boutiques</li>
                <li>Contact Us</li>
                <li>EU Compliance Docs</li>
              </ul>
            )}
          </div>

          {/* Quick Links Section */}
          <div className={Classes.quickLinks}>
            <p
              className={Classes.footHead}
              onClick={() => isMobileView && setShowQuickLinks(!showQuickLinks)}
            >
              QUICK LINKS
              {isMobileView && (
                <span className={Classes.arrowIcon}>
                  <Image src={Arrow} alt="Arrow Icon" />
                </span>
              )}
            </p>
            {(showQuickLinks || !isMobileView) && (
              <ul className={Classes.mt20}>
                <li>Orders & Shipping</li>
                <li>Join/Login as a Seller</li>
                <li>Payment & Pricing</li>
                <li>Return & Refunds</li>
                <li>FAQs</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            )}
          </div>

          {/* Follow Us Section */}
          <div className={Classes.contactSection}>
            <div className={Classes.followUs}>
              <p
                className={Classes.footHead}
                onClick={() => isMobileView && setShowFollowUs(!showFollowUs)}
              >
                FOLLOW US
                {isMobileView && (
                  <span className={Classes.arrowIcon}>
                    <Image src={Arrow} alt="Arrow Icon" />
                  </span>
                )}
              </p>
              {(showFollowUs || !isMobileView) && (
                <div className={Classes.socialAcc}>
                <a href="https://www.instagram.com/suyash_dattawade" target="_blank" rel="noopener noreferrer">
                  <Image src={InstaIcon} alt="Instagram Icon" />
                </a>
                <a href="https://www.linkedin.com/in/suyash-dattawade" target="_blank" rel="noopener noreferrer">
                  <Image src={LinkedInIcon} alt="LinkedIn Icon" />
                </a>
              </div>
              )}
            </div>

            {/* Payment Methods Section */}
            <div className={Classes.paymentMethodsContainer}>
              <p className={Classes.mettaMuse}>mettā muse ACCEPTS</p>
              <div className={Classes.payments}>
                <Image src={GpayIcon} alt="Google Pay Icon" />
                <Image src={MasterCardIcon} alt="MasterCard Icon" />
                <Image src={PayPalIcon} alt="PayPal Icon" />
                <Image src={AmexIcon} alt="Amex Icon" />
                <Image src={ApplePayIcon} alt="Apple Pay Icon" />
                <Image src={OpayIcon} alt="Opay Icon" />
              </div>
            </div>
          </div>
        </div>

        <div className={Classes.copyright}>
          <p className={Classes.mainP}>
            Copyright © 2023 mettamuse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
