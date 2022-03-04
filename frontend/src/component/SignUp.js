import React, { useState ,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';


function SignUp() {
    const [user,setUser] = useState({
        name:"",
        email:"",
        password:""
    })

    const navigate = useNavigate();

    //for private component i.e only if there is a user register then oly it will navigate to components
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if(auth) {
            navigate('/')
        }
    })

    const {name,email,password} = user ;

    const onChangeText = (e) => {
        const {name,value} = e.target;   //it will target the value and name from input box
        setUser({...user,[name]:value});
    }

    // const onChangeText = (event) => {
    //     setUser({...user,[event.target.name]:event.target.value})
    // }

    // const onChangeText = (event) => {
    //    let name = event.target.name;
    //   let value = event.target.value
    //         setUser({...user,[name]:value})
    //     }

    const collectData =async () => {
        // console.log(name,email,password);
        // setUser({name:"",email:"",password:""});

        //signup api integrated
        let result =await fetch('http://localhost:5000/register',{
            method:"POST",
            body:JSON.stringify({name,email,password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        result = await result.json();
        // console.log(result);
        //to store the data in local storage
        localStorage.setItem("user",JSON.stringify(result.result));
        localStorage.setItem("token",JSON.stringify(result.auth));

        toast.success("Signup Successfully")
        //it will navigate to default path
        navigate('/')
        
    }

  return (
    <div>
      <div className="container pt-5 pb-5">
          <div className="row py-5">
              <div className="col-md-6 col-12 mx-auto shadow-lg p-5 rounded bg-light">
                  <h2 className='text-center mb-4'><i className="fas fa-user text-primary"></i>SignUp</h2>

                  <div className="form-group mb-4">
                      <input type="text" name='name' id='' className='form-control' value={name} onChange={onChangeText} placeholder='Enter your Name' required/>
                  </div>
                  <div className="form-group mb-4">
                      <input type="email" name='email' id='' className='form-control' value={email} onChange={onChangeText} placeholder='Enter your Email' required />
                  </div>
                  <div className="form-group mb-4">
                      <input type="password" name='password' id='' className='form-control' value={password} onChange={onChangeText} placeholder='Enter your Password' required/>
                  </div>

                  <div className='form-group mb-4'>
                    <button onClick={collectData} className='btn btn-primary'>Signup</button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default SignUp


