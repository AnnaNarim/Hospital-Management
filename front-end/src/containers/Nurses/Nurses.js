import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LeftSideList } from 'evermut';
import { Header, Image, Divider, Button, Icon, Modal } from 'semantic-ui-react';
import './Nurses.css';

import nursePic from '../../static/nurse1.jpg';

class Nurses extends Component {
	constructor() {
		super();

		this.state = {
			list: [
        {id: 1, name: "Jade Woods"},
        {id: 2, name: "Sam Woo"},
      ],
      singlePerson: {
        id: 1,
        name: "Jade Woods",
        img: nursePic,
        phone: '+12312312',
        email: 'jade.woods@gmail.com',
        department: 'Cardiology',
        patients: 12,
        tasks: 3,
      },
      selected: 1, // id of a nurse that is selected
      openDelete: false,
		}
	}

  componentDidMount() {
    const { nurseId } = this.props.match.params;

    // nurseId && this._getNurse(nurseId);
    // if (!this.props.nurses.length && !this.props.nursesLoading) {
    //   this.props._getMyNurses();
    // }

    if(!nurseId) {
      this.props.history.push(`/my/nurse/${1}`);
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
    this.setState({ selected: id });
    this.props.history.push(`/my/nurse/${id}`);
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
        <div><Icon name='tag' /> Nurse</div>
        <div><Icon name='bed' /> {patients}</div>
        <div><Icon name='tasks' /> {tasks}</div>
      </div>
    );
  }

  handleDeleteModal() {
    const { openDelete } = this.state;

    this.setState({ openDelete: !openDelete });
  }

  _delete() {
    // 
    console.log('delete nurse')
  }

  getDeleteModal() {
    const { openDelete } = this.state;
    return (
      <Modal open={openDelete} size='tiny' onClose={() => this.handleDeleteModal()}>
        <Modal.Header>Delete the nurse. </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div>Are you sure you want to remove this nurse from your list?</div>
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
    const { singlePerson, selected } = this.state;

    return (selected && singlePerson) ? (
    	<div className='single-person-content'>
        <div>
          <div>
      		  <Image src={singlePerson.img} size='small' />
            <Header as='h2'>{singlePerson.name}</Header>
          </div>
          <Button basic color='red' content='Delete' onClick={() => this.handleDeleteModal()} />
        </div>
        {this.getDeleteModal()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Nurses);
