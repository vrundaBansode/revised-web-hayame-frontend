import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./allocateLabours.css";

let options = [];
let labourList = [];

const AllocateLabours = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  let paramString = window.location.search.split("?")[1];
  let queryString = new URLSearchParams(paramString);
  let booking_id = "";
  for (let pair of queryString.entries()) {
    booking_id = pair[1];
  }

  let requiredSkill = "";

  useEffect(() => {
    fetch("http://45.127.4.151:8000/api/booking?booking_id=" + booking_id, {
      method: "GET",
      headers: {
        Authorization: "Token " + JSON.parse(localStorage.getItem("Token")),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        requiredSkill = json[0]["labour_skill"];

        document.getElementById("allocate-labours-contractor-name").innerText =
          json[0]["contractor_name"];
        document.getElementById("allocate-labours-contractor-email").innerText =
          json[0]["contractor_email"];
        document.getElementById("allocate-labours-labour-type").innerText =
          json[0]["labour_skill"];
        document.getElementById("allocate-labours-labour-count").innerText =
          json[0]["labour_count"];
        document.getElementById("allocate-labours-booking-status").innerText =
          json[0]["status"];
        document.getElementById("allocate-labours-start-date").innerText =
          json[0]["start_date"];
        document.getElementById("allocate-labours-end-date").innerText =
          json[0]["end_date"];
        document.getElementById("allocate-labours-start-time").innerText =
          json[0]["start_time"];
        document.getElementById("allocate-labours-end-time").innerText =
          json[0]["end_time"];
        document.getElementById("allocate-labours-loc").innerText =
          json[0]["location"];
        document.getElementById("allocate-labours-total-cost").innerText =
          json[0]["amount"];
      });

    fetch("http://45.127.4.151:8000/api/labour-list", {
      method: "GET",
      headers: {
        Authorization: "Token " + JSON.parse(localStorage.getItem("Token")),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          let skills = json[i]["skills"].split(",");
          if (skills.includes(requiredSkill)) {
            if (labourList.includes(json[i]["email"]) == false) {
              options.push({
                value: json[i]["email"],
                label: `${json[i]["email"]} (${json[i]["first_name"]} ${json[i]["last_name"]})`,
              });
              labourList.push(json[i]["email"]);
            }

          }
        }
      });
  }, []);

  const handelAllocateLabourSubmit = () => {
    let labour_emails = "";
    for(let i=0; i<selectedOption.length; i++){
      labour_emails += selectedOption[i].value + ",";
    }
    labour_emails = labour_emails.substring(0,labour_emails.length-1);
    
    fetch("http://45.127.4.151:8000/api/allocate-labour", {
            method: "POST",
            body: JSON.stringify({
                "booking_id": booking_id,
                "labour_email": labour_emails,
            }),
            headers: {
                'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                alert("Labours Allocated Successfully");
            })

  }

  return (
    <div className="allocate-labours-summary-card">
      <div className="summary-card">
        <h3 className="allocate-labours-h3">
          Contractor Name :{" "}
          <span
            id="allocate-labours-contractor-name"
            className="allocate-labours-summary-span"
          >
            abdcher
          </span>
        </h3>
        <h3 className="allocate-labours-h3">
          Contractor Email :{" "}
          <span
            id="allocate-labours-contractor-email"
            className="allocate-labours-summary-span"
          >
            abdcher
          </span>
        </h3>
        <h3 className="allocate-labours-h3">
          Labour Type :{" "}
          <span
            id="allocate-labours-labour-type"
            className="allocate-labours-summary-span"
          >
            abdcher
          </span>
        </h3>
        <h3 className="allocate-labours-h3">
          Labour Count :{" "}
          <span
            id="allocate-labours-labour-count"
            className="allocate-labours-summary-span"
          >
            abdcher
          </span>
        </h3>
        <h3 className="allocate-labours-h3">
          Booking Status :{" "}
          <span
            id="allocate-labours-booking-status"
            className="allocate-labours-summary-span"
          >
            abdcher
          </span>
        </h3>
        <h3 className="allocate-labours-h3">
          Start Date :{" "}
          <span
            id="allocate-labours-start-date"
            className="allocate-labours-summary-span"
          >
            abdcher
          </span>
        </h3>
        <h3 className="allocate-labours-h3">
          End Date :{" "}
          <span
            id="allocate-labours-end-date"
            className="allocate-labours-summary-span"
          >
            abdcher
          </span>
        </h3>
        <h3 className="allocate-labours-h3">
          Start Time :{" "}
          <span
            id="allocate-labours-start-time"
            className="allocate-labours-summary-span"
          >
            abdcher
          </span>
        </h3>
        <h3 className="allocate-labours-h3">
          End Time :{" "}
          <span
            id="allocate-labours-end-time"
            className="allocate-labours-summary-span"
          >
            abdcher
          </span>
        </h3>
        <h3 className="allocate-labours-h3">
          Location :{" "}
          <span
            id="allocate-labours-loc"
            className="allocate-labours-summary-span"
          >
            abdcher
          </span>
        </h3>
        <h3 className="allocate-labours-h3">
          Total Cost :{" "}
          <span
            id="allocate-labours-total-cost"
            className="allocate-labours-summary-span"
          >
            abdcher
          </span>
        </h3>
      </div>

        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
          isMulti
        />
        <button onClick={handelAllocateLabourSubmit}>Submit</button>

    </div>
  );
};

export default AllocateLabours;
