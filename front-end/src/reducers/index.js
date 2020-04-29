import { combineReducers } from 'redux';
import auth from './auth';
import homeInfo from './homeInfo';
import departmentDoctors from './departmentDoctors';
import departmentNurses from './departmentNurses';
import myNurses from './myNurses';
import myPatients from './myPatients';

export default combineReducers({
	auth,
	homeInfo,
	departmentDoctors,
	departmentNurses,
	myNurses,
	myPatients
});
