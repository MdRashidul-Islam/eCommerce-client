import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageAllOrders = () => {
  const [orderedProducts, setOrderProducts] = useState([]);
  const [reload, setReload] = useState(true);
  useEffect(() => {
    fetch("https://infinite-wildwood-62452.herokuapp.com/orderedProducts")
      .then((res) => res.json())
      .then((data) => setOrderProducts(data));
  }, [reload]);

  //Delete order product
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure want to delete?");
    if (proceed) {
      const url = `https://infinite-wildwood-62452.herokuapp.com/orderedProducts/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            const remainingProduct = orderedProducts.filter(
              (prod) => prod._id !== id
            );
            setOrderProducts(remainingProduct);
            Swal.fire("Deleted!", "", "success");
          }
        });
    }
  };

  const handleConfirm = (id) => {
    const confirm = window.confirm("Are you sure want to Confirm?");
    if (confirm) {
      fetch(
        `https://infinite-wildwood-62452.herokuapp.com/orderedProducts/${id}`,
        {
          method: "PUT",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount === 1) {
            setReload(!reload);
            Swal.fire("Product Shipped successfully", "", "success");
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
          {orderedProducts?.map((product) => (
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
              <TableCell align="right">
                {product.payment ? "Paid" : "Pay"}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "green", color: "white" }}
                  onClick={() => handleConfirm(product._id)}
                >
                  {product.status}
                </Button>
              </TableCell>
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

export default ManageAllOrders;
