
class DoctorNotFound extends Error {
    constructor() {
        super('You are not a doctor');
    }
}

class UserAlreadyExists extends Error {
    constructor() {
        super(`User with this email already exists!`);
    }
}

class EmailIsIncorrect extends Error{
    constructor() {
        super('User with this email was not found');
    }
}

class PasswordIncorrect extends Error {
    constructor() {
        super('Password is incorrect!');
    }
}

class IncorrectNurse extends Error {
    constructor() {
        super('Selected person already was your nurse!');
    }
}

class TreatmentIsEmpty extends Error {
    constructor() {
        super('Treatment-note is empty');
    }
}

class RepeatedTreatment extends Error {
    constructor() {
        super('You have already assigned to this patient a treatment on the specified data');
    }
}

module.exports = {
    DoctorNotFound,
     UserAlreadyExists,
     EmailIsIncorrect, 
     PasswordIncorrect,
     IncorrectNurse,
     RepeatedTreatment,
     TreatmentIsEmpty}