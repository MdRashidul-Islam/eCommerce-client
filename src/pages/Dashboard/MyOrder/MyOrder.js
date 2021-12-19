import { useEffect, useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";

import useAuth from "../../../hooks/useAuth";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const MyOrder = () => {
  const { user } = useAuth();
  const [orderedProduct, setOrderProduct] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/orderedProducts/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setOrderProduct(data));
  }, [user.email]);

  // Delete order product
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure want to delete?");
    if (proceed) {
      const url = `http://localhost:5000/orderedProducts/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            const remainingProduct = orderedProduct.filter(
              (prod) => prod._id !== id
            );
            setOrderProduct(remainingProduct);
            Swal.fire("Deleted!", "", "success");
          }
        });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="table-style">
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Product Img
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Product Id
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Price
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="right"
            >
              Quantity
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="center"
            >
              email
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="center"
            >
              Phone
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="right"
            >
              Payment
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="right"
            >
              Status
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="right"
            >
              Remove
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderedProduct?.map((product) => (
            <TableRow
              key={product._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={product?.img} width="40px" alt="" />
              </TableCell>
              <TableCell component="th" scope="row">
                {product?._id}
              </TableCell>
              <TableCell align="right">{product?.price}</TableCell>
              <TableCell align="center">{product?.quantity}</TableCell>
              <TableCell align="right">{product?.email}</TableCell>
              <TableCell align="right">{product?.phone}</TableCell>
              <TableCell align="right">
                {product?.payment ? (
                  "Paid"
                ) : (
                  <Link to={`/dashboard/payment/${product._id}`}>
                    <button className="cart-btn">Pay</button>
                  </Link>
                )}
              </TableCell>

              <TableCell align="right">{product.status}</TableCell>
              <TableCell align="right">
                {" "}
                <Button
                  variant="contained"
                  sx={{ background: "red", color: "white" }}
                  onClick={() => handleDelete(product._id)}
                >
                  delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyOrder;
