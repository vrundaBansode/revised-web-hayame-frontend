import React from 'react'

import { Typography, Space, Card } from 'antd' 
import "./dashboard.css"
import { bartender, construction, cook, dishwasher, foodserviceworker, hauler, labour, lumper, pack, painter, sanitation, setup, shipping, waiter } from "../../../../assets"
import { useNavigate, Link } from 'react-router-dom'



const Dashboard = () => {

  let navigate = useNavigate();

  const handleClick = (e) => {
    navigate("./dashboardform")
    console.log(e.target.id)
  }

  return (
    <div>
      <div>
          <Typography.Title level={2}><div className='contractor-dashboard-header' >Choose the type of Workforce required : </div></Typography.Title>
          <Space className='space-block'>
            <Card style={{ backgroundColor: "#fff8d1", borderRadius: "2rem" }}>
              <Space>
                <div className='filter-card'>
                  <div className='filter'>
                    <h3 className='dashboard-h3'>Warehouse</h3>
                    <div className='filter-skills'>
                      <Link to="/dashboard/dashboardform?skill=General Labour" className='dashboard-a'><div className="filter-item" onClick={handleClick} id="labour">
                        <img src={labour} alt="labour" className='dashboard-img'/>
                        <p className='contractor-dashboard-p'>General Labour</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Hauler" className='dashboard-a'><div className="filter-item" onClick={handleClick} id="hauler">
                        <img src={hauler} alt="hauler" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Hauler</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Pick-Pack" className='dashboard-a'><div className="filter-item" onClick={handleClick} id="pickpack">
                        <img src={pack} alt="pack" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Pick/Pack</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Shipping-Receiving" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={shipping} alt="shipping" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Shipping/Receiving</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Lumper" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={lumper} alt="lumper" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Lumper</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Sanitation" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={sanitation} alt="sanitation" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Sanitation</p>
                      </div></Link>
                    </div>
                  </div><hr className='contractor-dashboard-hr'/>

                  <div className='filter'>
                    <h3 className='dashboard-h3'>Food</h3>
                    <div className='filter-skills'>

                    <Link to="/dashboard/dashboardform?skill=Dishwasher" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={dishwasher} alt="dishwasher" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Dishwasher</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Waiter" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={waiter} alt="waiter" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Waiter</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Sanitation" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={sanitation} alt="sanitation" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Sanitation</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Labour" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={labour} alt="labour" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Labour</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Set up-Tear down" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={setup} alt="setup" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Set up/Tear down</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Cook-Assistant Cook" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={cook} alt="cook" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Cook/Assistant Cook</p>
                      </div></Link>
                    </div>
                  </div><hr className='contractor-dashboard-hr'/>

                  <div className='filter'>
                    <h3 className='dashboard-h3'>Restaurant</h3>
                    <div className='filter-skills'>
                      {/* <div><p>Busser</p></div> */}

                      <Link to="/dashboard/dashboardform?skill=Dishwasher" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={dishwasher} alt="dishwasher" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Dishwasher</p>
                      </div></Link>
                      {/* <div><p>Runner</p></div> */}

                      <Link to="/dashboard/dashboardform?skill=Sanitation" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={sanitation} alt="sanitation" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Sanitation</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Server" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={waiter} alt="waiter" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Server</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Set up-Tear down" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={setup} alt="setup" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Set up/Tear down</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Cook-Assistant Cook" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={cook} alt="cook" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Cook/Assistant Cook</p>
                      </div></Link>
                    </div>
                  </div><hr className='contractor-dashboard-hr'/>

                  <div className='filter'>
                    <h3 className='dashboard-h3'>Hospitality</h3>
                    <div className='filter-skills'>

                    <Link to="/dashboardform?skill=Dishwasher" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={dishwasher} alt="dishwasher" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Dishwasher</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Food Service worker" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={foodserviceworker} alt="foodserviceworker" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Worker</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Sanitation" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={sanitation} alt="sanitation" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Sanitation</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Server" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={waiter} alt="waiter" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Server</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Cook" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={cook} alt="cook" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Cook</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Bartender" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={bartender} alt="bartender" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Bartender</p>
                      </div></Link>
                    </div>
                  </div><hr className='contractor-dashboard-hr' />

                  <div className='filter'>
                    <h3 className='dashboard-h3'>Other</h3>
                    <div className='filter-skills'>    

                    <Link to="/dashboard/dashboardform?skill=General Labour" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={labour} alt="labour" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>General Labour</p>
                      </div></Link>                

                      <Link to="/dashboard/dashboardform?skill=Painter" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={painter} alt="painter" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Painter</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Construction Workers" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={construction} alt="construction" className='dashboard-img' />
                        <p className='contractor-dashboard-p'>Workers</p>
                      </div></Link>

                      <Link to="/dashboard/dashboardform?skill=Set up-Tear down" className='dashboard-a'><div className="filter-item" onClick={handleClick}>
                        <img src={setup} alt="setup" className='dashboard-img'/>
                        <p className='contractor-dashboard-p'>Set up/Tear down</p>
                      </div></Link>
                    </div>
                  </div>
                </div>
              </Space>
            </Card>
          </Space>
      </div>

    </div>
  )
}

export default Dashboard