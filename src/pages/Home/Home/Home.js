import { Grid } from "@mui/material";
import React from "react";
import Footer from "../../shared/Footer/Footer";
import Navigation from "../../shared/Navigation/Navigation";
import Banner from "../Banner/Banner";
import HomeProducts from "../HomeProducts/HomeProducts";
import HotDeals from "../HotDeals/HotDeals";
import Slider from "../Slider/Slider";
import Testimonials from "../Testimonials/Testimonials";
import WhyShop from "../WhyShop/WhyShop";

const Home = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          {/* <Navigation /> */}
          <Banner />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>

      <HomeProducts />
      <HotDeals />
      <WhyShop />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
