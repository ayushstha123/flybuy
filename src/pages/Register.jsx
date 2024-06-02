import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerApi } from '../api/Api'
import { toast } from 'react-toastify'

const Register = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confpassword, setConfpassword] = useState('')

  const navigate= useNavigate();

  //form error
  const [fnameError,setFnameError]=useState('')
  const [lnameError,setLnameError]=useState('')
  const [emailError,setEmailError]=useState('')
  const [passwordError,setPasswordError]=useState('')
  const [confpasswordError,setConfpasswordError]=useState('')

  // const handleChangeFirstname = (e) => {
  //   setFirstname(e.target.value)
  // }

  // const handleChangeLastname = (e) => {
  //   setLastname(e.target.value)
  // }

  // const handleChangeEmail = (e) => {
  //   setEmail(e.target.value)
  // }

  // const handleChangePassword = (e) => {
  //   setPassword(e.target.value)
  // }

  // const handleChangeConfpassword = (e) => {
  //   setConfpassword(e.target.value)
  // }

  //  on submit function
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(firstname, lastname, email, password, confpassword)
    if(!validate()){
      return
    }

    //calling api
    registerApi({
      fname: firstname,
      lname: lastname,
      email: email,
      password: password
    }).then(res=>{
      navigate('/login')
       toast.success(res.data.message)
      // console.log(res)
    }).catch(err =>{
      toast.error('Something went wrong!')
    })
  }


//validate
  const validate=()=>{
    var isValid= true

    if(firstname.trim()===''){
      setFnameError('First name is required')
      isValid= false
    }
    
    if(lastname.trim()===''){
      setLnameError('Last name is required')
      isValid= false
    }

    if(email.trim()===''){
      setEmailError('Email is required')
      isValid= false
    }

    if(password.trim()===''){
      setPasswordError('Password is required')
      isValid= false
    }

    if(confpassword.trim()===''){
      setConfpasswordError('Confirm password is required')
      isValid= false
    }

    if(password!== confpassword){
      setConfpasswordError('Password and confirm password must be same')
      isValid=false
    }

    return isValid;

  }

  return (
    <div className='container w-25 mt-4'>
        <h3 className='text-center'>Create a new account</h3>
        <form action="" className='mt-4'>
            <label htmlFor="fname">Firstname</label>
            <input type="text" className='form-control' onChange={(e)=> setFirstname(e.target.value)} />
            {
              fnameError && <p className='text-danger'>{fnameError}</p>
            }
            {/* lastname */}
            <label htmlFor="lname">Lastname</label>
            <input type="text" className='form-control' onChange={(e)=> setLastname(e.target.value)}/>
            {
              lnameError && <p className='text-danger'>{lnameError}</p>
            }

            <label htmlFor="email">Email address</label>
            
            <input type="email" className='form-control' onChange={(e)=> setEmail(e.target.value)}/>
            {
              emailError && <p className='text-danger'>{emailError}</p>
            }

            <label htmlFor="password">Password</label>

            <input type="password" className='form-control' onChange={(e)=> setPassword(e.target.value)} />
            {
              passwordError && <p className='text-danger'>{passwordError}</p>
            }

            <label htmlFor="confpassword">Confirm Password</label>
            <input type="password" className='form-control' onChange={(e)=> setConfpassword(e.target.value)} />
            {
              confpasswordError && <p className='text-danger'>{confpasswordError}</p>
            }

            <button className='btn btn-primary w-100 mt-2' onClick={handleSubmit}>
                Register
            </button>
            <Link to={'/login'} className='btn btn-link w-100 mt-2'>
                Already have an account? Login
            </Link>
        </form>
    </div>
  )
}

export default Register