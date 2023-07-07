import "./customers.css"
import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import  Popup from "reactjs-popup" ;

const Customers = () => {

  
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


    // const handleDetailsAction = (e) => {
    //     console.log(e.target.parentElement.parentElement.cells[2].innerText)

    //     return (
    //       <div>
    //         <Popup defaultOpen={true} on={"click"}>
    //           <DetailsCard />
    //         </Popup>
    //       </div>
    //     )


    //   }
    

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
                    document.getElementById('contractor-contractorName').innerText=json[0]['contractor_name']
                    document.getElementById('contractor-contractorEmail').innerText=json[0]['contractor_email']
                    document.getElementById('contractor-labourType').innerText=json[0]['labour_skill']
                    document.getElementById('contractor-labourCount').innerText=json[0]['labour_count']
                    document.getElementById('contractor-Status').innerText=json[0]['status']
                    document.getElementById('contractor-startDate').innerText=json[0]['start_date']
                    document.getElementById('contractor-endDate').innerText=json[0]['end_date']
                    document.getElementById('contractor-startTime').innerText=json[0]['start_time']
                    document.getElementById('contractor-endTime').innerText=json[0]['end_time']
                    document.getElementById('contractor-location').innerText=json[0]['location']
                    // document.getElementById('totalPayment').innerText=json[0]['']
                    
                })

      }

    const columns = [
      {
      title: 'Booking ID',
      dataIndex: 'bookingId',
      key: 'bookingId',
      width: '15%',
      ...getColumnSearchProps('bookingId'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: "15%",
      ...getColumnSearchProps('address'),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      width: '10%',
      ...getColumnSearchProps('startDate'),
    },
    {
      title: 'Skills',
      dataIndex: 'labourSkills',
      key: 'labourSkills',
      width: '10%',
      ...getColumnSearchProps('labourSkills'),
    },
    {
      title: 'Job Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      ...getColumnSearchProps('status'),
  },
  {
    title: 'Payment',
    dataIndex: 'payment',
    key: 'payment',
    width: '10%',
    ...getColumnSearchProps('payment'),
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    width: '10%',
      render: (text) => (<span style={{ textDecoration: "underline", cursor: "pointer" }} ><Popup trigger={<span ><span onClick={handleDetailsAction}>{text}</span></span>} ><DetailsCard /></Popup></span>)
  },
  ];

  const [tableData, setTableData] = useState([])
  
  useEffect(()=> {

    let d =[]

    const fillTable = async () => {
      const response = await fetch('http://45.127.4.151:8000/api/booking?contractor_email='+JSON.parse(localStorage.getItem("email")), {
      headers: {
        'Authorization': 'Token '+ JSON.parse(localStorage.getItem("Token")),
        'Content-Type': 'application/json'
        }
      })
      const td = await response.json()
      for(let i=0; i<td.length; i++){
        d.push({
          "key": i+1,
          "bookingId": td[i]['booking_id'],
          "address": td[i]['location'],
          "startDate": td[i]['start_date'],
          "labourSkills": td[i]['labour_skill'],
          "status": td[i]['status'],
          "payment": "$ 100",
          "action": "Details",
        });
      }
      setTableData(d)
    }

    fillTable()
  }, [])


  
  return (
    <div className='customers-table-card'>
      {/* { loading ? (<p style={{ color: "white" }} >Loading.....</p>) : (<Table columns={columns} dataSource={tableData} />)} */}
      <Table columns={columns} dataSource={tableData} id="contractor-booking-table" className="contractor-booking-table" />
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
      <p className='detailsCard-p' id='contractor-contractorName'>Avlin Jenner</p>
      <p className='detailsCard-p' id='contractor-contractorEmail'>avlinjenner@gmail.com</p>
      <p className='detailsCard-p' >Workforce Type: <span className='detailsCard-span' id='contractor-labourType'>Catering</span></p>
      <p className='detailsCard-p' >Count: <span className='detailsCard-span' id='contractor-labourCount'>30</span></p>
      <p className='detailsCard-p' >Status: <span className='detailsCard-span' id='contractor-Status'>Pending</span></p>
      <div style={{ display: "flex", marginTop: "0" }}>
        <p className='detailsCard-p' style={{ marginRight: "0", width: "12rem", marginTop: "0" }}>Start Date: <span className='detailsCard-span' id='contractor-startDate'>20/05/23</span></p>
        <p className='detailsCard-p' style={{ marginTop: "0", width: "10rem" }}>End Date: <span className='detailsCard-span' id='contractor-endDate'>28/06/23</span></p>
      </div>
      <div style={{ display: "flex", marginTop: "0" }}>
        <p className='detailsCard-p' style={{ marginRight: "0", width: "12rem", marginTop: "0" }}>Start Time: <span className='detailsCard-span' id='contractor-startTime'>9:00</span></p>
        <p className='detailsCard-p' style={{ marginTop: "0", width: "10rem" }}>End Time: <span className='detailsCard-span' id='contractor-endTime'>18:00</span></p>
      </div>
      <p className='detailsCard-p'  style={{ marginTop: "0" }}>Location: <span className='detailsCard-span' id='contractor-location'>New Jersey</span></p>
      <p className='detailsCard-p' id='contractor-totalPayment'>Payment: $100</p>
    </div>
  )
}

export default Customers;
