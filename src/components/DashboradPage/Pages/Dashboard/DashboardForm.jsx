
import React, { useState } from 'react'
import "./dashboardform.scss"
import Dashboard from "./Dashboard"
import { leftarrow } from '../../../../assets'
import { Link, useNavigate } from "react-router-dom"


const DashboardForm = () => {

    const [bookingDetails, setBookingDetails] = useState({
        jobLoc : "",
        labourCount: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
    })

    const [confirmation, setConfirmation] = useState(false);

    const google = window.google;
    const navigate = useNavigate();

    document.addEventListener('DOMContentLoaded', function () {
        let autocomplete;
        let id = 'job-loc';
        autocomplete = new google.maps.places.Autocomplete(document.getElementById(id), {
            types: ['geocode']
        });
    });


    const handleBackArrowClick = () => {
        return (
            <div>
                <Dashboard />
            </div>
        )
    }

    const handleNextClick = () => {
        setConfirmation(prev=>!prev)

        setBookingDetails({
            jobLoc : document.getElementById("job-loc").value,
            labourCount : document.getElementById("labour-count").value,
            startDate : document.getElementById("start-date").value,
            endDate : document.getElementById("end-date").value,
            startTime : document.getElementById("start-time").value,
            endTime : document.getElementById("end-time").value
        })

    }

    const handleConfirmation = () => {

        // document.getElementById("next-btn").disabled = true

        // e.preventDefault()

        let paramString = (window.location.search).split('?')[1];
        let queryString = new URLSearchParams(paramString);
        let skill = ""
        for (let pair of queryString.entries()) {
            skill = pair[1]
        }
        skill = skill.replace("-", "/")
        console.log("Handle Next Clicked")

        fetch("http://45.127.4.151:8000/api/booking", {
            method: "POST",
            body: JSON.stringify({
                "contractor_name": JSON.parse(localStorage.getItem("first_name")) + " " + JSON.parse(localStorage.getItem("last_name")),
                "contractor_email": JSON.parse(localStorage.getItem("email")),
                "labour_skill": skill,
                "labour_count": bookingDetails.labourCount,
                "start_date": bookingDetails.startDate,
                "end_date": bookingDetails.endDate,
                "start_time": bookingDetails.startTime,
                "end_time": bookingDetails.endTime,
                "location": bookingDetails.jobLoc,
                "status": "Pending",
            }),
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
                'Content-Type': 'application/json'

            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                alert("Booking Done");
                navigate('/dashboard/customers');
            })
    }


    return (
        <div className='dashboard-card'>

            <main className="dashboard-main">
                <div className="dashboard-container">
                    <section className="dashboard-wrapper">
                        <span onClick={handleBackArrowClick}><Link to='/dashboard'><img src={leftarrow} alt="back arrow" className='dashboard-icon-align' /></Link></span>
                        <div className="dashboard-heading">
                            <h1 className="dashboard-header-text">Job Details</h1>
                        </div>
                        {!confirmation ? (<form name="signin" className="dashboard-form">

                            <div className="dashboard-input-control">
                                <label htmlFor="job-loc" className="dashboard-input-label" >Job Location</label>
                                <input type="text" name="job-loc" id="job-loc" required className="contractor-dashboardform-input-field" placeholder='Job Location' />
                            </div>
                            <div className="dashboard-input-control">
                                <label htmlFor="labour-count" className="dashboard-input-label" >Labour Count</label>
                                <input type="number" name="labour-count" id="labour-count" required className="contractor-dashboardform-input-field" placeholder='Labour Count' />
                            </div>
                            <div className="dashboard-input-control">
                                <label htmlFor="start-date" className="dashboard-input-label" >Start Date</label>
                                <input type="date" name="start-date" id="start-date" required className="contractor-dashboardform-input-field" placeholder='Start Date' />
                            </div>
                            <div className="dashboard-input-control">
                                <label htmlFor="end-date" className="dashboard-input-label" >End Date</label>
                                <input type="date" name="end-date" id="end-date" required className="contractor-dashboardform-input-field" placeholder='End Date' />
                            </div>
                            <div className='contractor-dashboardform-starttime'>
                                <div className="dashboard-input-control"  >
                                    <label htmlFor="start-time" className="dashboard-input-label" >Start Time</label>
                                    <input type="time" name="start-time" id="start-time" required className="contractor-dashboardform-input-field" placeholder='Start Time' />
                                </div>
                                <div className="dashboard-input-control">
                                    <label htmlFor="end-time" className="dashboard-input-label" >End Time</label>
                                    <input type="time" name="end-time" id="end-time" required className="contractor-dashboardform-input-field" placeholder='End Time' />
                                </div>
                            </div>
                            <div className="dashboard-input-control btn">
                                <input type="submit" name="submit" className="dashboard-input-submit" value="Next" id='next-btn' onClick={handleNextClick} />
                            </div>
                        </form>) : (<div className='confirmation-card'>
                            <h3>Job Loaction : <span className='confirmation-span'>{bookingDetails.jobLoc || "null"}</span></h3>
                            <h3>Labour Count : <span className='confirmation-span'>{bookingDetails.labourCount || "null"}</span></h3>
                            <h3>Start Date : <span className='confirmation-span'>{bookingDetails.startDate || "null"}</span></h3>
                            <h3>End Date : <span className='confirmation-span'>{bookingDetails.endDate || "null"}</span></h3>
                            <h3>Start Time : <span className='confirmation-span'>{bookingDetails.startTime || "null"}</span></h3>
                            <h3>End Time : <span className='confirmation-span'>{bookingDetails.endTime || "null"}</span></h3>
                            <button className='dashboard-input-submit' type='submit' onClick={handleConfirmation}>Confirm</button>
                        </div>)}
                    </section>
                </div>
            </main>
        </div>
    )
}

export default DashboardForm

