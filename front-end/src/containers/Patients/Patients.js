import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LeftSideList, Loader } from 'evermut';
import { Header, Image, Divider, Button, Icon, Modal } from 'semantic-ui-react';
import { getMyPatients, getIndividualPatient } from '../../actions/myPatients';
import '../Nurses/Nurses.css';
import './Patients.css';

class Patients extends Component {
	constructor(props) {
		super(props);

    const { user, match, _getMyPatients, _getIndividualPatient } = props;
    const { patientId } = match.params;

    _getMyPatients(user.accessToken)
    patientId && _getIndividualPatient(user.accessToken, patientId);

		this.state = {
      selected: (patientId && parseInt(patientId, 10)) || '',
      openDelete: false
		}
	}

  componentDidUpdate(prevProps) {
    const { match } = prevProps;
    const { user, history, myPatients, _getIndividualPatient } = this.props;
    const { params } = this.props.match;

    if(myPatients.length && !params.patientId) {
      history.push(`/my/patients/${myPatients[0].id}`);
      _getIndividualPatient(user.accessToken, myPatients[0].id);
      this.setState({ selected: myPatients[0].id })
    }
    if (match.params.patientId !== params.patientId) {
      _getIndividualPatient(user.accessToken, params.patientId);
      this.setState({ selected: parseInt(params.patientId, 10) })
    }
  }

	goBack = () => {
    const { history } = this.props;

    history.push(`/home`);
  }

  selectItem(id) {
    const { user } = this.props;

    this.setState({ selected: id });
    this.props.history.push(`/my/patients/${id}`);
    this.props._getIndividualPatient(user.accessToken, id);
  }

  _getLeftSideListHeader = (item) =>  {
    return (
      <Header as='h4' color='blue'>{item.firstName} {item.lastName}</Header>
    );
  }

  getPeronalInfo(info) {
    const { phoneNumber, email, streetName, apartmentNumber, city, DOB } = info;

    return (
      <div className='personal-info'>
        <div><Icon name='phone' /> {phoneNumber}</div>
        <div><Icon name='at' /> {email}</div>
        <div><Icon name='point' /> str. {streetName} {apartmentNumber}, {city}</div>
        <div><Icon name='birthday cake' /> {DOB}</div>
      </div>
    );
  }

  getTreatmentsInfo(treatments, numberOfDoctors) {
    return (
      <div className='personal-info'>
        <div style={{ marginBottom: '15px'}}>Getting treatments from {numberOfDoctors} doctors.</div>
        {treatments.map((item, index) => {
          const { start_date, note, DoctorName } = item;

          return (
            <div className='treatments' key={`patient-treat-${index}`}>
              <div>
                <span style={{ marginRight: '30px'}}><Icon name='calendar alternate' /> {start_date}</span>
                <span><Icon name='doctor' /> {DoctorName}</span>
              </div>
              <div>{note || "Note"}</div>
            </div>
          );
        }) || null}
      </div>
    );
  }

  handleDeleteModal() {
    const { openDelete } = this.state;

    this.setState({ openDelete: !openDelete });
  }

  _delete() {
    console.log('delete patient')
  }

  getDeleteModal() {
    const { openDelete } = this.state;
    return (
      <Modal open={openDelete} size='tiny' onClose={() => this.handleDeleteModal()}>
        <Modal.Header>Delete the patient. </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div>Are you sure you want to remove this patient from your list?</div>
            <Button
              color='red'
              onClick={() => this._delete()}
            >Delete</Button>
            <Button onClick={() => this.handleDeleteModal()}>Cancel</Button>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }

  getContent() {
    const { selected } = this.state;
    const { singlePatient } = this.props;

    return (selected && Object.keys(singlePatient).length) ? (
    	<div className='single-person-content'>
        <div>
          <div>
            <Image src={singlePatient.patientsPersonalInfo[0].picture} size='small' />
            <Header as='h2'>{singlePatient.patientsPersonalInfo[0].firstName} {singlePatient.patientsPersonalInfo[0].lastName}</Header>
          </div>
          <Button basic color='red' content='Delete' onClick={() => this.handleDeleteModal()}/>
        </div>
        {this.getDeleteModal()}
        <Divider />
        <Header as='h3'>
          <Icon name='user circle' />
          Personal Info
        </Header>
        {this.getPeronalInfo(singlePatient.patientsPersonalInfo[0])}
        <Header as='h3'>
          <Icon name='treatment' />
          Treatments
        </Header>
        {this.getTreatmentsInfo(singlePatient.doctorsAndTreatmentsOfPatient, singlePatient.numOfPatientsDoctors)}
    	</div>
    ) : null;
  }

  getView() {
    const { selected } = this.state;
    const { myPatients, myPatientsLoading, singlePatientLoading } = this.props;

    return myPatients.length ? (
      <div className='component'>
        <LeftSideList
          list={myPatients}
          selected={selected}
          loading={myPatientsLoading}
          header={(item) => this._getLeftSideListHeader(item)}
          selectItem={(id) => this.selectItem(id)}
          backButtonName='Back to Home'
          backButtonClick={() => this.goBack()}
          backButtonStyle={{ marginBottom: 0, marginTop: 12}}
          containerStyle={{ width: 350 }}
        />
        {(!singlePatientLoading && this.getContent()) || <Loader />}
      </div>
    ) : <div style={{margin: 'auto'}}>No nurses under my responsibility.</div>;
  }

  render () {
    const { myPatientsLoading } = this.props;

    return myPatientsLoading ? <Loader /> : this.getView();
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  myPatients: state.myPatients.myPatients,
  myPatientsLoading: state.myPatients.myPatientsLoading,
  singlePatientLoading: state.myPatients.singlePatientLoading,
  singlePatient: state.myPatients.singlePatient,
});

function mapDispatchToProps(dispatch) {
  return {
    _getMyPatients: token => dispatch(getMyPatients(token)),
    _getIndividualPatient: (token, id) => dispatch(getIndividualPatient(token, id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Patients);
