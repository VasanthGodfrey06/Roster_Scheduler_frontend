import React, { useState, useEffect } from 'react';
import { Button, Card, Modal, message, Divider, Badge } from 'antd';
import { updatePageDada } from '../../redux/page-data/actions';
import { IPageData } from '../../interfaces/page';
import { useDispatch } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { usePageData } from '../../hooks/usePage';
import { useParams, useHistory } from 'react-router-dom';
import Axios from 'axios';

// const headerOptions = {
//   left: 'prev,next today',
//   center: 'title',
//   right: 'dayGridMonth,dayGridWeek,dayGridDay'
// };

const pageData: IPageData = {
  title: 'Roster Calendar',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Dashboard',
      route: 'default-dashboard'
    },
    {
      title: 'View Roster',
      route: 'view-roster'
    },
    {
      title: 'Roster Calendar'
    }
  ]
};

interface ParamTypes {
  ward_id: string;
  date: string;
  ward_name: string;
}

const EventsCalendarPage = () => {
  usePageData(pageData);
  const [event, setEvent] = useState(null);
  const [modalVisibility, setModalVisibility] = useState(false);
  const { ward_id, date, ward_name } = useParams<ParamTypes>();
  const [events, setEvents] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const [desc, setDesc] = useState('');
  useEffect(() => {
    async function getRoaster() {
      await Axios.get(process.env.REACT_APP_BASE_URL + '/api/roster', {
        params: {
          wardid: ward_id,
          year: date.split('-')[0],
          month: date.split('-')[1]
        },
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
        .then((response) => {
          let eventsRes = [];
          JSON.parse(response.data.result[0].roster).map((item) => {
            let eventDate = date + '-' + ('0' + item.day).slice(-2);
            let className;
            if (item.data.morning.length > 0) {
              className = ['event-blue'];
              item.data.morning.map((id) => {
                let anEvent = {
                  title: 'Doctor ID: ' + id,
                  start: eventDate,
                  slot: 'morning',
                  className: className,
                  desc: ''
                };
                eventsRes.push(anEvent);
                return null;
              });
            }
            if (item.data.noon.length > 0) {
              className = ['event-error'];
              item.data.noon.map((id) => {
                let anEvent = {
                  title: 'Doctor ID: ' + id,
                  start: eventDate,
                  slot: 'noon',
                  className: className,
                  desc: ''
                };
                eventsRes.push(anEvent);
                return null;
              });
            }
            if (item.data.night.length > 0) {
              className = ['event-black'];
              item.data.night.map((id) => {
                let anEvent = {
                  title: 'Doctor ID: ' + id,
                  start: eventDate,
                  slot: 'night',
                  className: className,
                  desc: ''
                };
                eventsRes.push(anEvent);
                return null;
              });
            }
            return null;
          });
          setEvents(eventsRes);
        })
        .catch((err) => {
          message.error('Unable to fetch the data');
          history.push('/vertical/view-roster');
        });
    }

    getRoaster();
    // eslint-disable-next-line
  }, [date, ward_id]);

  const closeModal = () => setModalVisibility(false);

  const handleEventClick = (arg: any) => {
    Axios.get(process.env.REACT_APP_BASE_URL + '/api/doctor', {
      params: { id: arg.event._def.title.split(' ')[2] },
      headers: { 'x-access-token': localStorage.getItem('token') }
    })
      .then((response) => {
        setTimeout(() => dispatch(updatePageDada({ fulFilled: true, loaded: true })), 300);
        let fulldate = date + '-' + ('0' + arg.event._instance.range.start.getDate()).slice(-2);
        let shift = arg.event._def.extendedProps.slot;
        console.log(shift);

        setDesc(
          'Dr. ' +
            response.data.result[0].username +
            ' ' +
            'who take care of ward id ' +
            ward_id +
            '(' +
            ' ' +
            ward_name +
            ' ' +
            ')' +
            ' ' +
            'has taken a leave at' +
            ' ' +
            fulldate +
            ' ' +
            shift +
            ' ' +
            'shift.'
        );
        setEvent(arg.event);
        setModalVisibility(true);
      })
      .catch((err) => {
        console.log(err);

        message.error('Unable to fetch the data');
      });
  };

  let modalBody, modalTitle, modalFooter;

  if (event) {
    modalBody = (
      <div className='d-flex flex-column'>
        {/* <div className='event-time flex-column mb-4'>
          <h5 className='event-title m-0'>Event time</h5>
          <span>
            From: {event.start.toDateString()} - to: {event.end.toDateString()}
          </span>
        </div> */}

        <div className='event-desc flex-column'>
          {console.log(desc)}
          <h5 className='event-title m-0'>Doctor description</h5>
          <span>{desc}</span>
        </div>
      </div>
    );

    modalTitle = (
      <div className='title-block p-0 m-0'>
        <h3 style={{ color: event.backgroundColor }} className='modal-title m-0'>
          {event.title}
        </h3>
      </div>
    );

    modalFooter = (
      <div className='d-flex justify-content-between modal-footer'>
        <Button type='primary' onClick={closeModal} danger>
          Close
        </Button>
      </div>
    );
  }
  return (
    <>
      <Card className='mb-0'>
        <Divider orientation='left'>Presets</Divider>
        <div>
          <div>
            <Badge color={'blue'} text={'morning'} />
          </div>
        </div>
        <div>
          <div>
            <Badge color={'red'} text={'noon'} />
          </div>
        </div>
        <div>
          <div>
            <Badge color={'black'} text={'night'} />
          </div>
        </div>
        <FullCalendar
          eventClick={handleEventClick}
          events={events}
          // headerToolbar={headerOptions}
          initialDate={date}
          initialView='dayGridMonth'
          plugins={[dayGridPlugin]}
          dayMaxEvents={true}
          weekends
          nowIndicator={false}
        />
      </Card>

      <Modal
        title={modalTitle}
        footer={modalFooter}
        visible={modalVisibility}
        onCancel={closeModal}
      >
        {modalBody}
      </Modal>
    </>
  );
};

export default EventsCalendarPage;
