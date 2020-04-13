import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Header, Icon, Button, Card, Image, Popup } from 'semantic-ui-react';
import './Home.css';
import AddPerson from '../../components/AddPerson';
import cardiology from '../../static/card.jpg';
import neurology from '../../static/neur.jpg';
import oncology from '../../static/onc.jpg';
import rheumatology from '../../static/rheum.jpg';

class Home extends Component {
  constructor() {
    super();

    this.state = {
      openAdd: false,
      type: '',
      myNurses: [
        {id: 1, name: "Tom Smith"},
        {id: 2, name: "Sam Woo"},
      ],
      myPatients: [
        {id: 1, name: "Jerry Asd"},
        {id: 2, name: "Jerry Asd"},
        {id: 3, name: "Jerry Asd"},
        {id: 4, name: "Jerry Asd"},
      ],
      departments: [
        {id: 1, name: "Cardiology", img: cardiology, doctors: 12, nurses: 4, patients: 30, location: 'Somewhere 1', phone: '+123'},
        {id: 2, name: "Neurology", img: neurology, doctors: 10, nurses: 5, patients: 35, location: 'Somewhere 2', phone: '+145'},
        {id: 3, name: "Oncology", img: oncology, doctors: 6, nurses: 2, patients: 20, location: 'Somewhere 3', phone: '+234'},
        {id: 3, name: "Rheumatology", img: rheumatology, doctors: 3, nurses: 1, patients: 15, location: 'Somewhere 4', phone: '+564'}
      ]
    };
  }

  clickAdd = (type) => {
    const { openAdd } = this.state;

    this.setState({ openAdd: !openAdd, type  });
  }

  getCard(title, description, icon, count, id) {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Description>
            {description}
            <span><Icon name={icon} /> {count}</span>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='blue' onClick={() => this.clickAdd(id)}>
              <Icon name='add circle' />
              Add
            </Button>
            <Button basic color='violet'>
              <Icon name='list alternate' />
              View
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }

  getMyInfo = () => {
    const { myNurses, myPatients, type, openAdd } = this.state;

    return (
      <div className='myInfo-cards'>
        {this.getCard('My Nurses', 'Nurses under my responsibility', 'male', myNurses.length, 'nurse')}
        {this.getCard('My Patients', 'Patients under my responsibility', 'bed', myPatients.length, 'patient')}
        {openAdd && <AddPerson type={type} isOpen={openAdd} clicked={() => this.clickAdd()} />}
      </div>
    );
  }

  getDepartmentCards() {
    const { departments } = this.state;

    return (
      <div className='departments-cards'>
        {departments && departments.map((item, index) => {
          const { id, name, img, doctors, nurses, patients, location, phone } = item;
          return (
            <Card className='dept-card' key={`dept-key-${index}`}>
              <Image src={img} wrapped ui={false} size='small'/>
              <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                  <div>
                    <Popup
                      trigger={<span><Icon name='doctor' /> {doctors}</span>}
                      content='Doctors'
                      position='top center'
                      inverted
                    />
                    <Popup
                      trigger={<span><Icon name='male' /> {nurses}</span>}
                      content='Nurses'
                      position='top center'
                      inverted
                    />
                    <Popup
                      trigger={<span><Icon name='bed' /> {patients}</span>}
                      content='Patients'
                      position='top center'
                      inverted
                    />
                  </div>
                  <Popup
                    trigger={<div><Icon name='point' /> {location}</div>}
                    content='Location'
                    position='top left'
                    inverted
                  />
                  <Popup
                    trigger={<div><Icon name='phone' /> {phone}</div>}
                    content='Phone'
                    position='top left'
                    inverted
                  />
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div>View</div>
                <div>
                  <a href={`/departments/${id}/doctors`}>
                    <Icon name='doctor' />
                    Doctors
                  </a>
                  <a href={`/departments/${id}/nurses`}>
                    <Icon name='male' />
                    Nurses
                  </a>
                </div>
              </Card.Content>
            </Card>
          );
        })}
      </div>
    );
  }

  render () {
    return (
      <div className='home'>
        <div className='divider'>
          <Header as='h4'>
            <Icon name='info' />
            My Plate
          </Header>
          <Divider />
        </div>
        {this.getMyInfo()}
        <div className='divider'>
          <Header as='h4'>
            <Icon name='building' />
            Departments
          </Header>
          <Divider />
        </div>
        {this.getDepartmentCards()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
});

function mapDispatchToProps(dispatch) {
  return {
    // _login: data => dispatch(login(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
