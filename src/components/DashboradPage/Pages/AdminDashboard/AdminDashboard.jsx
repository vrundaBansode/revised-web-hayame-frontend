import React, { useEffect, useState } from 'react'
import "./admindashboard.css"
import { Link, useNavigate } from "react-router-dom"

const AdminDashboard = () => {

    const [options, setOptions] = useState([])
    const navigate = useNavigate();

    useEffect(() => {

        const fillOptions = async () => {

            const opt = []

            const response = await fetch("http://45.127.4.151:8000/api/skill-list", {
                method: "GET",
                headers: {
                    'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
                    "Content-type": "application/json"
                }
            })
            const data = await response.json()

            for (let i = 0; i < data.length; i++) {
                opt.push(data[i]['skill'])
            }

            setOptions(opt)

        }

        fillOptions()

    }, [])


    const handleAddLabour = (e) => {

        document.getElementById("add-btn").disabled = true

        console.log(options);

        let skills = "";
        for (let i = 0; i < options.length; i++) {
            let id = "labour-skill-" + options[i];
            if (document.getElementById(id).checked == true) {
                skills += options[i];
                skills += ',';
                console.log(options[i]);
            }
        }

        skills = skills.substring(0, skills.length - 1);

        e.preventDefault()

        fetch("http://45.127.4.151:8000/api/labour-list", {
            method: "POST",
            body: JSON.stringify({
                "first_name": document.getElementById("labour-firstName").value,
                "last_name": document.getElementById("labour-lastName").value,
                "email": document.getElementById("labour-email").value,
                "phone": document.getElementById("labour-phone-number").value,
                "skills": skills,
                "passport_no": document.getElementById("labour-passport-no").value,
            }),
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
                "Content-type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                alert("Labour Added!")
                navigate('/workforce-list');
            }
            );

        


    }


    return (
        <div className='adminDashboard'>
            <div>
                <h2 className='labour-form-header' >Add Workforce Details</h2>
            </div>
            <form name="adminform" className="admin-dashboard-form">
                <div className="admin-dashboard-labour-username">
                    <div className="admin-dashboard-labour-input-control">
                        <label htmlFor="labour-firstName" className="admin-dashboard-labour-input-label" >First Name</label>
                        <input type="text" name="labour-firstName" id="labour-firstName" required className="admin-dashboard-labour-input-field" placeholder="First Name" />
                    </div>
                    <div className="admin-dashboard-labour-input-control">
                        <label htmlFor="labour-lastName" className="admin-dashboard-labour-input-label" >Last Name</label>
                        <input type="text" name="labour-lastName" id="labour-lastName" required className="admin-dashboard-labour-input-field" placeholder="Last Name" />
                    </div>
                </div>
                <div className="admin-dashboard-labour-input-control">
                    <label htmlFor="labour-email" className="admin-dashboard-labour-input-label" >Email Address</label>
                    <input type="email" name="labour-email" id="labour-email" required className="admin-dashboard-labour-input-field" placeholder="Email Address" />
                </div>
                <div className="admin-dashboard-labour-input-control">
                    <label htmlFor="labour-passport-no" className="admin-dashboard-labour-input-label" >Passport Number</label>
                    <input type="email" name="labour-passport-no" id="labour-passport-no" required className="admin-dashboard-labour-input-field" placeholder="Enter Passport Number" />
                </div>
                <div className="admin-dashboard-labour-input-control">
                    <label htmlFor="labour-skill" className="admin-dashboard-labour-input-label" >Skills</label>
                    <div className='checkboxes'>
                        {options.map(opt => (<div><input type="checkbox" id={`labour-skill-${opt}`} value={opt} name={`labour-skill-${opt}`} /><label for={`labour-skill-${opt}`}>{opt}</label></div>))}
                    </div>
                    <div id="selected-skills">

                    </div>
                </div>
                <div className="admin-dashboard-labour-input-control">
                    <label htmlFor="number" className="admin-dashboard-labour-input-label" >Phone Number</label>
                    <input type="tel" name="number" id="labour-phone-number" required className="admin-dashboard-labour-input-field" placeholder="Enter your Phone Number" />
                </div>
                <div className="admin-dashboard-labour-input-control">
                    {/* <input type="submit" name="submit" className="input-submit" value={<Link to="/login" >Submit</Link>} onClick={handleRegister}/> */}
                    <button type="submit" name="submit" className="admin-dashboard-labour-input-submit" id="add-btn" onClick={handleAddLabour} >
                        <Link style={{ color: "#ffd000" }} >Add</Link>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AdminDashboard