mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }); // connects this app to the MongoDB Atlas database

const personSchema = new mongoose.Schema({ // schemas are like the class definition
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema); // models are like the class?

const createAndSavePerson = (done) => {
  let object = { name: "John Doe", age: 30, favoriteFoods: ["Sushi", "Ramen"] };
  let person = new Person(object); // a document instance using the Person model constructor?
  person.save((error, data) => { // for a single document/object?
    if (error) {
      return console.error(error); // on error
    }
    done(null, data);
  });
};

arrayOfPeople = [{ name: "Naruto Uzumaki", age: 12, favoriteFoods: ["ramen"] }, { name: "Tobi", age: 31, favoriteFoods: ["dango"] }];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, data) => { // for multiple documents/objects?
    if (error) {
      return console.error(error); // on error
    }
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (error, data) => {
    if (error) {
      return console.error(error); // on error
    }
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (error, data) => {
    if (error) {
      return console.error(error);
    }
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (error, data) => {
    if (error) {
      return console.error(error);
    }
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, (error, person) => {
    if (error) {
      return console.error(error);
    }
    person.favoriteFoods.push(foodToAdd);
    person.save((error, updatedPerson) => {
      if (error) {
        return console.error(error);
      }
      done(null, updatedPerson);
    })
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName },
    { age: ageToSet },
    { new: true },
    (error, updatedPerson) => {
      if (error) {
        return console.error(error);
      }
      done(null, updatedPerson);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, person) => {
    if (error) {
      return console.error(error);
    }
    done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (error, person) => {
    if (error) {
      return console.error(error);
    }
    done(null, person);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((error, data) => {
      if (error) {
        return console.error(error);
      }
      done(null, data);
    });
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
