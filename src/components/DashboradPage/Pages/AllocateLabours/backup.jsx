import React, { useEffect } from "react";
import Select from 'react-select';

const AllocateLabours = () => {
  let paramString = window.location.search.split("?")[1];
  let queryString = new URLSearchParams(paramString);
  let booking_id = "";
  for (let pair of queryString.entries()) {
    booking_id = pair[1];
  }

  let labourList = [];
  let requiredSkill = "";
  let selectedLabours = [];
  let cnt = 0;


  useEffect(() => {

    labourList = [];
    requiredSkill = "";
    selectedLabours = [];

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
          if(skills.includes(requiredSkill)){
            labourList.push(json[i]['email'] + " (" + json[i]['first_name'] + " " + json[i]['last_name'] + ")");
          }
        }

        let html = "";
        for (let k = 0; k < labourList.length; k++) {
          html += `<option value='${labourList[k]}' >${labourList[k]}</option>`;
        }
        document.getElementById("allocate-labours-list").innerHTML += html;

        console.log("LabourList: " + labourList);
      });
  }, []);


  const pushLabour = () => {
    selectedLabours.push(document.getElementById("allocate-labours-list").value);
    console.log("SelectedLabours: " + selectedLabours);
    loadDOM();
  }


  const loadDOM = () => {
    let html = "<ul>"
    for(let i=0; i<selectedLabours.length; i++){
      html += `<li id='${selectedLabours[i]}-${cnt}'>${selectedLabours[i]}    <span onclick={() => deleteLabour} >X</span></li>`
      cnt++;
    }
    html += "</ul>"
    document.getElementById("allocation-selected-labours").innerHTML = html;
  }

  const deleteLabour = () => {
    // let id = ele.parentNode.id;
    console.log("Deleted");
  }

  return (
    <div className="workforcelist-table-card">
      <div className="confirmation-card">
        <h3>
          Contractor Name :
          <span
            id="allocate-labours-contractor-name"
            className="confirmation-span"
          >
            abdcher
          </span>
        </h3>
        <h3>
          Contractor Email :
          <span
            id="allocate-labours-contractor-email"
            className="confirmation-span"
          >
            abdcher
          </span>
        </h3>
        <h3>
          Labour Type :
          <span id="allocate-labours-labour-type" className="confirmation-span">
            abdcher
          </span>
        </h3>
        <h3>
          Labour Count :
          <span
            id="allocate-labours-labour-count"
            className="confirmation-span"
          >
            abdcher
          </span>
        </h3>
        <h3>
          Booking Status :
          <span
            id="allocate-labours-booking-status"
            className="confirmation-span"
          >
            abdcher
          </span>
        </h3>
        <h3>
          Start Date :
          <span id="allocate-labours-start-date" className="confirmation-span">
            abdcher
          </span>
        </h3>
        <h3>
          End Date :
          <span id="allocate-labours-end-date" className="confirmation-span">
            abdcher
          </span>
        </h3>
        <h3>
          Start Time :
          <span id="allocate-labours-start-time" className="confirmation-span">
            abdcher
          </span>
        </h3>
        <h3>
          End Time :
          <span id="allocate-labours-end-time" className="confirmation-span">
            abdcher
          </span>
        </h3>
        <h3>
          Location :
          <span id="allocate-labours-loc" className="confirmation-span">
            abdcher
          </span>
        </h3>
        <h3>
          Total Cost :
          <span id="allocate-labours-total-cost" className="confirmation-span">
            abdcher
          </span>
        </h3>
      </div>

      <div id="allocation-workforce-list" className="allocation-workforce-list">
        <form>
          <label for="allocate-labours-list">Select Labours : </label>
          <select id="allocate-labours-list" onChange={pushLabour} name="allocate-labours-list">
            <option>Choose an option</option>
          </select>
        </form>
      </div>

      <div id="allocation-selected-labours"></div>

      <Select value={se} />

    </div>
  );
};

export default AllocateLabours;
