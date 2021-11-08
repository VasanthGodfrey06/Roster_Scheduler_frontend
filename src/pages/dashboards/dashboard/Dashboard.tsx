import React, { useContext, useEffect, useState } from 'react';

import { Card, message } from 'antd';
import { withRouter } from 'react-router-dom';

import { usePageData } from '../../../hooks/usePage';
import { IPageData } from '../../../interfaces/page';
import CustomShapeBarChart from '../../charts/recharts/charts/CustomShapeBarChart';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { AuthContext } from '../../../Context/AuthContext';
import { updatePageDada } from '../../../redux/page-data/actions';
const pageData: IPageData = {
  fulFilled: false,
  breadcrumbs: [
    {
      title: 'Dashboards',
      route: 'default-dashboard'
    }
  ]
};

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useContext(AuthContext);
  const [datas, setDatas] = useState([]);
  const [newone, setNewone] = useState(false);

  useEffect(() => {
    async function workHours() {
      Axios.get(process.env.REACT_APP_BASE_URL + '/doctor/hours', {
        headers: { 'x-access-token': localStorage.getItem('token') },
        params: { userid: currentUser.user_id }
      })
        .then((response) => {
          setDatas(response.data.result);
          setTimeout(() => dispatch(updatePageDada({ fulFilled: true, loaded: true })), 300);
        })
        .catch((err) => {
          // setTimeout(() => dispatch(updatePageDada({ fulFilled: true, loaded: true })), 300);
          if (err.response.status === 404) {
            message.warning(
              'You are the new one for this hospital, You could not see your last month working hours'
            );
            setNewone(true);

            setTimeout(() => dispatch(updatePageDada({ fulFilled: true, loaded: true })), 300);
          } else {
            message.error('Unable to fetch data');
          }
          // history.push('/vertical/view-roster');
        });
    }
    if (currentUser) {
      workHours();
    }
    // eslint-disable-next-line
  }, [currentUser]);

  usePageData(pageData);
  if (currentUser) {
    if (datas && datas.length > 0) {
      return (
        <>
          <Card title='Dashboard'>
            <div>
              <div className='img-box'>
                <img width='400' src={'content/doctor-400-4.jpg'} height='400' alt='avatar' />
              </div>

              <div className='info-box'>
                <h4 className='name'>{'Dr. ' + currentUser.username}</h4>

                <h6 className='role'>
                  <b>User ID :</b> {currentUser.user_id}
                </h6>

                <h6 className='address'>
                  {'Full Name: ' + currentUser.first_name + ' ' + currentUser.last_name}
                </h6>

                {/* <div className='button-box'>
          <Button type='primary' onClick={handleGoToProfile}>
            View profile
          </Button>
        </div> */}
              </div>
            </div>
          </Card>
          <div className='row'>
            <div className='col-12 col-md-6'>
              <Card title='Last Month Working Hours'>
                <Card
                  style={{ background: 'rgba(251, 251, 251)' }}
                  className='animated with-shadow'
                >
                  <div className='row'>
                    <div className='col-5'>
                      <span
                        className='icofont-wall-clock'
                        style={{ fontSize: 48, color: 'rgba(51, 108, 251, 0.5)' }}
                      />
                    </div>

                    <div className='col-7'>
                      <div
                        className='count'
                        style={{ fontSize: 20, color: 'red', lineHeight: 1.4 }}
                      >
                        {datas[0].work_hrs + ' hrs'}
                      </div>
                    </div>
                  </div>
                </Card>
              </Card>
            </div>
          </div>

          <Card title='Working hours information from previous months'>
            <CustomShapeBarChart datas={datas} />
          </Card>
        </>
      );
    } else if (newone) {
      return (
        <>
          <Card title='Dashboard'>
            <div className={`contact ${'mb-md-0l'}`}>
              <div className='img-box'>
                <img width='400' src={'content/doctor-400-4.jpg'} height='400' alt='avatar' />
              </div>

              <div className='info-box'>
                <h4 className='name'>{'Dr. ' + currentUser.username}</h4>

                <h6 className='role'>
                  <b>User ID :</b> {currentUser.user_id}
                </h6>

                <h6 className='address'>
                  {'Full Name: ' + currentUser.first_name + ' ' + currentUser.last_name}
                </h6>

                {/* <div className='button-box'>
          <Button type='primary' onClick={handleGoToProfile}>
            View profile
          </Button>
        </div> */}
              </div>
            </div>
          </Card>
        </>
      );
    }
    return null;
  } else {
    return null;
  }
};

export default withRouter(DashboardPage);
