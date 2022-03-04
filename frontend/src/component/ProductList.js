import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products",{
      headers:{
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
    });
    result = await result.json();
    if (result) {
      getProducts();
      toast.warning("Deleted Successfully");
    }
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };
  return (
    <div className="container mt-5 mb-5">
      <h3 className="text-center"><i class="fa-solid fa-list text-primary"></i> Product List</h3>

      <div className="col-6 mx-auto">
      <div className="input-group mb-3 ">
        <input
          type="search"
          className="form-control border-dark"
          placeholder="search"
          onChange={searchHandle}
        
        />
      </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 shadow-lg p-5 table-responsive border-white">
          <table className="table text-center text-dark rounded-3 table-borderless ">
            <thead className="fs-4 tablehead">
              <tr>
                <th scope="col">Sl.No.</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Company</th>
                <th scope="col">Category</th>
                <th scope="col">Delete</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              {
              products.length>0 ? products.map((item, id) => {
                return (
                  <>
                    <tr key={id}>
                      <td >{id + 1}</td>
                      <td >{item.name}</td>
                      <td >$ {item.price}</td>
                      <td >{item.category}</td>
                      <td >{item.company}</td>
                      {/* delete product */}
                      <td >
                        <button
                          className="border-0"
                          onClick={() => {
                            deleteProduct(item._id);
                          }}
                        >
                          <i className="far fa-trash-alt text-danger"></i>
                        </button>
                      </td>
                      {/* update product */}
                      <td >
                        <Link className="border-0" to={`/update/${item._id}`}>
                          <i className="far fa-edit text-primary"></i>
                        </Link>
                      </td>
                    </tr>
                  </>
                );
              }) : <h3 className="text-center">No Result Found</h3>
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
