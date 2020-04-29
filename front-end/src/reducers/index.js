import { combineReducers } from 'redux';
import auth from './auth';
import homeInfo from './homeInfo';
import departmentDoctors from './departmentDoctors';
import departmentNurses from './departmentNurses';

export default combineReducers({
	auth,
	homeInfo,
	departmentDoctors,
	departmentNurses
});
