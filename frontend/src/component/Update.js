import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



function Update() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });

  const { name, price, category, company } = product;

  const onTextChange = (e) =>{
    const {name,value} = e.target;
    setProduct({...product,[name]:value})
  }

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDeatils();
  },[])


  const getProductDeatils = async () => {
    // console.log(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setProduct(result);
    
  }

  const updateProduct = async() => {
    console.log(name,price,category,company);

    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      method:"PUT",
      body:JSON.stringify({name,price,category,company}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    result = await result .json();
    console.log(result);
    toast.success("Update Successfully")
    navigate('/')

  }
  return (
    <div>
       <div className="container pt-5 pb-5">
        <div className="row py-5">
          <div className="col-md-6 col-12 mx-auto shadow-lg p-5 rounded bg-transparent">
            <h2 className="text-center text-dark mb-4">
              <i className="far fa-edit text-primary"></i> UpdateProduct
            </h2>

            <div className="form-group mb-4 ">
           
              <input
                type="text"
                name="name"
                id=""
                placeholder="Enter Product name .... "
                autoComplete="off"
                value={name}
                onChange={onTextChange}
                className="form-control text-dark border-dark border-2 bg-transparent"
                required
              />
            </div>
            

            <div className="form-group mb-4">
              <input
                type="text"
                name="price"
                id=""
                placeholder="Enter Product Price .... "
                autoComplete="off"
                value={price}
                onChange={onTextChange}
                className="form-control text-dark border-dark border-2 bg-transparent"
                required
              />
            </div>

            <div className="form-group mb-4">
              <input
                type="text"
                name="category"
                id=""
                placeholder="Enter Product category .... "
                autoComplete="off"
                value={category}
                onChange={onTextChange}
                className="form-control text-dark border-dark border-2 bg-transparent"
                required
              />
            </div>

            <div className="form-group mb-4">
              <input
                type="text"
                name="company"
                id=""
                placeholder="Enter Product company .... "
                autoComplete="off"
                value={company}
                onChange={onTextChange}
                className="form-control text-dark border-dark border-2 bg-transparent"
                required
              />
            </div>

            <div className="form-group mb-4">
              <input
                onClick={updateProduct}
                type="submit"
                value="Update Product"
                className="btn btn-outline-primary rouded "
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Update
