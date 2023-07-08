import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import "./adminBookings.css"
import  Popup from "reactjs-popup" 

const AdminBookings = () => {

  
  const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
  
    const handleSearch = (
      selectedKeys= "",
      confirm = (FilterConfirmProps) => {},
      dataIndex,
      ) => {
        confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters = () => {}) => {
      clearFilters();
      setSearchText('');
    };
  
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown : ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter : (value, record) =>
        record[dataIndex]?.toString().toLowerCase().includes((value).toLowerCase()),
          onFilterDropdownOpenChange: (visible) => {
            if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
      });
  
  
  
  
  
      const handleDetailsAction = (e) => {
        console.log(e.target.parentElement.parentElement.parentElement.parentElement.cells[0].innerText)

        fetch("http://45.127.4.151:8000/api/booking?booking_id="+e.target.parentElement.parentElement.parentElement.parentElement.cells[0].innerText, {
                    method: "GET",
                    headers: {
                        'Authorization': 'Token '+ JSON.parse(localStorage.getItem("Token")),
                        'Content-Type': 'application/json'
                    
                    },
                })
                .then((response) => response.json())
                .then((json) => {
                    // console.log(json)
                    document.getElementById('admin-bookings-contractorName').innerText=json[0]['contractor_name']
                    document.getElementById('admin-bookings-contractorEmail').innerText=json[0]['contractor_email']
                    document.getElementById('admin-bookings-labourType').innerText=json[0]['labour_skill']
                    document.getElementById('admin-bookings-labourCount').innerText=json[0]['labour_count']
                    document.getElementById('admin-bookings-Status').innerText=json[0]['status']
                    document.getElementById('admin-bookings-startDate').innerText=json[0]['start_date']
                    document.getElementById('admin-bookings-endDate').innerText=json[0]['end_date']
                    document.getElementById('admin-bookings-startTime').innerText=json[0]['start_time']
                    document.getElementById('admin-bookings-endTime').innerText=json[0]['end_time']
                    document.getElementById('admin-bookings-location').innerText=json[0]['location']
                    // document.getElementById('totalPayment').innerText=json[0]['']
                    
                })

      }
      
      const columns = [
      {
        title: 'Booking ID',
        dataIndex: 'contractorBookingId',
        key: 'contractorBookingId',
        className: "bookings-table-style",
        ...getColumnSearchProps('contractorBookingId'),
      },
        {
        title: 'Contractor Name',
        dataIndex: 'contractorName',
        key: 'contractorName',
        className: "bookings-table-style",
        ...getColumnSearchProps('contractorName'),
      },
      {
        title: 'Contractor Email',
        dataIndex: 'contractorEmail',
        key: 'contractorEmail',
        className: "bookings-table-style",
        ...getColumnSearchProps('contractorEmail'),
      },
      {
        title: 'Workforce Type',
        dataIndex: 'labourType',
        key: 'labourType',
        className: "bookings-table-style",
        ...getColumnSearchProps('labourType'),
      },
      {
        title: 'Workforce Count',
        dataIndex: 'labourCount',
        key: 'labourCount',
        className: "bookings-table-style",
        ...getColumnSearchProps('labourCount'),
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Job Status',
        dataIndex: 'status',
        key: 'status',
        className: "bookings-table-style",
        ...getColumnSearchProps('status'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      className: "bookings-table-style",
      render: (text) => (<span style={{ textDecoration: "underline", cursor: "pointer" }} ><Popup trigger={<span ><span onClick={handleDetailsAction}>{text}</span></span>} ><DetailsCard /></Popup></span>)
      // ...getColumnSearchProps('payment'),
    }
    ];

    const [tableData, setTableData] = useState([])
  
  useEffect(()=> {

    let d =[]

    const fillTable = async () => {
      const response = await fetch('http://45.127.4.151:8000/api/booking', {
      headers: {
        'Authorization': 'Token '+ JSON.parse(localStorage.getItem("Token")),
        'Content-Type': 'application/json'
        }
      })
      const td = await response.json()
      for(let i=0; i<td.length; i++){
        d.unshift({
          "key": i+1,
          "contractorBookingId": td[i]['booking_id'],
          "contractorName": td[i]['contractor_name'],
          "contractorEmail": td[i]['contractor_email'],
          "labourType": td[i]['labour_skill'],
          "labourCount": td[i]['labour_count'],
          "status": td[i]['status'],
          "action": "Details"
        });
      }
      setTableData(d)
    }

    fillTable()
  }, [])
  

    return (
      <div className='dashboard-table-card'>
        <Table columns={columns} dataSource={tableData} className='bookings-table' />
      </div>
    )
}


const DetailsCard = () => {
  
  const handleCross = () => {
    document.getElementById("detailsCard").style.display = "none"
  }
  
  
  return (
    <div className='detailsCard' id="detailsCard">
      <span className='detailsCard-cross' style={{ cursor: "pointer" }} onClick={handleCross} >X</span>
      <p className='detailsCard-p' id='admin-bookings-contractorName'>Avlin Jenner</p>
      <p className='detailsCard-p' id='admin-bookings-contractorEmail'>avlinjenner@gmail.com</p>
      <p className='detailsCard-p' >Workforce Type: <span className='detailsCard-span' id='admin-bookings-labourType'>Catering</span></p>
      <p className='detailsCard-p' >Count: <span className='detailsCard-span' id='admin-bookings-labourCount'>30</span></p>
      <p className='detailsCard-p' >Status: <span className='detailsCard-span' id='admin-bookings-Status'>Pending</span></p>
      <div style={{ display: "flex", marginTop: "0" }}>
        <p className='detailsCard-p' style={{ marginRight: "0", width: "12rem", marginTop: "0" }}>Start Date: <span className='detailsCard-span' id='admin-bookings-startDate'>20/05/23</span></p>
        <p className='detailsCard-p' style={{ marginTop: "0", width: "10rem" }}>End Date: <span className='detailsCard-span' id='admin-bookings-endDate'>28/06/23</span></p>
      </div>
      <div style={{ display: "flex", marginTop: "0" }}>
        <p className='detailsCard-p' style={{ marginRight: "0", width: "12rem", marginTop: "0" }}>Start Time: <span className='detailsCard-span' id='admin-bookings-startTime'>9:00</span></p>
        <p className='detailsCard-p' style={{ marginTop: "0", width: "10rem" }}>End Time: <span className='detailsCard-span' id='admin-bookings-endTime'>18:00</span></p>
      </div>
      <p className='detailsCard-p' style={{ marginTop: "0" }}>Location: <span className='detailsCard-span' id='admin-bookings-location'>New Jersey</span></p>
      <p className='detailsCard-p' >Payment: <span className='detailsCard-span' id="admin-bookings-totalPayment">$100</span></p>
    </div>
  )
}


export default AdminBookings