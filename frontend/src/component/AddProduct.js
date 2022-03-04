import React, { useState } from "react";
import { toast } from "react-toastify";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });

  const { name, price, category, company } = product;

  const onChangeText = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  //validation
  const [error, setError] = useState(false);

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false; //it will stop submit
    }

    setProduct({ name: "", price: "", category: "", company: "" });
    //addproduct API integrated
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    // console.log(result);
    toast.success("Product Added");
  };
  return (
    <div>
      <div className="container pt-5 pb-5">
        <div className="row py-5">
          <div className="col-md-6 col-12 mx-auto shadow-lg p-5 rounded bg-transparent">
            <h2 className="text-center text-dark border-dark fw-bold"><i className="far fa-plus-square text-primary"></i> AddProduct</h2>

            <div className="form-group mt-3">
              <input
                type="text"
                name="name"
                className="form-control text-dark border-dark bg-transparent"
                value={name}
                onChange={onChangeText}
                placeholder="Enter Product Name"
                required
              />
              {error && !name && <span className="text-danger align">enter valid name</span>}
            </div>

            <div className="form-group mt-3">
              <input
                type="text"
                name="price"
                className="form-control text-dark border-dark bg-transparent"
                value={price}
                onChange={onChangeText}
                placeholder="Enter Product Price"
                required
              />
               {error && !price && <span className="text-danger align">enter valid price</span>}
            </div>

            <div className="form-group mt-3">
              <input
                type="text"
                name="category"
                className="form-control text-dark border-dark bg-transparent"
                value={category}
                onChange={onChangeText}
                placeholder="Enter Product Category"
                required
              />
               {error && !category && <span className="text-danger align">enter valid category</span>}
            </div>

            <div className="form-group mt-3">
              <input
                type="text"
                name="company"
                className="form-control text-dark border-dark bg-transparent"
                value={company}
                onChange={onChangeText}
                placeholder="Enter Product Comapnay"
                required
              />
               {error && !company && <span className="text-danger align">enter valid company</span>}
            </div>

            <div className="form-group mt-2">
              <button
                onClick={addProduct}
                className="btn btn-outline-primary rounded w-100"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
