import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, Dropdown, TextArea, Form } from 'semantic-ui-react';
import { getNursesOfDepartments, addNurse, resetIndicatorsNurse } from '../../actions/myNurses'
import { getEmailsOfPatients, addPatient, resetIndicatorsPatient } from '../../actions/myPatients.js'
import './AddPerson.css';

const TIME_OUT = 1500;

class LogIn extends Component {
  constructor(props) {
    super(props);

    if(props.type === 'patient') {
      props._getEmailsOfPatients(props.user.accessToken)
    }

    this.state = {
      departments: props.departments,
      dateValidation: false,
      valueDepart: '',
      valueNurse: '',
      valuePatient: '',
      email: '',
      date: '',
      notes: '',
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.addLoading && !this.props.addLoading && !this.props.errorNurse) {
      setTimeout(() => this.cancel(), TIME_OUT);
    }
    if(prevProps.addPatientLoading && !this.props.addPatientLoading && !this.props.errorPatient) {
      setTimeout(() => this.cancel(), TIME_OUT);
    }
  }

  cancel() {
    const { type, cancel, _resetIndicatorsNurse, _resetIndicatorsPatient } = this.props;

    if(type === 'nurse') _resetIndicatorsNurse();
    if(type === 'patient') _resetIndicatorsPatient();
    if(cancel) cancel();
  }

  handleChange(e, item, where) {
    const { user } = this.props;

    this.setState({ [where]: item.value})
    if(where === 'valueDepart') {
      this.props._getNursesOfDepartments(user.accessToken, item.value)
    }
  }

  addNewNurse() {
    const { user } = this.props;
    const { valueNurse } = this.state;

    this.props._resetIndicatorsNurse()
    this.props._addNurse(user.accessToken, valueNurse)
  }

  addNewPatient() {
    const { user } = this.props;
    const { valuePatient, date, notes } = this.state;

    this.props._resetIndicatorsPatient()
    this.props._addPatient(user.accessToken, valuePatient, {startDate: date, treatment: notes })
  }

  getDepartmentsNames() {
    const { departments, valueDepart } = this.state;
    const onlyDepNames = departments.map(item => {
      return   {
        key: item.name,
        text: item.name,
        value: item.name
      }
    });

    return (
      <React.Fragment>
        <p> Choose the department to where the nurse belongs.</p>
        <Dropdown
          placeholder='Select Department'
          fluid
          selection
          options={onlyDepNames}
          onChange={(e, item) => this.handleChange(e, item, 'valueDepart')}
          value={valueDepart}
        />
      </React.Fragment>
    );
  }

  getNurseModal() {
    const { valueDepart, valueNurse } = this.state;
    const { nursesDepartmentLoading, addLoading, type, nursesEmails, errorNurse, messageNurse } = this.props;
    const onlyNursesNames = nursesEmails && nursesEmails.map(item => {
      return   {
        key: item.email,
        text: item.email,
        value: item.id
      }
    });

    return (
      <Modal.Description>
        {errorNurse && <div className='error'>{errorNurse}</div>}
        {messageNurse && <div className='message'>{messageNurse}</div>}
        {this.getDepartmentsNames()}
        <p> Select the {type}.</p>
        <Dropdown
          placeholder={`Select ${type}`}
          fluid
          search
          selection
          options={onlyNursesNames}
          loading={nursesDepartmentLoading}
          value={valueNurse}
          disabled={!valueDepart}
          onChange={(e, item) => this.handleChange(e, item, 'valueNurse')}
        />
        <Button
          primary
          onClick={() => this.addNewNurse()}
          disabled={!(valueNurse && valueDepart)}
          loading={addLoading}
        >Add</Button>
        <Button onClick={() => this.cancel()}>Cancel</Button>
      </Modal.Description>
    );
  }

  handleInputChange = (e, data) => {
    let dateValidation = false;
    if(data['name'] === 'date' && data.value !== '') {
      const pattern = /^\d{4}[-](0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01])+$/i;
      dateValidation = !pattern.test(data.value);
    }
    this.setState({ [data['name']]: data.value, dateValidation })
  }

  getPatientModal() {
    const { valuePatient, date, notes, dateValidation } = this.state;
    const { addPatientLoading, type, emailsPatients, getEmailsPatientsLoading, messagePatient, errorPatient } = this.props;
    const disabled = (!(valuePatient && notes && date) || dateValidation)

    const onlyPatientNames = emailsPatients && emailsPatients.map(item => {
      return   {
        key: item.email,
        text: item.email,
        value: item.id
      }
    });

    return (
      <Modal.Description>
        {messagePatient && <div className='message'>{messagePatient}</div>}
        {errorPatient && <div className='error'>{errorPatient}</div>}
        <p>Find by email</p>
        <Dropdown
          placeholder={`Select ${type}`}
          fluid
          search
          selection
          options={onlyPatientNames}
          loading={getEmailsPatientsLoading}
          value={valuePatient}
          disabled={!onlyPatientNames.length}
          onChange={(e, item) => this.handleChange(e, item, 'valuePatient')}
        />
        <p>Date</p>
        <Input
          fluid
          error={dateValidation}
          placeholder='2020-12-30...'
          name='date'
          value={date}
          onChange={(e, data) => this.handleInputChange(e, data)}
        />
        <p>Treatment</p>
        <Form>
          <TextArea
            placeholder='About treatment...'
            name='notes'
            value={notes}
            onChange={(e, data) => this.handleInputChange(e, data)}
          />
        </Form>
        <Button
          primary
          onClick={() => this.addNewPatient()}
          disabled={disabled}
          loading={addPatientLoading}
        >Add</Button>
        <Button onClick={() => this.cancel()}>Cancel</Button>
      </Modal.Description>
    );
  }

  content(type) {
    switch(type) {
      case 'nurse':
        return this.getNurseModal();

      case 'patient':
        return this.getPatientModal();

      default:
        return null;
    }
  }

  render () {
    const { type, isOpen } = this.props;

    return (
      <Modal open={isOpen} onClose={() => this.cancel()}>
        <Modal.Header>Add a {type} </Modal.Header>
        <Modal.Content>
          {this.content(type)}
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  nursesEmails: state.myNurses.nursesEmails,
  nursesDepartmentLoading: state.myNurses.nursesDepartmentLoading,
  addLoading: state.myNurses.addLoading,
  errorNurse: state.myNurses.errorAddNurse,
  messageNurse: state.myNurses.messageAdd,
  emailsPatients: state.myPatients.emailsPatients,
  getEmailsPatientsLoading: state.myPatients.getEmailsPatientsLoading,
  messagePatient: state.myPatients.message,
  addPatientLoading: state.myPatients.addPatientLoading,
  errorPatient: state.myPatients.error
});

function mapDispatchToProps(dispatch) {
  return {
    _getNursesOfDepartments: (token, name) => dispatch(getNursesOfDepartments(token, name)),
    _addNurse: (token, id) => dispatch(addNurse(token, id)),
    _addPatient: (token, id, data) => dispatch(addPatient(token, id, data)),
    _getEmailsOfPatients: token => dispatch(getEmailsOfPatients(token)),
    _resetIndicatorsNurse: () => dispatch(resetIndicatorsNurse()),
    _resetIndicatorsPatient: () => dispatch(resetIndicatorsPatient()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
