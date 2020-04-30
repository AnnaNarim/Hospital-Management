import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LeftSideList, Loader } from 'evermut';
import { Header, Image, Divider, Icon, Table, Modal, Button } from 'semantic-ui-react';
import { getMyNurses, getIndividualNurse } from '../../actions/myNurses';
import '../Nurses/Nurses.css';

class DepartmentNurses extends Component {
  constructor(props) {
    super(props);

    const { user, match, _getMyNurses, _getIndividualNurse } = props;
    const { nurseId } = match.params;

    _getMyNurses(user.accessToken)
    nurseId && _getIndividualNurse(user.accessToken, nurseId);

    this.state = {
      selected: (nurseId && parseInt(nurseId, 10)) || '',
      openDelete: false
    }
  }

  componentDidUpdate(prevProps) {
    const { match } = prevProps;
    const { user, history, myNurses, _getIndividualNurse } = this.props;
    const { params } = this.props.match;

    if(myNurses.length && !params.nurseId) {
      history.push(`/my/nurses/${myNurses[0].id}`);
      _getIndividualNurse(user.accessToken, myNurses[0].id);
      this.setState({ selected: myNurses[0].id })
    }
    if (match.params.nurseId !== params.nurseId) {
      _getIndividualNurse(user.accessToken, params.nurseId);
      this.setState({ selected: parseInt(params.nurseId, 10) })
    }
  }

  goBack = () => {
    const { history } = this.props;

    history.push(`/home`);
  }

  selectItem(id) {
    const { user } = this.props;

    this.setState({ selected: id });
    this.props.history.push(`/my/nurses/${id}`);
    this.props._getIndividualNurse(user.accessToken, id);
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

  _getLeftSideListHeader = (item) =>  {
    return (
      <Header as='h4' color='blue'>{item.firstName} {item.lastName}</Header>
    );
  }

  getPersonalInfo(info) {
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

  getHospitalInfo(info) {
    return (
      <div className='personal-info'>
        <Table celled style={{ width: '600px'}}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Department</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {info && info.map((item, key) => (
              <Table.Row key={`doctors-working-with-${key}`}>
                <Table.Cell>{item.DoctorName}</Table.Cell>
                <Table.Cell>{item.department_name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }

  getContent() {
    const { selected } = this.state;
    const { singleNurse } = this.props;

    return (selected && Object.keys(singleNurse).length) ? (
      <div className='single-person-content'>
        <div>
          <div>
            <Image src={singleNurse.nursesPersonalInfo[0].picture} size='small' />
            <Header as='h2'>{singleNurse.nursesPersonalInfo[0].firstName} {singleNurse.nursesPersonalInfo[0].lastName} {singleNurse.nursesPersonalInfo[0].middleName}</Header>
          </div>
          <Button basic color='red' content='Delete' onClick={() => this.handleDeleteModal()}/>
        </div>
        {this.getDeleteModal()}
        <Divider />
        <Header as='h3'>
          <Icon name='user circle' />
          Personal Info
        </Header>
        {this.getPersonalInfo(singleNurse.nursesPersonalInfo[0])}
        <Header as='h3'>
          <Icon name='hospital outline' />
          Doctors working with
        </Header>
        {this.getHospitalInfo(singleNurse.WorkingWithDoctors)}
      </div>
    ) : null;
  }

  getView() {
    const { selected } = this.state;
    const { myNurses, myNursesLoading, singleNurseLoading } = this.props;

    return myNurses.length ? (
      <div className='component'>
        <LeftSideList
          list={myNurses}
          selected={selected}
          loading={myNursesLoading}
          header={(item) => this._getLeftSideListHeader(item)}
          selectItem={(id) => this.selectItem(id)}
          backButtonName='Back to Home'
          backButtonClick={() => this.goBack()}
          backButtonStyle={{ marginBottom: 0, marginTop: 12}}
          containerStyle={{ width: 350 }}
        />
        {(!singleNurseLoading && this.getContent()) || <Loader />}
      </div>
    ) : <div style={{margin: 'auto'}}>No nurses under my responsibility.</div>;
  }

  render () {
    const { myNursesLoading } = this.props;

    return myNursesLoading ? <Loader /> : this.getView();
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  myNurses: state.myNurses.myNurses,
  myNursesLoading: state.myNurses.myNursesLoading,
  singleNurseLoading: state.myNurses.singleNurseLoading,
  singleNurse: state.myNurses.singleNurse,
});

function mapDispatchToProps(dispatch) {
  return {
    _getMyNurses: token => dispatch(getMyNurses(token)),
    _getIndividualNurse: (token, id) => dispatch(getIndividualNurse(token, id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentNurses);
