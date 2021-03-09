module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          active: true,
          email: 'linkservicee@gmail.com',
          password:
            '$2b$12$AO3fjtBYug4hAsQSzp0UxO3Fk6uoKgJ68L4Qmzh1vQF5HSgOiM7tm',
          confirmEmail: true,
          role: 'user',
          firstName: 'Ушаков',
          patronymicName: 'Андрей',
          lastName: 'Александрович',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
