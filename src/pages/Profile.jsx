import React from 'react'

const Profile = () => {

    const user=JSON.parse(localStorage.getItem('user'))

  return (
    <div className='container text-center align-item-center mt-3'>
        <div>
            <img src="https://i.pravatar.cc/300" alt="profile" className='img-fluid rounded-circle' />
        </div>
        <h3>
            Welcome, {user.fname}!
        </h3>
        <hr />
        <h4>Fullname: {user.fname} {user.lname}</h4>
        <h4>Email: {user.email}</h4>
    </div>


  )
}

export default Profile