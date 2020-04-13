import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LeftSideList } from 'evermut';
import { Header } from 'semantic-ui-react';

class Nurses extends Component {
	constructor() {
		super();

		this.state = {
			list: [
        {id: 1, name: "Tom Smith"},
        {id: 2, name: "Sam Woo"},
      ],
      selected: ''
		}
	}

	goBack = () => {
    const { history } = this.props;

    history.push(`/home`);
  }

  selectItem(id) {
    this.setState({ selected: id });
  }

  _getLeftSideListHeader = (item) =>  {
    return (
      <Header as='h4' color='blue'>{item.name}</Header>
    );
  }

  getContent() {

    return (
    	<div>
    	</div>
    );
  }
  render () {
  	const { list, loading, selected } = this.state;

    return (
      <div className='nurses'>
      	<LeftSideList
          list={list}
          selected={selected}
          loading={loading}
          header={(item) => this._getLeftSideListHeader(item)}
          selectItem={(id) => this.selectItem(id)}
          backButtonName='Back to Home'
          backButtonClick={() => this.goBack()}
          backButtonStyle={{ marginBottom: 0, marginTop: 12}}
        />
        {this.getContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
});

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nurses);
