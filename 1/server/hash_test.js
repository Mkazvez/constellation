const bcrypt = require('bcrypt')
// const uuid = require('uuid').v4()
// const { User, CheckKey } = require('../models')
// const sendEmail = require('../services/send-email')

var salt = bcrypt.genSaltSync(10);

const hashPassword = bcrypt.hashSync('viewsonic', 12);
console.log(hashPassword)

if (bcrypt.hashSync('viewsonic', 12) === hashPassword) {
    console.log('Получилось')
  }

  const match = bcrypt.compareSync('viewsonic', hashPassword)
  if (!match) {console.log('Получилось3')}
  console.log(match)
  //return res.status(401).json({ message: 'Error auth' })
//var bcrypt = require('bcrypt');
 
// // пароль пользователя
// var passwordFromUser = "test_user_pass";
 
// // создаем соль
// var salt = bcrypt.genSaltSync(10);
 
// // шифруем пароль
// var passwordToSave = bcrypt.hashSync(passwordFromUser, salt)
 
// // выводим результат
// console.log(salt);
// console.log(passwordFromUser);
// console.log(passwordToSave);

// if ('$2b$10$5l1.z4JY8TPVHYNlI/maleSQpyj.dU9TZJN8dfvbZ.HUYorQqiwRS' === passwordToSave) {
//     console.log('Получилось2')
//   } 
