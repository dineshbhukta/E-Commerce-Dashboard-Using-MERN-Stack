import React from 'react'

function Profile() {
  const auth = localStorage.getItem('user');
  return (
    <div>
      <h1 className='text-white'>Profile</h1>
      <img className="userlogo" src="images/user1.jpg" width={400}  alt="" />
      <br /><br />
    <h1 className='text-white'> Username:<h2 style={{color:"red"}}>({JSON.parse(auth).name})</h2> </h1>
    </div>
  )
}

export default Profile
