import React, { useEffect, useState, useContext } from 'react';
import { Table, message } from 'antd';
import { IPageData } from '../../interfaces/page';
import { usePageData } from '../../hooks/usePage';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { updatePageDada } from '../../redux/page-data/actions';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const pageData: IPageData = {
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Apply leave',
      route: 'leave-application'
    },
    {
      title: 'view leave'
    }
  ]
};

const Viewleave = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [filteredInfo, setfilterInfo] = useState(null);
  const [sortedInfo, setSortedInfo] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  usePageData(pageData);

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter);
    setfilterInfo(filters);
  };

  useEffect(() => {
    async function getViewLeave() {
      Axios.get(process.env.REACT_APP_BASE_URL + '/doctor/viewleave', {
        headers: { 'x-access-token': localStorage.getItem('token') },
        params: { id: currentUser.user_id }
      })
        .then((response) => {
          setData(response.data.result);
          setTimeout(() => dispatch(updatePageDada({ fulFilled: true, loaded: true })), 300);
        })
        .catch((err) => {
          message.error('Error occurred');
          history.push('/vertical/view-leave');
        });
    }
    if (currentUser) {
      getViewLeave();
    }
    // eslint-disable-next-line
  }, [currentUser]);

  let sorted = sortedInfo || {};
  let filtered = filteredInfo || {};

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'pending', value: 'pending' },
        { text: 'rejected', value: 'rejected' },
        { text: 'approved', value: 'approved' }
      ],
      filteredValue: filtered.status || null,
      onFilter: (value, record) => record.status.includes(value),
      // sorter: (a, b) => a.status.length - b.status.length,
      sortOrder: sorted.columnKey === 'status' && sorted.order,
      ellipsis: true
    }
  ];
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
