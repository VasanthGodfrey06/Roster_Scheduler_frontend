import React, { useContext } from 'react';
import { IPageData } from '../../interfaces/page';
import { usePageData } from '../../hooks/usePage';
import { Avatar, Card, message } from 'antd';
import { AuthContext } from '../../Context/AuthContext';

const pageData: IPageData = {
  title: 'User profile',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Dashboard',
      route: 'default-dashboard'
    },
    {
      title: 'User profile'
    }
  ]
};

const UserPreview = ({ currentUser }) => {
  const userCover = `${window.origin}/content/department-7.jpg`;
  const userAvatar = `${window.origin}/content/user-400-1.jpg`;

  return (
    <Card
      cover={<img src={userCover} alt='user-cover' />}
      className='personal-info-card with-shadow'
    >
      <div
        className='d-flex align-items-center justify-content-between'
        style={{ marginTop: '-50px' }}
      >
        <Avatar src={userAvatar} size={100} />
      </div>

      <div className='d-flex align-items-center justify-content-between'>
        <h5 className='mb-0 mt-0 mr-1'>{currentUser.username}</h5>
      </div>

      <p style={{ color: '#8f8f90' }}>Doctor</p>

      <p>
        As a medical doctor, it is my duty to evaluate the situation with as much data as I can
        gather and as much expertise as I have and as much experience as I have to determine whether
        or not the wish of the patient is medically justified.
      </p>
    </Card>
  );
};

const ContactInfo = () => {
  return (
    <Card title='Contact information' className='mb-md-0 with-shadow'>
      <div className='row align-items-center mb-3'>
        <div className='col col-auto'>
          <span className='icofont-ui-touch-phone' style={{ fontSize: 30, color: '#8f8f90' }} />
        </div>
        <div className='col'>
          <div>Mobile</div>
          0771598706
        </div>
      </div>

      <div className='row align-items-center mb-3'>
        <div className='col col-auto'>
          <span className='icofont-email' style={{ fontSize: 30, color: '#8f8f90' }} />
        </div>
        <div className='col'>
          <div>E-mail</div>
          victorjeyakumar.18@cse.mrt.ac.lk
        </div>
      </div>

      <div className='row align-items-center mb-3'>
        <div className='col col-auto'>
          <span className='icofont-location-pin' style={{ fontSize: 30, color: '#8f8f90' }} />
        </div>
        <div className='col'>
          <div>Current Address</div>
          College Lane, Vaddukoddai.
        </div>
      </div>
    </Card>
  );
};

const UserProfilePage = () => {
  usePageData(pageData);
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return (
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <UserPreview currentUser={currentUser} />
          <ContactInfo />
        </div>

        <div className='col-md-6 col-sm-12'></div>
      </div>
    );
  } else {
    return message.warning('Wait a second');
  }
};

export default UserProfilePage;
