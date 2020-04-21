import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LeftSideList } from 'evermut';
import { Header, Image, Divider, Button, Icon } from 'semantic-ui-react';
import '../Nurses/Nurses.css';
import './Patients.css';

import patientPic from '../../static/patient1.jpg';

class Patients extends Component {
	constructor() {
		super();

		this.state = {
			list: [
        {id: 1, name: "Betty Smith"},
        {id: 2, name: "Poghos Petros"},
      ],
      singlePerson: {
        id: 1,
        name: "Betty Smith",
        img: patientPic,
        phone: '+12312312',
        email: 'betty.smith@gmail.com',
        department: 'Cardiology',
        treatments: 3,
      },
      singlePersonTreatments: [
        {
          date: '01/03/2020',
          treatment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          date: '05/02/2020',
          treatment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
      ],
      selected: 1 // id of a patient that is selected
		}
	}

  componentDidMount() {
    const { patientId } = this.props.match.params;

    // patientId && this._getPatient(patientId);
    // if (!this.props.patients.length && !this.props.patientLoading) {
    //   this.props._getMyPatients();
    // }

    if(!patientId) {
      this.props.history.push(`/my/patient/${1}`);
    }
  }

  componentDidUpdate(prevProps) {
    // const { match } = prevProps;
    // const { params } = this.props.match;

    // if (match.params.patientId !== params.patientId) {
    //   this._getPatient(patientId);

    // if(prevProps.patientLoading && !this.props.patientLoading && this.props.patients.length) {
    //   this.props.history.push(`my/patient/${this.props.patients[0].id}`);
    // }
  }

	goBack = () => {
    const { history } = this.props;

    history.push(`/home`);
  }

  selectItem(id) {
    this.setState({ selected: id });
    this.props.history.push(`/my/patient/${id}`);
    //call the get single person info action by its id
  }

  _getLeftSideListHeader = (item) =>  {
    return (
      <Header as='h4' color='blue'>{item.name}</Header>
    );
  }

  getPeronalInfo() {
    const { singlePerson } = this.state;
    const { phone, email } = singlePerson;

    return (
      <div className='personal-info'>
        <div><Icon name='phone' /> {phone}</div>
        <div><Icon name='at' /> {email}</div>
      </div>
    );
  }

  getTreatmentsInfo() {
    const { singlePersonTreatments } = this.state;

    return (
      <div className='personal-info'>
        {singlePersonTreatments.map((item, index) => {
          const { date, treatment } = item;
          return (
            <div className='treatments' key={`patient-treat-${index}`}>
              <div><Icon name='calendar alternate' /> {date}</div>
              <div>{treatment}</div>
            </div>
          );
        }) || null}
      </div>
    );
  }

  getContent() {
    const { singlePerson, selected } = this.state;

    return (selected && singlePerson) ? (
    	<div className='single-person-content'>
        <div>
          <div>
      		  <Image src={singlePerson.img} size='small' />
            <Header as='h2'>{singlePerson.name}</Header>
          </div>
          <Button basic color='red' content='Delete' />
        </div>
        <Divider />
        <Header as='h3'>
          <Icon name='user circle' />
          Personal Info
        </Header>
        {this.getPeronalInfo()}
        <Header as='h3'>
          <Icon name='treatment' />
          Treatments
        </Header>
        {this.getTreatmentsInfo()}
    	</div>
    ) : null;
  }
  render () {
  	const { list, loading, selected } = this.state;

    return (
      <div className='component'>
      	<LeftSideList
          list={list}
          selected={selected}
          loading={loading}
          header={(item) => this._getLeftSideListHeader(item)}
          selectItem={(id) => this.selectItem(id)}
          backButtonName='Back to Home'
          backButtonClick={() => this.goBack()}
          backButtonStyle={{ marginBottom: 0, marginTop: 12}}
          containerStyle={{ width: 350 }}
        />
        {this.getContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
