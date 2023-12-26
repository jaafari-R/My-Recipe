const { faker } = require('@faker-js/faker');

class RandomGenerator {
    static generateRandomName() {
        return faker.person.fullName();
    }

    static generateRandomNumber(upperRange) {
        return Math.floor(Math.random() * upperRange);
    }
}

module.exports = RandomGenerator;