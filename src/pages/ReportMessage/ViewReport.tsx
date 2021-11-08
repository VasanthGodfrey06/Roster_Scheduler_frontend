import React, { useEffect, useState, useContext } from 'react';
import { Table, message } from 'antd';
import { IPageData } from '../../interfaces/page';
import { usePageData } from '../../hooks/usePage';
import { useDispatch } from 'react-redux';
import { updatePageDada } from '../../redux/page-data/actions';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const pageData: IPageData = {
  title: 'ListOfReport',
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Report message',
      route: 'send-report'
    },
    {
      title: 'View report'
    }
  ]
};

const Viewleave = () => {
  const [data, setData] = useState(null);
  const [filteredInfo, setfilterInfo] = useState(null);
  const [sortedInfo, setSortedInfo] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  usePageData(pageData);

  useEffect(() => {
    async function getViewReport() {
      await Axios.get(process.env.REACT_APP_BASE_URL + '/doctor/viewreport', {
        headers: { 'x-access-token': localStorage.getItem('token') },
        params: { id: currentUser.user_id }
      })
        .then((response) => {
          response.data.result.map((element) => {
            if (element.status === 0) {
              element.status = 'Delivered';
            } else {
              element.status = 'Seen';
            }
            return null;
          });
          setTimeout(() => dispatch(updatePageDada({ fulFilled: true, loaded: true })), 300);
          setData(response.data.result);
        })
        .catch((err) => {
          message.error('Unable to fetch the data');
          history.push('/vertical/send-report');
        });
    }
    if (currentUser) {
      getViewReport();
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter);
    setfilterInfo(filters);
  };

  let sorted = sortedInfo || {};
  let filtered = filteredInfo || {};

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
      // filteredValue: filtered.name || null,
      // onFilter: (value, record) => record.name.includes(value),
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortOrder: sorted.columnKey === 'name' && sorted.order,
      // ellipsis: true,
    },

    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message'
      // sorter: (a, b) => a.message - b.message,
      // sortOrder: sorted.columnKey === 'message' && sorted.order,
      // ellipsis: true,
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Delivered', value: 'Delivered' },
        { text: 'Seen', value: 'Seen' }
      ],
      filteredValue: filtered.status || null,
      onFilter: (value, record) => record.status.includes(value),
      // sorter: (a, b) => a.status.length - b.status.length,
      sortOrder: sorted.columnKey === 'status' && sorted.order,
      ellipsis: true
    }
  ];
  console.log(data);
  if (currentUser) {
    if (data) {
      return (
        <>
          <Table columns={columns} dataSource={data} onChange={handleChange} />
        </>
      );
    } else {
      return null;
    }
  } else {
    return message.warning('Wait a second');
  }
};
export default Viewleave;
