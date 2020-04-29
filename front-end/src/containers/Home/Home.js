import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Header, Icon, Button, Card, Image, Popup } from 'semantic-ui-react';
import { Loader } from 'evermut';
import './Home.css';
import { getInfo } from '../../actions/homeInfo';
import AddPerson from '../../components/AddPerson';
import cardiology from '../../static/card.jpg';
import neurology from '../../static/neur.jpg';
import oncology from '../../static/onc.jpg';
import rheumatology from '../../static/rheum.jpg';

class Home extends Component {
  constructor(props) {
    super(props);

    props._getInfo(props.user.accessToken, props.user.email);

    this.state = {
      openAdd: false,
      type: '',
      departments: [],
      imgArray: [
        { name: "Cardiology", img: cardiology },
        { name: "Neurology", img: neurology },
        { name: "Oncology", img: oncology },
        { name: "Rheumatology", img: rheumatology }
      ]
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.homeLoading && !this.props.homeLoading) {
      this.getDepartmentImages();
    }
  }

  clickAdd = type => {
    const { openAdd } = this.state;

    this.setState({ openAdd: !openAdd, type  });
  }

  clickView = type => {
    const { history } = this.props;

    history.push(`/my/${type}s`);
  }

  getCard(title, description, icon, count, type) {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{title}</Card.Header>
          <Card.Description>
            {description}
            <span><Icon name={icon} /> {count || '-'}</span>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='blue' onClick={() => this.clickAdd(type)}>
              <Icon name='add circle' />
              Add
            </Button>
            <Button basic color='violet' onClick={() => this.clickView(type)}>
              <Icon name='list alternate' />
              View
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }

  getMyInfo = () => {
    const { type, openAdd } = this.state;
    const { NursesUnderMyResponsibility, PatientsUnderMyResponsibility } = this.props.info;

    return (
      <div className='myInfo-cards'>
        {this.getCard('My Nurses', 'Nurses under my responsibility', 'male', NursesUnderMyResponsibility, 'nurse')}
        {this.getCard('My Patients', 'Patients under my responsibility', 'bed', PatientsUnderMyResponsibility, 'patient')}
        {openAdd && <AddPerson type={type} isOpen={openAdd} clicked={() => this.clickAdd()} />}
      </div>
    );
  }

  getDepartmentImages() {
    const { imgArray } = this.state;
    const { AllDepartmentsInfo } = this.props.info;

    const departments = AllDepartmentsInfo.map(item => {
      const found = imgArray.find(i => i.name === item.name);
      item.img = found.img;
      return item
    })

    this.setState({ departments })
  }

  getDepartmentCards() {
    const { departments } = this.state;

    return (
      <div className='departments-cards'>
        {((departments && departments.map((item, index) => {
          const { name, img, NumberOfDoctors, NumberOfNurses, NumberOfPatients, location, phoneNumber, headDoctor } = item;
          return (
            <Card className='dept-card' key={`dept-key-${index}`}>
              <Image src={img} wrapped ui={false} size='small'/>
              <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                  <div>
                    <Popup
                      trigger={<span><Icon name='doctor' /> {NumberOfDoctors}</span>}
                      content='Doctors'
                      position='top center'
                      inverted
                    />
                    <Popup
                      trigger={<span><Icon name='male' /> {NumberOfNurses}</span>}
                      content='Nurses'
                      position='top center'
                      inverted
                    />
                    <Popup
                      trigger={<span><Icon name='bed' /> {NumberOfPatients}</span>}
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
                    trigger={<div><Icon name='phone' /> {phoneNumber}</div>}
                    content='Phone'
                    position='top left'
                    inverted
                  />
                  <Popup
                    trigger={<div><Icon name='user circle' /> {headDoctor}</div>}
                    content='Head Doctor'
                    position='top left'
                    inverted
                  />
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div>View</div>
                <div>
                  <a href={`/departments/${name}/doctors`}>
                    <Icon name='doctor' />
                    Doctors
                  </a>
                  <a href={`/departments/${name}/nurses`}>
                    <Icon name='male' />
                    Nurses
                  </a>
                </div>
              </Card.Content>
            </Card>
          );
        })) || <div>No departments</div>)}
      </div>
    );
  }

  render () {
    const { homeLoading, error } = this.props;

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
        {error && <div className='error' style={{marginBottom: '15px'}}>{error}</div>}
        <div className='divider'>
          <Header as='h4'>
            <Icon name='building' />
            Departments
          </Header>
          <Divider />
        </div>
        {(!homeLoading && this.getDepartmentCards()) || <Loader height='400px' />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  error: state.homeInfo.error,
  info: state.homeInfo.info,
  homeLoading: state.homeInfo.homeLoading
});

function mapDispatchToProps(dispatch) {
  return {
    _getInfo: (token, email) => dispatch(getInfo(token, email)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
