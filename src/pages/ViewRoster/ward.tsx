import React, { useState } from 'react';
import moment from 'moment';
import './Ward.scss';
import { Button, DatePicker, Form } from 'antd';
import { useHistory } from 'react-router';

const { Item } = Form;

const Ward = ({ className, ward_id, ward_name, min_docs }) => {
  const [date, setDate] = useState(null);
  const history = useHistory();
  function disabledDate(current) {
    return current && current > moment().startOf('month');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date) {
      let dateDb =
        date._d.getFullYear() + '-' + ('0' + (parseInt(date._d.getMonth()) + 1)).slice(-2);
      history.push('/vertical/events-calendar/' + ward_id + '/' + dateDb + '/' + ward_name);
    }
    return false;
  };
  return (
    <Form layout='vertical' onSubmitCapture={handleSubmit}>
      <div className={`contact ${className}`}>
        <div className='info-box'>
          <h4 className='name'>{'Ward Name: ' + ward_name}</h4>

          <h6 className='role'>
            <b>Ward ID :</b> {ward_id}
          </h6>

          <h6 className='address'>{'Minimum Doctors: ' + min_docs}</h6>
          <Item name='Date Picker' rules={[{ required: true, message: <>Select the date</> }]}>
            <DatePicker
              picker='month'
              disabledDate={disabledDate}
              onChange={(date) => setDate(date)}
            />
          </Item>

          <div className='button-box'>
            <Button type='primary' htmlType='submit'>
              View Roster
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Ward;
