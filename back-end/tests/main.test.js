const PATH = process.cwd();
const doctServices=require(`${PATH}/services/doctors.js`)

const chai=require('chai');
const expect=chai.expect;
const chaiaspromised = require('chai-as-promised');
chai.use(chaiaspromised);
chai.should();

describe('TESTING SOME FUNCTONALITIES', function(){
    this.timeout(8000);

    it("Given doctor's ID it calculates number of nurses of doctor successfully:", function() {
        return doctServices.numOfNursesOfDoctor(1).should.eventually.equal(2);
    })
    
	it("Given doctor's ID it calculates number of nurses of doctor successfully:Same patient has many treatments with same doctor", function() {
        return doctServices.numOfPatientsOfDoctor(1).should.eventually.equal(3);
    })

    it("Given doctor's ID and nurse's ID it recognizes that doctor already has specified nurse and does't add him/her:", function() {
    return doctServices.addNurse(1,1).should.be.rejectedWith('Selected person already was your nurse!');
    })
    
  
})