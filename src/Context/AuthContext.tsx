import React, { useEffect } from 'react';
import { message } from 'antd';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
export const AuthContext = React.createContext(null);

export default function AuthProvieder({ children }) {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const history = useHistory();

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    console.log(process.env.REACT_APP_BASE_URL);

    Axios.get(process.env.REACT_APP_BASE_URL + '/api/login', {
      headers: { 'x-access-token': localStorage.getItem('token') }
    }).then((response) => {
      setCurrentUser(response.data.result[0]);
      setIsModalVisible(true);
    });
  }, []);

  const login = (username, password) => {
    Axios.post(process.env.REACT_APP_BASE_URL + '/api/login', {
      username: username,
      password: password
    }).then((response) => {
      if (!response.data.auth) {
        message.error(response.data.message);
      } else {
        localStorage.setItem('token', response.data.token);
        message.success('Hi...  ' + response.data.result[0].username);
        setCurrentUser(response.data.result[0]);
        setIsModalVisible(true);
        history.push('/vertical/default-dashboard');
      }
    });
  };

  const logout = () => {
    Axios.get(process.env.REACT_APP_BASE_URL + '/api/logout', {
      headers: { 'x-access-token': localStorage.getItem('token') }
    });
    localStorage.removeItem('token');
  };

  const value = {
    currentUser,
    setCurrentUser,
    login,
    logout,
    isModalVisible,
    setIsModalVisible
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
