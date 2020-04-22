import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LeftSideList } from 'evermut';
import { Header, Image, Divider, Icon } from 'semantic-ui-react';
import '../Nurses/Nurses.css';

import doctor1 from '../../static/doctor1.jpg';

class Doctors extends Component {
	constructor() {
		super();

		this.state = {
			list: [
        {id: 1, name: "Smt Wasd"},
        {id: 2, name: "Bgh Rgfdfg"},
      ],
      singlePerson: {
        id: 1,
        name: "Smt Wasd",
        img: doctor1,
        phone: '+12312312',
        email: 'SmtWasd@gmail.com',
        department: 'Cardiology',
        patients: 12,
      },
      selected: 1, // id of a doctor that is selected
		}
	}

  componentDidMount() {
    const { doctorId, departmentId } = this.props.match.params;

    // doctorId && this._getDoctor(doctorId);
    // if (!this.props.doctors.length && !this.props.doctorLoading) {
    //   this.props._getDoctors();
    // }

    if(!doctorId) {
      this.props.history.push(`/departments/${departmentId}/doctors/${1}`);
    }
  }

  componentDidUpdate(prevProps) {
    // const { match } = prevProps;
    // const { params } = this.props.match;

    // if (match.params.nurseId !== params.nurseId) {
    //   this._getNurse(nurseId);

    // if(prevProps.nursesLoading && !this.props.nursesLoading && this.props.nurses.length) {
    //   this.props.history.push(`my/nurse/${this.props.nurses[0].id}`);
    // }
  }

	goBack = () => {
    const { history } = this.props;

    history.push(`/home`);
  }

  selectItem(id) {
    const { departmentId } = this.props.match.params;

    this.setState({ selected: id });
    this.props.history.push(`/departments/${departmentId}/doctors/${id}`);
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

  getHospitalInfo() {
    const { singlePerson } = this.state;
    const { department, patients, tasks } = singlePerson;

    return (
      <div className='personal-info'>
        <div><Icon name='building' /> {department}</div>
        <div><Icon name='tag' /> Doctor</div>
        <div><Icon name='bed' /> {patients}</div>
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
        </div>
        <Divider />
        <Header as='h3'>
          <Icon name='user circle' />
          Personal Info
        </Header>
        {this.getPeronalInfo()}
        <Header as='h3'>
          <Icon name='hospital outline' />
          Hospital Info
        </Header>
        {this.getHospitalInfo()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctors);
