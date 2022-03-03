const { faker } = require('@faker-js/faker')

const userFake = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
}

module.exports = userFake