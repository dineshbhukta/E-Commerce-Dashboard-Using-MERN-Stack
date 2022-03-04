import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'


function Login() {
  const [user,setUser] =useState({
    email:"",
    password:""
  })

  const {email,password} = user;

  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if(auth) {
      navigate('/');
    }
  },[]);

  const onChangeText = (e) => {
    const {name,value} = e.target;
    setUser({...user,[name]:value});
  }

  const handleLogin =async () => {
    // console.log(email,password);
    setUser({email:"",password:""});

    //login api integration
    let result =await fetch("http://localhost:5000/login", {
      method:"POST",
      body:JSON.stringify({email,password}),
      headers:{
        "Content-Type":"application/json"
      }
    })
    result = await result.json();
    // console.log(result);
    if(result.auth){
      localStorage.setItem("user",JSON.stringify(result.user));
      localStorage.setItem("token",JSON.stringify(result.auth));
      toast.success("Login successfully")
      navigate("/")
    }else{
      toast.error("Invalid Login")
    }
  }
  return (
    <div>
      <div className="container  pt-5 pb-5">
        <div className="row py-5">
          <div className="col-md-6 col-12 mx-auto shadow-lg p-5 rounded bg-light">
            <h2 className='text-center'> <i className="fas fa-user text-primary" />Login</h2>
            
            <div className="form-group mb-4">
              <input type="email" name='email' className='form-control' value={email} onChange={onChangeText} placeholder='enter user email' required/>
            </div>
            <div className='form-group mb-4'>
              <input type="password" name='password' className='form-control' value={password} onChange={onChangeText} placeholder='enter your password' />
            </div>
            <div className="form-group mb-4">
              <button onClick={handleLogin} className='btn btn-outline-primary rounded w-100'>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
