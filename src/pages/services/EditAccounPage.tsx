import React, { useContext, useState } from 'react';
import { Button, Divider, Form, Input, message } from 'antd';

import { usePageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';
import { AuthContext } from '../../Context/AuthContext';
import Axios from 'axios';

const pageData: IPageData = {
  title: 'Edit account',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Dashboard',
      route: 'default-dashboard'
    },
    {
      title: 'Edit Account'
    }
  ]
};

const FormItem = Form.Item;

const AccountForm = ({ props }) => {
  const [username, setUsername] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  console.log(props.username);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(fname);
    console.log(lname);
    Axios.post(
      process.env.REACT_APP_BASE_URL + '/doctor/edit',
      {
        username: username === '' ? props.currentUser.username : username,
        fname: fname === '' ? props.currentUser.first_name : fname,
        lname: lname === '' ? props.currentUser.last_name : lname,
        userid: props.currentUser.user_id
      },
      {
        headers: { 'x-access-token': localStorage.getItem('token') }
      }
    )
      .then((response) => {
        if (response.data.auth) {
          console.log(response.data.result[0]);

          props.setCurrentUser(response.data.result[0]);

          // localStorage.removeItem("cookie");
          // console.log(response.data.cookie);

          // localStorage.setItem("cookie",JSON.stringify(response.data.cookie))
          message.success('Profile updated successfully');
        }
      })
      .catch((err) => {
        message.error('Error occurred');
      });
  };

  return (
    <Form layout='vertical' onSubmitCapture={handleChange}>
      <FormItem label='User name'>
        {console.log(props.currentUser)}
        <Input
          name='name'
          placeholder='User Name'
          defaultValue={props.currentUser.username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </FormItem>
      <FormItem label='First Name'>
        <Input
          name='name'
          placeholder='First Name'
          defaultValue={props.currentUser.first_name}
          onChange={(e) => {
            setFname(e.target.value);
          }}
        />
      </FormItem>

      <FormItem label='Last Name'>
        <Input
          name='lastName'
          defaultValue={props.currentUser.last_name}
          onChange={(e) => {
            setLname(e.target.value);
          }}
          placeholder='Last Name'
        />
      </FormItem>
      <Button type='primary' htmlType='submit'>
        Update Changes
      </Button>
    </Form>
  );
};

const PasswordForm = ({ currentUser }) => {
  const [curpass, setCurpass] = useState(null);
  const [conpass, setConpass] = useState(null);
  const handlePass = (e) => {
    Axios.post(
      process.env.REACT_APP_BASE_URL + '/doctor/password',
      {
        curpass: curpass,
        conpass: conpass,
        userid: currentUser.user_id
      },
      {
        headers: { 'x-access-token': localStorage.getItem('token') }
      }
    )
      .then((response) => {
        console.log(response.data);
        if (response.data.message) {
          message.success(response.data.message);
        } else {
          message.error(response.data.err);
        }
      })
      .catch((err) => {
        message.error('Error occurred');
      });
  };

  return (
    <Form layout='vertical' onSubmitCapture={handlePass}>
      <FormItem label='Current password'>
        <Input.Password
          placeholder='Current Password'
          onChange={(e) => {
            setCurpass(e.target.value);
          }}
        />
      </FormItem>

      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <FormItem
            name='password'
            label='New Password'
            rules={[{ required: true, message: 'Please enter new password' }]}
          >
            <Input.Password
              placeholder='New Password'
              onChange={(e) => {
                setConpass(e.target.value);
              }}
            />
          </FormItem>
        </div>

        <div className='col-md-6 col-sm-12'>
          <FormItem
            name='confirmPassword'
            label='Confirm Password'
            rules={[
              {
                required: true,
                message: 'Please confirm your password!'
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                }
              })
            ]}
          >
            <Input.Password placeholder='Confirm Password' />
          </FormItem>
        </div>
      </div>

      <Button type='primary' htmlType='submit'>
        Change password
      </Button>
    </Form>
  );
};

const EditAccountPage = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  usePageData(pageData);
  if (currentUser) {
    return (
      <div className='stack' style={{ maxWidth: 690, margin: '0 auto' }}>
        {/* {console.log(currentUser)} */}
        <AccountForm props={{ currentUser, setCurrentUser }} />

        <Divider />

        <PasswordForm currentUser={currentUser} />
      </div>
    );
  } else {
    return message.warning('Wait s second');
  }
};

export default EditAccountPage;
