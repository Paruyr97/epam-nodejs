import { faker } from '@faker-js/faker';
import _ from 'lodash';

const users = Array.from({ length: 10 }, () => ({
    name: faker.person.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.imei(),
}));

console.log('users', users);

const sortedUsers = _.orderBy(users, [user => user.name.toLowerCase()], ['asc']);

console.log('sorted users', sortedUsers);
