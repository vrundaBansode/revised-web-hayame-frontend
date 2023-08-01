import React from "react";
import "./sectThree.css";
import {
  sectThreeIcon1,
  sectThreeIcon2,
  sectThreeIcon3,
} from "../../../../../assets";

const SectThree = () => {
  const sectThreeContent = [
    {
      icon: `${sectThreeIcon1}`,
      title: "Businesses post vacancies",
      content: "Vacancies could be one-time, seasonal or temp-to-hire needs.",
    },
    {
      icon: `${sectThreeIcon2}`,
      title: "Workers accept shifts",
      content:
        "Workers choose their shifts that best fit their time and needs.",
    },
    {
      icon: `${sectThreeIcon3}`,
      title: "We handle the rest",
      content: "Paperwork, insurance and payments are looked after by us.",
    },
  ];

  return (
    <div className="sect3-div">
      <div className="sect3-card">
        <div className="work-card">
          {sectThreeContent.map((item) => (
            <div className="steps-card">
              <img src={item.icon} alt="icon" />
              <h3 className="card-title">{item.title}</h3>
              <p className="card-para">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectThree;
