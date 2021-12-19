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

const ManageAllProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/products`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  }, []);

  // Delete order product
  const handleDelete = (id) => {
    const proceed = window.confirm("Are you sure want to delete?");
    if (proceed) {
      const url = `http://localhost:5000/products/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            const remainingProduct = allProducts.filter(
              (prod) => prod._id !== id
            );
            setAllProducts(remainingProduct);
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
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="right"
            >
              IMG
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="center"
            >
              PRODUCT ID
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="right"
            >
              PRODUCT NAME
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="right"
            >
              PRICE
            </TableCell>
            <TableCell
              sx={{ color: "white", fontWeight: "bold" }}
              align="right"
            >
              DELETE PRODUCT
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allProducts?.map((product) => (
            <TableRow
              key={product._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
                {product?.email}
              </TableCell> */}
              <TableCell align="right">
                <img src={product?.img} width="40px" alt="" />
              </TableCell>
              <TableCell align="right">{product?._id}</TableCell>
              <TableCell align="right">{product?.name}</TableCell>

              <TableCell align="right">{product?.price}</TableCell>

              <TableCell align="right">
                {" "}
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "red", color: "white" }}
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

export default ManageAllProduct;
