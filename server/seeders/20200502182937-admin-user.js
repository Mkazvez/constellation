module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          active: true,
          email: 'admin@email.com',
          password:
            '$2b$12$VTF841Gzitl2iE2mje5gyeNmCY5gBq4HQ44q4WKNROZWg9YvXghRG',
          confirmEmail: true,
          role: 'admin',
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
