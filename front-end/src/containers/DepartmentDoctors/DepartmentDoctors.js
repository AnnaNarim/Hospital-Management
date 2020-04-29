import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LeftSideList, Loader } from 'evermut';
import { Header, Image, Divider, Icon } from 'semantic-ui-react';
import { getDepartmentDoctors, getIndividualDoctor } from '../../actions/departmentDoctors';
import '../Nurses/Nurses.css';

// import doctor1 from '../../static/doctor1.jpg';

class Doctors extends Component {
	constructor(props) {
		super(props);
    const { user, match, _getDepartmentDoctors, _getIndividualDoctor } = props;
    const { departmentId, doctorId } = match.params;

    _getDepartmentDoctors(user.accessToken, departmentId)
    doctorId && _getIndividualDoctor(user.accessToken, doctorId);

		this.state = {
      selected: doctorId && parseInt(doctorId, 10)
		}
	}

  componentDidUpdate(prevProps) {
    const { match } = prevProps;
    const { user, history, departDoctors, _getIndividualDoctor } = this.props;
    const { params } = this.props.match;

    if(!prevProps.departDoctors.length && departDoctors.length && !params.doctorId) {
      history.push(`/departments/${params.departmentId}/doctors/${departDoctors[0].id}`);
      _getIndividualDoctor(user.accessToken, departDoctors[0].id);
      this.setState({ selected: departDoctors[0].id })
    }
    if (match.params.doctorId !== params.doctorId) {
      _getIndividualDoctor(user.accessToken, params.doctorId);
      this.setState({ selected: parseInt(params.doctorId, 10) })
    }
  }

	goBack = () => {
    const { history } = this.props;

    history.push(`/home`);
  }

  selectItem(id) {
    const { user, match } = this.props;
    const { departmentId } = match.params;

    this.setState({ selected: id });
    this.props.history.push(`/departments/${departmentId}/doctors/${id}`);
    this.props._getIndividualDoctor(user.accessToken, id);
  }

  _getLeftSideListHeader = (item) =>  {
    return (
      <Header as='h4' color='blue'>{item.DoctorName}</Header>
    );
  }

  getPersonalInfo(info) {
    return (
      <div className='personal-info'>
        <div><Icon name='phone' /> {info.phoneNumber}</div>
        <div><Icon name='at' /> {info.email}</div>
        <div><Icon name='point' /> str. {info.streetName} {info.apartmentNumber}, {info.city}</div>
        <div><Icon name='birthday cake' /> {info.DOB}</div>
      </div>
    );
  }

  getHospitalInfo(info, countNurses, countPatients) {
    return (
      <div className='personal-info'>
        <div><Icon name='building' />Department: {info.department_name}</div>
        <div><Icon name='hashtag' />Room: {info.roomNumber}</div>
        <div><Icon name='tag' />Occupation: Doctor</div>
        <div><Icon name='bed' />Patients: {countPatients}</div>
        <div><Icon name='male' />Nurses: {countNurses}</div>
      </div>
    );
  }

  getContent() {
    const { selected } = this.state;
    const { singleDoctor } = this.props;
    // <Image src={doctor1} size='small' />

    return (selected && Object.keys(singleDoctor).length) ? (
    	<div className='single-person-content'>
        <div>
          <div>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' />
            <Header as='h2'>{singleDoctor.Personalnfo[0].firstName} {singleDoctor.Personalnfo[0].lastName} {singleDoctor.Personalnfo[0].middleName}</Header>
          </div>
        </div>
        <Divider />
        <Header as='h3'>
          <Icon name='user circle' />
          Personal Info
        </Header>
        {this.getPersonalInfo(singleDoctor.Personalnfo[0])}
        <Header as='h3'>
          <Icon name='hospital outline' />
          Hospital Info
        </Header>
        {this.getHospitalInfo(singleDoctor.Personalnfo[0], singleDoctor.NumberOfNurses, singleDoctor.NumberOfPatients)}
    	</div>
    ) : null;
  }

  getView() {
    const { selected } = this.state;
    const { departDoctors, departDoctorsLoading, singleDoctorLoading } = this.props;

    return departDoctors.length ? (
      <div className='component'>
        <LeftSideList
          list={departDoctors}
          selected={selected}
          loading={departDoctorsLoading}
          header={(item) => this._getLeftSideListHeader(item)}
          selectItem={(id) => this.selectItem(id)}
          backButtonName='Back to Home'
          backButtonClick={() => this.goBack()}
          backButtonStyle={{ marginBottom: 0, marginTop: 12}}
          containerStyle={{ width: 350 }}
        />
        {(!singleDoctorLoading && this.getContent()) || <Loader />}
      </div>
    ) : <div style={{margin: 'auto'}}>No doctors in this department.</div>;
  }

  render () {
    const { departDoctorsLoading } = this.props;

    return departDoctorsLoading ? <Loader /> : this.getView();
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  departDoctors: state.departmentDoctors.departDoctors,
  departDoctorsLoading: state.departmentDoctors.departDoctorsLoading,
  singleDoctorLoading: state.departmentDoctors.singleDoctorLoading,
  singleDoctor: state.departmentDoctors.singleDoctor,
});

function mapDispatchToProps(dispatch) {
  return {
    _getDepartmentDoctors: (token, name) => dispatch(getDepartmentDoctors(token, name)),
    _getIndividualDoctor: (token, id) => dispatch(getIndividualDoctor(token, id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Doctors);
