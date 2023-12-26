const { faker } = require('@faker-js/faker');

class RandomGenerator {
    generateRandomName() {
        return faker.person.fullName();
    }

    generateRandomNumber(upperRange) {
        return Math.floor(Math.random() * upperRange);
    }
}

module.exports = new RandomGenerator();