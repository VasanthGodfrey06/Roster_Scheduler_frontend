import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import className from '../../utils/class-names';
import { updatePageDada } from '../../redux/page-data/actions';

import { useDispatch } from 'react-redux';
import { usePageData } from '../../hooks/usePage';
import Ward from './ward';
import { IPageData } from '../../interfaces/page';
import Axios from 'axios';
import { useHistory } from 'react-router';

const pageData: IPageData = {
  title: 'Wards',
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Dashboard',
      route: 'default-dashboard'
    },
    {
      title: 'Wards'
    }
  ]
};

const DoctorsPage = () => {
  usePageData(pageData);
  const [wards, setWards] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const getClass = (index: number, length: number) =>
    className({
      'mb-0': index === length - 1,
      'mb-md-0': index === length - 2 || index === length - 3
    });
  useEffect(() => {
    Axios.get(process.env.REACT_APP_BASE_URL + '/doctor/wards', {
      headers: { 'x-access-token': localStorage.getItem('token') }
    })
      .then((response) => {
        console.log(response.data.result);

        setWards(response.data.result);
        setTimeout(() => dispatch(updatePageDada({ fulFilled: true, loaded: true })), 300);
      })
      .catch((err) => {
        message.error('Unable to fetch the data');
        history.push('/vertical/default-dashboard');
      });
    // eslint-disable-next-line
  }, []);

  if (wards) {
    return (
      <div className='row'>
        {wards.map((ward, index) => (
          <div key={index} className='col-sm-12 col-md-6 col-lg-4'>
            <Ward className={getClass(index, wards.length)} {...ward} />
          </div>
        ))}
      </div>
    );
  } else {
    return message.warning('Wait a second');
  }
};

export default DoctorsPage;
