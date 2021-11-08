import React, { useState, useContext } from 'react';
import moment from 'moment';
import { Button, Form, DatePicker, message } from 'antd';
import { IPageData } from '../../interfaces/page';
import { usePageData } from '../../hooks/usePage';
import { SendOutlined, CloseOutlined, SolutionOutlined } from '@ant-design/icons/lib';
import { useHistory } from 'react-router';
import Axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

const pageData: IPageData = {
  fulFilled: true,
  title: 'Leave Application',
  breadcrumbs: [
    {
      title: 'Dashboard',
      route: 'default-dashboard'
    },
    {
      title: 'Apply leave'
    }
  ]
};
const { Item } = Form;

const ApplyForLeave = () => {
  const history = useHistory();
  const [datetime, setDatetime] = useState(null);
  const { currentUser } = useContext(AuthContext);
  usePageData(pageData);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (datetime) {
      let dateDb =
        datetime._d.getFullYear() +
        '-' +
        (parseInt(datetime._d.getMonth()) + 1) +
        '-' +
        datetime._d.getDate();
      Axios.post(
        process.env.REACT_APP_BASE_URL + '/doctor/leave',
        {
          userid: currentUser.user_id,
          date: dateDb
        },
        {
          headers: {
            'x-access-token': localStorage.getItem('token')
          }
        }
      )
        .then((response) => {
          if (!response.data.err) {
            message.success('Entered successfuly');
          }
        })
        .catch((err) => {
          message.error('Error occurred');
        });
    }
    return false;
  };
  function disabledDate(current) {
    return current && current < moment().startOf('day');
  }
  if (currentUser) {
    return (
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <Form layout='vertical' onSubmitCapture={handleSubmit}>
            <Item name='view-leave'>
              <Button
                onClick={() => {
                  history.push('/vertical/view-leave');
                }}
                type='primary'
                icon={<SolutionOutlined />}
              >
                Click hear to view the previous leaves
              </Button>
            </Item>
            <Form.Item label='Date And Time'>
              <Item name='Date Picker' rules={[{ required: true, message: <>Select the date</> }]}>
                <DatePicker
                  format='YYYY-MM-DD'
                  disabledDate={disabledDate}
                  onChange={(date) => setDatetime(date)}
                />
              </Item>
              {/* <p>{datetime}</p> */}
            </Form.Item>

            <div className='d-flex justify-content-end'>
              <div className='elem-list'>
                <Button
                  onClick={() => {
                    history.push('/vertical/default-dashboard');
                  }}
                  ghost
                  danger
                  icon={<CloseOutlined />}
                >
                  Cancel
                </Button>

                <Button type='primary' icon={<SendOutlined />} htmlType='submit'>
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  } else {
    return message.warning('Wait s second');
  }
};
export default ApplyForLeave;
