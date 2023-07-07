import React, { useState } from 'react'
import "./profile.css"
import  { edit, userImg } from "../../../../assets"

let user = {
    img: {userImg},
    firstName: JSON.parse(localStorage.getItem("first_name")),
    lastName: JSON.parse(localStorage.getItem("last_name")),
    user_role: JSON.parse(localStorage.getItem("user_role")),
    email: JSON.parse(localStorage.getItem("email")),
    phone: JSON.parse(localStorage.getItem("phone")),
}


const Profile = () => {

    const [editInfo, setEditInfo] = useState(false)

  return (
    <div id="profile" className='profile'>
        {editInfo ? <EditForm /> : <UserProfile  editInfo={editInfo} setEditInfo={setEditInfo} />}
    </div>
  )
}

const UserProfile = ({ editInfo, setEditInfo }) => {

    const editForm = () => {
        setEditInfo(prev => !prev)
    }

    return (
        <div className='user-profile-card'>
            <div className='profile-edit-icon'><img src={edit} alt="Edit Information" onClick={editForm} /></div>
            <div className='profile-card-content'>
                <div className='profile-card-img'>
                    <img src={userImg} alt="User" />
                </div>
                <div className='profile-card-info'>
                    <h2 className='profile-h2'>{`${user.firstName} ${user.lastName}`}</h2>
                    <h3 className='profile-h3'>Role : <span style={{ fontWeight: "400", marginLeft: "0.5rem" }}>{user.user_role}</span></h3>
                    <h3 className='profile-h3'>Email : <span style={{ fontWeight: "400", marginLeft: "0.5rem" }}>{user.email}</span></h3>
                    <h3 className='profile-about-me'>Phone : <span style={{ fontWeight: "400", marginLeft: "0.5rem" }}>{user.phone}</span></h3>
                </div>
            </div>
        </div>
    )
}

const EditForm = () => {

    const imageUpload = (e) => {
        user.img = URL.createObjectURL(e.target.files[0])
        document.querySelector(".profile-edit-img").src = user.img
    }

    const handleUpdateProfile = (e) => {

        e.preventDefault()

        fetch("http://45.127.4.151:8000/api/update/user-info/"+JSON.parse(localStorage.getItem("email")), {
            method: "PUT",
            body: JSON.stringify({
                "first_name": document.getElementById("contractor-profile-firstName").value,
                "last_name": document.getElementById("contractor-profile-lastName").value,
                "phone": document.getElementById("contractor-profile-phone").value,
                "user_role": document.getElementById("contractor-profile-user-role").value,
            }),
            headers: {
                'Authorization': 'Token '+ JSON.parse(localStorage.getItem("Token")),
                "Content-type": "application/json"
            }})
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
        });
    }

    return (
        <div>
            <form>
                <div>
                    <img className='profile-edit-img editform-img' src={userImg} alt='' />
                    {/* <input type='file' accept='image/*'  className='profile-input' onChange={imageUpload} /> */}
                </div>
                <input className='profile-input' id="contractor-profile-firstName" type='text' name="firstName" placeholder='First Name' defaultValue={JSON.parse(localStorage.getItem("first_name"))}/>
                <input className='profile-input' id="contractor-profile-lastName" type='text' name="lastName" placeholder='Last Name' defaultValue={JSON.parse(localStorage.getItem("last_name"))}/>
                <input className='profile-input' id="contractor-profile-user-role" type='text' name="user_role" placeholder='User Role' defaultValue={JSON.parse(localStorage.getItem("user_role"))} disabled/>
                <input className='profile-input' id="contractor-profile-email" type='email' name="email" placeholder='Email' defaultValue={JSON.parse(localStorage.getItem("email"))} disabled/>
                <input className='profile-input' id="contractor-profile-phone" type='tel' name="phone" placeholder='Phone Number' defaultValue={JSON.parse(localStorage.getItem("phone"))}/>
                <a href="/dashboard/profile" className='profile-button' type='submit' onClick={handleUpdateProfile}>Submit</a>
            </form>
        </div>
    )
}


export default Profile