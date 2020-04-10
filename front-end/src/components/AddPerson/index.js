import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Header, Button, Input, Dropdown } from 'semantic-ui-react';
import { styleOptions } from '../../styleOptions';
import './AddPerson.css';

class LogIn extends Component {
  constructor() {
    super();

    this.state = {
      departments: [
        {id: 1, name: "Cardiology", doctors: 12, nurses: 4, patients: 30},
        {id: 2, name: "Neurology", doctors: 10, nurses: 5, patients: 35},
        {id: 3, name: "Oncology", doctors: 6, nurses: 2, patients: 20},
        {id: 3, name: "Rheumatology", doctors: 3, nurses: 1, patients: 15}
      ],
      nurses: [
        {id: 1, name: "Anna Smith"},
        {id: 2, name: "Vivian John"},
        {id: 3, name: "Sam Pitt"},
      ],
      valueDepart: '',
      valueNurse: ''
    }
  }
  clicked() {
    const { clicked } = this.props;

    if(clicked) clicked();
  }

  handleChange(e, item, where) {
    console.log('handleChange', item.value)
    // call department's nurses by providing department id - item.value

    this.setState({ [where]: item.value})
  }

  _add() {
    // call add function from actions to which I will give you depart, nurse id and after it nurses of my info wil ++
    this.clicked()
  }

  content(type) {
    const { departments, nurses, valueDepart, valueNurse } = this.state;
    const { nursesLoading, addLoading } = this.props;

    switch(type) {
      case 'nurse':
        const onlyDepNames = departments.map(item => {
          return   {
            key: item.name,
            text: item.name,
            value: item.id
          }
        });

        const onlyNursesNames = nurses.map(item => {
          return   {
            key: item.name,
            text: item.name,
            value: item.id
          }
        });

        console.log('value', valueDepart, valueNurse)
        return (
          <Modal.Description>
            <p> Choose the department to where the {type} belongs.</p>
            <Dropdown
              placeholder='Select Department'
              fluid
              selection
              options={onlyDepNames}
              onChange={(e, item) => this.handleChange(e, item, 'valueDepart')}
              value={valueDepart}
            />
            <p> Select the {type}.</p>
            <Dropdown
              placeholder={`Select ${type}`}
              fluid
              search
              selection
              options={onlyNursesNames}
              loading={nursesLoading}
              value={valueNurse}
              disabled={!valueDepart}
              onChange={(e, item) => this.handleChange(e, item, 'valueNurse')}
            />
            <Button
              primary
              onClick={() => this._add()}
              disabled={!(valueNurse && valueDepart)}
              loading={addLoading}
            >Add</Button>
            <Button onClick={() => this.clicked()}>Cancel</Button>
          </Modal.Description>
        );

      default:
        return null;
    }
  }

  render () {
    const { type, isOpen, clicked } = this.props;

    return (
      <Modal open={isOpen} onClose={() => this.clicked()}>
        <Modal.Header>Add a {type} </Modal.Header>
        <Modal.Content>
          {this.content(type)}
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  // nursesLoading - when choosing department to get all the nurses that belongs there
  // addLoading - when adding new member either nurse or student
});

function mapDispatchToProps(dispatch) {
  return {
    // _login: data => dispatch(login(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
