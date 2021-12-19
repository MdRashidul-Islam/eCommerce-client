import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

import { Link, Outlet } from "react-router-dom";
import background from "../../../img/dots.svg";
import "./Dahboard.css";
import useAuth from "../../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const drawerWidth = 240;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { admin, logOut } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="all-link">
      {!admin && (
        <Link to="myOrders">
          <button className="cart-btn">My Orders</button>
        </Link>
      )}
      {!admin && (
        <Link to="feedback">
          <button className="cart-btn">Comment</button>
        </Link>
      )}
      {admin && (
        <Link to="addProduct">
          <button className="cart-btn">AddProduct</button>
        </Link>
      )}
      {admin && (
        <Link to="makeAdmin">
          <button className="cart-btn">Make Admin</button>
        </Link>
      )}
      {admin && (
        <Link to="manageAllProducts">
          <button className="cart-btn">Manage All Products</button>
        </Link>
      )}
      {admin && (
        <Link to="manageAllOrders">
          <button className="cart-btn">Manage All Orders</button>
        </Link>
      )}
      <br /> <br /> <br /> <br /> <br /> <br /> <br />
      <Link to="/">
        <button className="cart-btn">
          {" "}
          <FontAwesomeIcon icon={faBackward} /> Home
        </button>
      </Link>
      <Link to="/">
        <button onClick={logOut} className="auth">
          Log Out
        </button>
      </Link>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          background: "none",
          boxShadow: 0,
          m: 0,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        // style={{
        //   background: `url(${background})`,
        //   backgroundSize: "cover",
        //   minHeight: "100vh",
        //   width: "100%",
        //   backgroundColor: "#10121b",
        // }}
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
        <Toolbar />
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  window: PropTypes.func,
};

export default Dashboard;
