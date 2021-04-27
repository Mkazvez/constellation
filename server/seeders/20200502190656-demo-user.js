module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          active: true,
          email: 'demo@email.com',
          password:
            '$2b$12$Z3.sjyX9Q.8xt7r9AS1R8.G54HFFif46EaFXFvYFB5VewvGx0huvK',
          confirmEmail: true,
          role: 'user',
          firstName: 'Сергей',
          patronymicName: 'Петрович',
          lastName: 'Иванов',
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
}
