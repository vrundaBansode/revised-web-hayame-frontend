import React, { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import "./updateLabourDetails.css"


const UpdateLabourDetails = () => {

    const [options, setOptions] = useState([])

    let labourSkills = []

    const pushSkills = () => {
        labourSkills.push(document.getElementById("labour-skill").value)
        console.log(labourSkills)
        let skillTags = ""
        for(let i = 0; i < labourSkills.length; i++){
                skillTags += `<li>${labourSkills[i]} </li>`
            }
            document.getElementById("selected-skills").innerHTML = "<ul>" + skillTags + "</ul>"
            
    }

    const handleUpdateLabourDetails = (e) => {

        e.preventDefault()
        
        fetch("http://45.127.4.151:8000/api/labour-list", {
                method: "POST",
                body: JSON.stringify({
                    "first_name": document.getElementById("labour-firstName").value,
                    "last_name": document.getElementById("labour-lastName").value,
                    "email": document.getElementById("labour-email").value,
                    "phone": document.getElementById("labour-phone-number").value,
                    "skills": document.getElementById("labour-skill").value,
                    "passport_no": document.getElementById("labour-passport-no").value,
                }),
                headers: {
                    'Authorization': 'Token '+ JSON.parse(localStorage.getItem("Token")),
                    "Content-type": "application/json"
                }})
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            
            }
        );

        alert("Labour Added!")


    }


  return (
    <div>
        <form name="adminform" className="admin-form">
            <div className="labour-username">
                <div className="labour-input-control">
                    <label htmlFor="labour-firstName" className="labour-input-label" >First Name</label>
                    <input type="text" name="labour-firstName" id="labour-firstName" className="labour-input-field" placeholder="First Name" />
                </div>
                <div className="labour-input-control">
                    <label htmlFor="labour-lastName" className="labour-input-label" >Last Name</label>
                    <input type="text" name="labour-lastName" id="labour-lastName" className="labour-input-field" placeholder="Last Name" />
                </div>
            </div>
            <div className="labour-input-control">
                <label htmlFor="labour-email" className="labour-input-label" >Email Address</label>
                <input type="email" name="labour-email" id="labour-email" className="labour-input-field" placeholder="Email Address" />
            </div>
            <div className="labour-input-control">
                <label htmlFor="labour-passport-no" className="labour-input-label" >Passport Number</label>
                <input type="email" name="labour-passport-no" id="labour-passport-no" className="labour-input-field" placeholder="Enter Passport Number" />
            </div>
            <div className="labour-input-control">
                <label htmlFor="labour-skill" className="labour-input-label" >Skills</label>
                {/* <input type="text" name="labour-skill" id="labour-skill" className="labour-input-field" placeholder="Enter labour skill" /> */}
                <select className="labour-select" id="labour-skill" onChange={pushSkills} multiple>
                    {options.map(opt => (<option  key={opt} className="labour-dropdown" value={opt}>{opt}</option>))}
                </select>
                <div id="selected-skills">

                </div>
            </div>
            <div className="labour-input-control">
                <label htmlFor="number" className="labour-input-label" >Phone Number</label>
                <input type="tel" name="number" id="labour-phone-number" className="labour-input-field" placeholder="Enter your Phone Number" />
            </div>
            <div className="labour-input-control">
                {/* <input type="submit" name="submit" className="input-submit" value={<Link to="/login" >Submit</Link>} onClick={handleRegister}/> */}
                <button type="submit" name="submit" className="labour-input-submit" onClick={handleUpdateLabourDetails} >
                    <Link style={{ color: "#ffd000" }} >Update</Link>
                </button>
            </div>
        </form>
    </div>
  )
}

export default UpdateLabourDetails