const Car = require('../schemas/cars');

module.exports = {
    getCars: () => {
        return Car.find({}).exec();
    },

    addCar: (car) => {
        if(!car) throw new Error('no car data to save');

        const dbCar = new Car(car);

        return dbCar.save();
    },

    findCar: (id) => {
        if(id) return Car.findById(id).exec();

        throw new Error('no id provided');
    }
}