import { Form, Button, DatePicker, message, Divider, Badge, Card } from 'antd';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { usePageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';
import Axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { updatePageDada } from '../../redux/page-data/actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
const pageData: IPageData = {
  fulFilled: true,
  title: 'Select Preferences',
  breadcrumbs: [
    {
      title: 'Dashboard',
      route: 'default-dashboard'
    },
    {
      title: 'Select preferences'
    }
  ]
};

const SelectPre = () => {
  const { Item } = Form;

  usePageData(pageData);
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const [dates, setDates] = useState(null);
  const [datetime, setDatetime] = useState(null);

  function disabledDate(current) {
    const minDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1);
    const maxDate = new Date(new Date().getFullYear(), new Date().getMonth() + 2);

    // return current && current < moment().endOf('month');
    return minDate > current._d || maxDate < current._d;
    // return current<maxDate;
  }

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
        process.env.REACT_APP_BASE_URL + '/doctor/preslot',
        {
          userid: currentUser.user_id,
          date: dateDb
        },
        {
          headers: { 'x-access-token': localStorage.getItem('token') }
        }
      )
        .then((response) => {
          getPre();
          if (response.data.message) {
            if (response.data.message === 'Updated successfully') {
              message.success('Updated successfully');
            } else {
              message.success('Inserted successfully');
            }
          } else {
            console.log(response.data.err);
          }
        })
        .catch((err) => {
          message.error('Error occurred');
        });
    }
    return false;
  };
  const getPre = () => {
    Axios.get(process.env.REACT_APP_BASE_URL + '/doctor/selectedSlots', {
      headers: { 'x-access-token': localStorage.getItem('token') },
      params: { userid: currentUser.user_id }
    })
      .then((response) => {
        console.log(response.data.result[0].prefered_date);

        setDates(response.data.result[0].prefered_date);
        setTimeout(() => dispatch(updatePageDada({ fulFilled: true, loaded: true })), 300);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    async function Preference() {
      getPre();
    }
    if (currentUser) {
      Preference();
    }
    // eslint-disable-next-line
  }, [currentUser]);
  if (currentUser) {
    console.log('Currentuser');
    if (dates) {
      // dates.map((date) => console.log(date));
      return (
        <>
          <Card>
            <Divider orientation='left'>Selected Dates</Divider>
            <div>
              <div key={dates.date1}>
                <Badge color={'red'} text={dates} />
              </div>
            </div>
          </Card>
          <div className='row'>
            <div className='col-md-6 col-sm-12'>
              <Form layout='vertical' onSubmitCapture={handleSubmit}>
                <Form.Item label='Date And Time'>
                  <Item
                    name='Date Picker'
                    rules={[{ required: true, message: <>Select the date</> }]}
                  >
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
        </>
      );
    }
    return (
      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <Form layout='vertical' onSubmitCapture={handleSubmit}>
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

export default SelectPre;
