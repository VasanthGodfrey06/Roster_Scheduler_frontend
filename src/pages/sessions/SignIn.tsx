import Axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Form, Input, Switch } from 'antd';
import { LoginOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons/lib';

import PublicLayout from '../../layout/public/Public';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { useForm } from 'antd/es/form/Form';

const { Item } = Form;

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isModalVisible, setIsModalVisible, logout } = useContext(AuthContext);

  const history = useHistory();
  const [form] = useForm();

  Axios.defaults.withCredentials = true;

  const handleOk = () => {
    setIsModalVisible(false);
    logout();
    history.push('/public/sign-in');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    history.push('/vertical/default-dashboard');
  };

  const handleLogin = () => {
    form
      .validateFields()
      .then(() => {
        login(username, password);
      })
      .catch(() => null);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsModalVisible(true);
    }
  }, []);

  return (
    <PublicLayout bgImg={`${window.origin}/content/login-page.jpg`}>
      <h4 className='mt-0 mb-1'>Login form</h4>
      <p className='text-color-200'>Login to access your Account</p>
      <Form form={form} layout='vertical' className='mb-4'>
        <Item name='login' rules={[{ required: true, message: <></> }]}>
          <Input placeholder='User Name' onChange={(e) => setUsername(e.target.value)} />
        </Item>
        <Item name='password' rules={[{ required: true, message: <></> }]}>
          <Input.Password
            placeholder='Password'
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Item>
        <div className='d-flex align-items-center mb-4'>
          <Switch defaultChecked /> <span className='ml-2'>Remember me</span>
        </div>

        <Button
          block={false}
          type='primary'
          onClick={handleLogin}
          htmlType='submit'
          icon={<LoginOutlined style={{ fontSize: '1.3rem' }} />}
        >
          Login
        </Button>
      </Form>
      <br />
      {/* <p className='mb-1'>
        <Link to='sign-in'>Forgot password?</Link>
      </p>
      <p>
        Don't have an account? <p>Please contact with admin......</p>
      </p> */}
      <Modal
        title='Confirm'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Logout'
      >
        <p>
          You are already logged in as {username} , you need to log out before logging in as
          different user.
        </p>
      </Modal>
    </PublicLayout>
  );
};

export default SignIn;
