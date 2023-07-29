import React, { useState, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import "./updateLabourDetails.css"
// import AdminDashboard from '../AdminDashboard/AdminDashboard'
import Select from "react-select";

let options = [];
let opt = [];
let temp = [];

const UpdateLabourDetails = () => {

    let labourSkills = ""
    const [selectedOption, setSelectedOption] = useState([]);

    let paramString = (window.location.search).split('?')[1];
    let queryString = new URLSearchParams(paramString);
    let labourEmail = ""
    for (let pair of queryString.entries()) {
        labourEmail = pair[1]
    }

    let navigate = useNavigate()

    useEffect(() => {

        fetch("http://45.127.4.151:8000/api/skill-list", {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
                "Content-type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((json) => {
                for (let i = 0; i < json.length; i++) {
                    if (opt.includes(json[i]['skill']) == false) {
                        opt.push(json[i]['skill']);
                        options.push({
                            value: json[i]['skill'],
                            label: json[i]['skill']
                        })
                    }
                }
            })



        fetch('http://45.127.4.151:8000/api/labour-list?email=' + labourEmail, {
            method: "GET",
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
                'Content-Type': 'application/json'

            },
        })           //api for the get request
            .then(response => response.json())
            .then(data => {

                labourSkills = data[0]["skills"].split(",")

                for (let i = 0; i < labourSkills.length; i++) {
                    if (temp.includes(labourSkills[i]) == false) {
                        temp.push(labourSkills[i]);
                        selectedOption.push({
                            value: labourSkills[i],
                            label: labourSkills[i]
                        });
                    }
                }

                document.getElementById("update-labour-firstName").defaultValue = data[0]["first_name"]
                document.getElementById("update-labour-lastName").defaultValue = data[0]["last_name"]
                document.getElementById("update-labour-email").defaultValue = data[0]["email"]
                document.getElementById("update-labour-gender").value = data[0]["gender"]
                document.getElementById("update-labour-phone-number").defaultValue = data[0]["phone"]
                document.getElementById("update-labour-passport-no").defaultValue = data[0]["passport_no"]


            })
    }, [])


    const handleUpdate = () => {
        console.log("update clicked!")

        document.getElementById("update-btn").disabled = true

        let skills = "";
        for (let i = 0; i < selectedOption.length; i++) {
            skills += selectedOption[i]['value'];
            skills += ',';
        }

        skills = skills.substring(0, skills.length - 1);

        // e.preventDefault()

        fetch("http://45.127.4.151:8000/api/update/labour-list/" + labourEmail, {
            method: "PUT",
            body: JSON.stringify({
                "first_name": document.getElementById("update-labour-firstName").value,
                "last_name": document.getElementById("update-labour-lastName").value,
                "email": document.getElementById("update-labour-email").value,
                "gender": document.getElementById("update-labour-gender").value,
                "phone": document.getElementById("update-labour-phone-number").value,
                "skills": skills,
                "passport_no": document.getElementById("update-labour-passport-no").value,
            }),
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
                "Content-type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                alert("Labour Updated!")
                navigate('/dashboard/workforce-list');
            }
            );

    }


    return (
        <div>
            <div className='adminDashboard'>
                <div>
                    <h2 className='labour-form-header' >Add Workforce Details</h2>
                </div>
                <form name="adminform" className="admin-dashboard-form">
                    <div className="admin-dashboard-labour-username">
                        <div className="admin-dashboard-labour-input-control">
                            <label htmlFor="labour-firstName" className="admin-dashboard-labour-input-label" >First Name</label>
                            <input type="text" name="labour-firstName" id="update-labour-firstName" required className="admin-dashboard-labour-input-field" placeholder="First Name" />
                        </div>
                        <div className="admin-dashboard-labour-input-control">
                            <label htmlFor="labour-lastName" className="admin-dashboard-labour-input-label" >Last Name</label>
                            <input type="text" name="labour-lastName" id="update-labour-lastName" required className="admin-dashboard-labour-input-field" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="admin-dashboard-labour-input-control">
                        <label htmlFor="labour-email" className="admin-dashboard-labour-input-label" >Email Address</label>
                        <input type="email" name="labour-email" id="update-labour-email" required className="admin-dashboard-labour-input-field" placeholder="Email Address" />
                    </div>

                    <div className="admin-dashboard-labour-input-control">
                        <label htmlFor="labour-gender" className="admin-dashboard-labour-input-label" >Gender</label>
                        <select name="labour-gender" id="update-labour-gender" className="admin-dashboard-labour-input-field">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="admin-dashboard-labour-input-control">
                        <label htmlFor="labour-passport-no" className="admin-dashboard-labour-input-label" >Passport Number</label>
                        <input type="email" name="labour-passport-no" id="update-labour-passport-no" required className="admin-dashboard-labour-input-field" placeholder="Enter Passport Number" />
                    </div>

                    <div className='admin-dashboard-labour-input-control'>
                        <label htmlFor="labour-skill" className="admin-dashboard-labour-input-label" >Skills</label>
                        <Select
                            id="admin-dashboard-labour-skills"
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            isMulti
                        />
                    </div>

                    <div className="admin-dashboard-labour-input-control">
                        <label htmlFor="number" className="admin-dashboard-labour-input-label" >Phone Number</label>
                        <input type="tel" name="number" id="update-labour-phone-number" required className="admin-dashboard-labour-input-field" placeholder="Enter your Phone Number" />
                    </div>
                    <div className="admin-dashboard-labour-input-control">
                        <button type="submit" name="submit" className="admin-dashboard-labour-input-submit" id="update-btn" onClick={handleUpdate} >
                            <Link style={{ color: "#ffd000" }} >Update</Link>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateLabourDetails