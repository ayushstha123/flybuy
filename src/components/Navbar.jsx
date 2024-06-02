import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

const user=JSON.parse(localStorage.getItem('user'))

//show cart items
const{cart}=useSelector((state)=>({
  cart: state.cartSlice.cart
})) //Access the cart state

const navigate=useNavigate()

//logout function

const handleLogout=()=>{
  localStorage.clear()
  navigate('/login')

}

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <Link class="navbar-brand me-2" to="/">
          <h5>Fly<span className='text-danger'>buy</span> </h5>
        </Link>

        <button
          class="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarButtonsExample">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#">Homepage</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">Products</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">Search</a>
            </li>
            
          </ul>

        
        {/*check if user is logged in or not*/}
        {
          user ? (
          <>
          <Link to={'/cart'} className='m-4'>
          <i class="fas fa-shopping-cart"></i>
          <span className='badge rounded-pill badge-notification bg-danger'>{cart.length}</span>
            </Link>
            <div class="dropdown">
              <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
          {user.fname}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {
            user.isAdmin?
            (<>
            <li><Link class="dropdown-item" to={'/admin/dashboard'}>Admin Dashboard</Link></li>
            <li><Link class="dropdown-item" to={'/admin/orders'}>Admin Orders</Link></li>
            <li><Link class="dropdown-item" to={'/myorders'}>My Orders</Link></li>
            
            </>)
            :(<>
              <li><Link class="dropdown-item" to={'/profile'}>Profile</Link></li>
              <li><Link class="dropdown-item" to={'/myorders'}>My Orders</Link></li>
              </>)
            }
            <li><button class="dropdown-item" onClick={handleLogout}>Logout</button></li>
          
          </ul>
            </div>
          </>
          ) : (
            <div class="d-flex align-items-center">
            <Link to={'/login'} type="button" class="btn btn-link px-3 me-2">
              Login
            </Link>
            <Link to={'/register'} type="button" class="btn btn-primary me-3">
              Sign up for free
            </Link>
            
          </div>
          )
        }

        </div>
      </div>
    </nav>
  )
}

export default Navbar