import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import "./addWorkforceList.css"
import { useNavigate, Link } from 'react-router-dom';
import { MDBTable, MDBTableBody, MDBTableHead, MDBDataTable } from 'mdbreact';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


const AddWorkforceList = () => {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (
    selectedKeys = "",
    confirm = (FilterConfirmProps) => { },
    dataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters = () => { }) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
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
    onFilter: (value, record) =>
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



  let navigate = useNavigate()


  const handleEditAction = (e) => {
    let labourEmail = e.target.parentElement.parentElement.cells[2].innerText;
    // console.log(labourEmail)
    navigate("/dashboard/update-labour-details?email=" + labourEmail)

  }

  const [tableData, setTableData] = useState([])

  const data = {
    columns: [
      {
        label: 'First Name',
        field: 'firstName'
      },
      {
        label: 'Last Name',
        field: 'lastName'
      },
      {
        label: 'Email',
        field: 'email'
      },
      {
        label: 'Skill',
        field: 'skill'
      },
      {
        label: 'Phone',
        field: 'phone'
      },
      {
        label: 'Action',
        field: 'action',
      }
    ],

    rows: tableData
  }


  useEffect(() => {

    let d = []

    const fillTable = async () => {
      const response = await fetch('http://45.127.4.151:8000/api/labour-list', {
        headers: {
          'Authorization': 'Token ' + JSON.parse(localStorage.getItem("Token")),
          'Content-Type': 'application/json'
        }
      })
      const td = await response.json()
      for (let i = 0; i < td.length; i++) {
        d.push({
          // "key": i + 1,
          "firstName": td[i]['first_name'],
          "lastName": td[i]['last_name'],
          "email": td[i]['email'],
          "skill": td[i]['skills'],
          "phone": td[i]['phone'],
          "action": <p style={{ cursor: "pointer", textDecoration: "underline", color: "green" }} onClick={handleEditAction}>Edit</p>
        });
      }
      setTableData(d)
    }

    fillTable()
  }, [])


  return (
    <div className='workforcelist-table-card'>
      {/* <Table columns={columns} dataSource={tableData} /> */}
      <MDBDataTable className="workforcelist-table"
        responsive
        striped
        small
        bordered
        data={data} />
    </div>
  )
}

export default AddWorkforceList