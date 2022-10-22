require('dotenv').config();

mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}); // connects this app to the MongoDB Atlas database

const personSchema = new mongoose.Schema({ // schemas are like the class definition
    name: {type: String, required: true},
    age: Number,
    favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema); // models are like the class?

const createAndSavePerson = (done) => {
    let object = {name: "John Doe", age: 30, favoriteFoods: ["Sushi", "Ramen"]};
    let person = new Person(object); // a document instance using the Person model constructor?
    person.save((error, data) => {
        if (error){
            return console.error(error);
        }

        else{
            done(null, data);
        }
    });
};

arrayOfPeople = [{name: "Naruto Uzumaki", age: "12", favoriteFoods: ["ramen"]}, {name: "Tobi", age: 31, favoriteFoods: ["dango"]}];

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (error, data) => {
        if (error){
            return console.error(error);
        }

        else{
            done(null, data);
        }
    });
};

const findPeopleByName = (personName, done) => {
    done(null /*, data*/);
};

const findOneByFood = (food, done) => {
    done(null /*, data*/);
};

const findPersonById = (personId, done) => {
    done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";

    done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
    const ageToSet = 20;

    done(null /*, data*/);
};

const removeById = (personId, done) => {
    done(null /*, data*/);
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";

    done(null /*, data*/);
};

const queryChain = (done) => {
    const foodToSearch = "burrito";

    done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
