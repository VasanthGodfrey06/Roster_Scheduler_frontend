import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import className from '../../../utils/class-names';
import { updatePageDada } from '../../../redux/page-data/actions';

import Contact from '../../../layout/components/doctor/Contact';
import { useDispatch } from 'react-redux';
import { usePageData } from '../../../hooks/usePage';

import { IPageData } from '../../../interfaces/page';
import Axios from 'axios';
import { useHistory } from 'react-router';

const pageData: IPageData = {
  title: 'Doctors',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Dashboard',
      route: 'default-dashboard'
    },
    {
      title: 'Doctors'
    }
  ]
};

const DoctorsPage = () => {
  usePageData(pageData);
  const [doctors, setDoctors] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  const getClass = (index: number, length: number) =>
    className({
      'mb-0': index === length - 1,
      'mb-md-0': index === length - 2 || index === length - 3
    });
  useEffect(() => {
    Axios.get(process.env.REACT_APP_BASE_URL + '/doctor/doctors', {
      headers: { 'x-access-token': localStorage.getItem('token') }
    })
      .then((response) => {
        console.log(response.data.result);

        setDoctors(response.data.result);
        setTimeout(() => dispatch(updatePageDada({ fulFilled: true, loaded: true })), 300);
      })
      .catch((err) => {
        message.error('Unable to fetch the data');
        history.push('/vertical/default-dashboard');
      });
    // eslint-disable-next-line
  }, []);

  if (doctors) {
    return (
      <div className='row'>
        {doctors.map((doctor, index) => (
          <div key={index} className='col-sm-12 col-md-6 col-lg-4'>
            <Contact className={getClass(index, doctors.length)} {...doctor} />
          </div>
        ))}
      </div>
    );
  } else {
    return message.warning('Wait a second');
  }
};

export default DoctorsPage;
