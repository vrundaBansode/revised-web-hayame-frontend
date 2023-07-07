import React, { useRef, useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import "./addWorkforceList.css"


const AddWorkforceList = () => {

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





    const handleEditAction = (e) => {
      console.log(e.target.parentElement.parentElement.cells[2].innerText)
    }
    
    const columns = [
      {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      width: '15%',
      ...getColumnSearchProps('firstName'),
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      width: '15%',
      ...getColumnSearchProps('lastName'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: "15%",
      ...getColumnSearchProps('email'),
      // sorter: (a, b) => a.address.length - b.address.length,
      // sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Skill',
      dataIndex: 'skill',
      key: 'skill',
      width: '10%',
      ...getColumnSearchProps('skill'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: '10%',
      ...getColumnSearchProps('phone'),
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    width: '10%',
    render: (text) => (<div><span onClick={handleEditAction} style={{ marginRight: "1rem", color: "green" }} >{text}</span><span style={{ color: "red" }} > X </span></div>)
    // ...getColumnSearchProps('payment'),
  }
  ];

  const [tableData, setTableData] = useState([])
  
  useEffect(()=> {

    let d =[]

    const fillTable = async () => {
      const response = await fetch('http://45.127.4.151:8000/api/labour-list', {
      headers: {
        'Authorization': 'Token '+ JSON.parse(localStorage.getItem("Token")),
        'Content-Type': 'application/json'
        }
      })
      const td = await response.json()
      for(let i=0; i<td.length; i++){
        d.push({
          "key": i+1,
          "firstName": td[i]['first_name'],
          "lastName": td[i]['last_name'],
          "email": td[i]['email'],
          "skill": td[i]['skills'],
          "phone": td[i]['phone'],
          "action": "Edit"
        });
      }
      setTableData(d)
    }

    fillTable()
  }, [])


//   const data = [
//   {
//     key: '1',
//     firstName: "Joe",
//     lastName: "Schmoe",
//     email: "joeschmoe@gmail.com",
//     skill: "Cook",
//     phone: "5454544596",
//     action: "Edit"
//   },
//   {
//     key: '2',
//     firstName: "Harry",
//     lastName: " Wilson",
//     email: "harrywilson@gmail.com",
//     skill: "Construction Worker",
//     phone: "7548123547",
//     action: "Edit"
//   },
//   {
//     key: '3',
//     firstName: "Lorry",
//     lastName: "Bennete",
//     email: "lorrybennete@gmail.com",
//     skill: "hauler",
//     phone: "9865478514",
//     action: "Edit"
//   },
// ];

  return (
    <div className='workforcelist-table-card'>
      <Table columns={columns} dataSource={tableData} />
    </div>
  )
}

export default AddWorkforceList