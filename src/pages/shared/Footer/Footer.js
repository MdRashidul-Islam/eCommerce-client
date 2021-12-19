import React from "react";
import { Grid } from "@mui/material";
import "./Footer.css";
import logo from "../../../img/download-removebg-preview.png";

const Footer = () => {
  return (
    <>
      <div className="subs-section">
        <h1>SUBSCRIBE TO OUR NEWSLETTER</h1>
        <h4>Get the latest updates on new products and upcoming sales</h4>
        <input type="text" />
        <button>Subscribe</button>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3}>
          <div className="categoris">
            <div>
              <img className="first-categoris" height="50%" src={logo} alt="" />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <div className="categoris ">
            <h3>CATEGORIES</h3>
            <p>Appliances</p>
            <p>Computers & Laptops</p>
            <p>Cameras</p>
            <p>Mobile Phone & Tablets</p>
            <p>Televisions</p>
            <p>Video Games & System</p>
            <p>Weekly Deals</p>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <div className="categoris">
            <h3>FURTHER INFO</h3>
            <p>About us</p>
            <p>Gift Certificates</p>
            <p>Theme Styles</p>
            <p>Contact us</p>
            <p>Blog</p>
            <p>Brands</p>
            <p>Sitemap</p>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <div className="categoris">
            <h3>CUSTOMER SERVICE</h3>
            <p>Help & FAQs</p>
            <p>Terms of Conditions</p>
            <p>Privacy Policy</p>
            <p>Online Returns Policy</p>
            <p>Rewards Program</p>
            <p>Rebate Center</p>
            <p>Partners</p>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
