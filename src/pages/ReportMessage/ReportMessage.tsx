import React, { useContext, useState } from 'react';
import moment from 'moment';
import { Button, Form, Input, DatePicker, message } from 'antd';
import { IPageData } from '../../interfaces/page';
import { usePageData } from '../../hooks/usePage';
import { SendOutlined, CloseOutlined, SolutionOutlined } from '@ant-design/icons/lib';
import { useHistory } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Axios from 'axios';

const TextArea = Input.TextArea;

const pageData: IPageData = {
  fulFilled: true,
  title: 'Report Form',
  breadcrumbs: [
    {
      title: 'Dashboard',
      route: 'default-dashboard'
    },
    {
      title: 'Report message'
    }
  ]
};
const { Item } = Form;

const ReportMessage = () => {
  const dateFormat = 'YYYY/MM/DD';
  const { currentUser } = useContext(AuthContext);
  const [issue, setIssue] = useState('');
  const [date, setDate] = useState(null);
  const history = useHistory();
  usePageData(pageData);

  function disabledDate(current) {
    return current && current > moment().endOf('day');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date) {
      let dateDb =
        date._d.getFullYear() + '-' + (parseInt(date._d.getMonth()) + 1) + '-' + date._d.getDate();
      Axios.post(
        process.env.REACT_APP_BASE_URL + '/api/report',
        {
          userid: currentUser.user_id,
          msg: issue,
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
  if (currentUser) {
    return (
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <Form layout='vertical' onSubmitCapture={handleSubmit}>
            <Item name='view-report'>
              <Button
                onClick={() => {
                  history.push('/vertical/view-report');
                }}
                type='primary'
                icon={<SolutionOutlined />}
              >
                Click hear to view previous reports
              </Button>
            </Item>
            <Form.Item label='Occured Date'>
              <Item name='Date Picker' rules={[{ required: true, message: <>Select the date</> }]}>
                <DatePicker
                  format={dateFormat}
                  onChange={(datetime) => setDate(datetime)}
                  disabledDate={disabledDate}
                />
              </Item>
            </Form.Item>
            <Form.Item label='Reason for the problem'>
              <Item name='Reason' rules={[{ required: true, message: <>Type the issue </> }]}>
                <TextArea
                  placeholder='Type Your Report Message...'
                  onChange={(e) => setIssue(e.target.value)}
                  rows={4}
                  allowClear
                  required
                />
              </Item>
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
                  Cancel Form
                </Button>

                <Button type='primary' icon={<SendOutlined />} htmlType='submit'>
                  Send Form
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

export default ReportMessage;
