import { Form, Button, Space, DatePicker, message, Divider, Badge, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { usePageData } from '../../hooks/usePage';
import { IPageData } from '../../interfaces/page';
import Axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { updatePageDada } from '../../redux/page-data/actions';
import { useDispatch } from 'react-redux';
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
  usePageData(pageData);
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const [dates, setDates] = useState(null);
  function disabledDate(current) {
    const minDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1);
    const maxDate = new Date(new Date().getFullYear(), new Date().getMonth() + 2);

    // return current && current < moment().endOf('month');
    return minDate > current._d || maxDate < current._d;
    // return current<maxDate;
  }

  const onFinish = (values) => {
    let pretime = [null, null, null, null, null];
    let pretimeWithoutNull = [];
    // console.log('Received values of form:', values);

    values.date.map((mom, idx) => {
      let dateDb =
        mom.date._d.getFullYear() +
        '-' +
        (parseInt(mom.date._d.getMonth()) + 1) +
        '-' +
        mom.date._d.getDate();
      pretime[idx] = dateDb;
      pretimeWithoutNull.push(dateDb);
      return null;
    });

    if (pretimeWithoutNull.length === new Set(pretimeWithoutNull).size) {
      Axios.post(
        process.env.REACT_APP_BASE_URL + '/api/preslot',
        {
          userid: currentUser.user_id,
          datelist: pretime
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
    } else {
      message.error('Please enter different dates');
    }
  };
  const getPre = () => {
    Axios.get(process.env.REACT_APP_BASE_URL + '/api/selectedSlots', {
      headers: { 'x-access-token': localStorage.getItem('token') },
      params: { userid: currentUser.user_id }
    })
      .then((response) => {
        console.log(response.data.result);

        setDates(response.data.result[0]);
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
      console.log(dates.date1);
      console.log('dates');
      // dates.map((date) => console.log(date));
      return (
        <>
          <Card>
            <Divider orientation='left'>Selected Dates</Divider>
            <div>
              <div key={dates.date1}>
                <Badge color={'red'} text={dates.date1} />
              </div>
            </div>
            <div>
              <div key={dates.date2}>
                <Badge color={'red'} text={dates.date2} />
              </div>
            </div>
            <div>
              <div key={dates.date3}>
                <Badge color={'red'} text={dates.date3} />
              </div>
            </div>
            <div>
              <div key={dates.date4}>
                <Badge color={'red'} text={dates.date4} />
              </div>
            </div>
            <div>
              <div key={dates.date5}>
                <Badge color={'red'} text={dates.date5} />
              </div>
            </div>
          </Card>
          <Form name='dynamic_form_nest_item' onFinish={onFinish} autoComplete='off'>
            <Form.List name='date'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                      <Form.Item
                        {...restField}
                        name={[name, 'date']}
                        fieldKey={[fieldKey, 'date']}
                        rules={[{ required: true, message: 'Missing date' }]}
                      >
                        {/* <Input placeholder="Last Name" /> */}
                        <DatePicker allowClear format='DD/MM/yyyy' disabledDate={disabledDate} />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    {fields.length < 5 ? (
                      <Button type='default' onClick={() => add()} block icon={<PlusOutlined />}>
                        Add field
                      </Button>
                    ) : null}
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      );
    }
    return (
      <Form name='dynamic_form_nest_item' onFinish={onFinish} autoComplete='off'>
        <Form.List name='date'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                  <Form.Item
                    {...restField}
                    name={[name, 'date']}
                    fieldKey={[fieldKey, 'date']}
                    rules={[{ required: true, message: 'Missing date' }]}
                  >
                    {/* <Input placeholder="Last Name" /> */}
                    <DatePicker allowClear format='DD/MM/yyyy' disabledDate={disabledDate} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                {fields.length < 5 ? (
                  <Button type='default' onClick={() => add()} block icon={<PlusOutlined />}>
                    Add field
                  </Button>
                ) : null}
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  } else {
    return message.warning('Wait s second');
  }
};

export default SelectPre;
