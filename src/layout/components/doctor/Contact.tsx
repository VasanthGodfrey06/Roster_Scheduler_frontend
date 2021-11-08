import React from 'react';
import './Contact.scss';

const Contact = ({ className, user_id, username, first_name, last_name }) => {
  console.log('className ' + className);

  return (
    <div className={`contact ${className}`}>
      <div className='img-box'>
        <img width='400' src={'content/doctor-400-4.jpg'} height='400' alt='avatar' />
      </div>

      <div className='info-box'>
        <h4 className='name'>{'Dr. ' + username}</h4>

        <h6 className='role'>
          <b>User ID :</b> {user_id}
        </h6>

        <h6 className='address'>{first_name + ' ' + last_name}</h6>

        {/* <div className='button-box'>
          <Button type='primary' onClick={handleGoToProfile}>
            View profile
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default Contact;
