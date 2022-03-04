import React, { useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom'

function Nav() {
    const auth = localStorage.getItem('user');

    const navigate = useNavigate();
    //logout function
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }
  return (
    <div>
      <nav className="navbar navbar-expand-lg pt-1 pb-1 navbar-light bg-light">
        <div className="container-fluid mt-2 mb-2">
             <a className="navbar-brand fw-bold fs-2 "> <img className='logo' src="images/logo R.png" alt="" width={75}/>
                <div className=" d-inline-block ">
                     <span className='fs-1 text-danger'>F</span><span className='fs-3 text-dark'>ly</span>
                    <span className='fs-1 text-success'>B</span><span className='fs-3 text-dark'>uy</span>
                </div>
            </a>
            <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse-navbar-collapse" id='navabrNav'>
                {auth ? 
                    <ul className='navbar-nav  ms-auto fs-5'>
                        <li className="nav-item ms-3" >
                            <Link to={"/product"} className="nav-link text-dark"><i className="fab fa-product-hunt"></i>Products</Link>
                        </li>
                        <li className="nav-item ms-3" >
                            <Link to={"/addProduct"} className="nav-link text-dark"><i className="far fa-plus-square"></i>Add Product</Link>
                        </li>
                        {/* <li className="nav-item ms-3" >
                            <Link to={'/update'} className='nav-link text-dark'>Update Product</Link>
                        </li> */}
                        <li className='nav-item ms-3' >
                            <Link to={'/profile'} className='nav-link text-dark'><i className="far fa-user"></i>Profile</Link>
                        </li>
                        <li className="nav-item ms-3"> 
                            <Link onClick={logout} to={'/signup'} className='nav-link text-dark'><i className="fas fa-sign-out-alt"></i>Logout ({JSON.parse(auth).name}) </Link> 
                        </li>
                    </ul>
                        :
                        <ul className='navbar-nav ms-auto fs-5'>
                             <li className='nav-item ms-3'><Link to={'/login'} className='nav-link text-dark'><i className="far fa-user"></i>Login</Link></li>
                            <li className="nav-item ms-3"><Link to={'/signup'} className='nav-link text-dark'><i className="far fa-user"></i>SignUp</Link></li>
                        </ul>
                }    
                             
                    

                
            </div>
        </div>
      </nav>
    </div>
  )
}

export default Nav
