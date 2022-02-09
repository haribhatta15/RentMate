import React from 'react';
import * as SQLite from 'expo-sqlite';

let db = SQLite.openDatabase(
  'MainDB.db'
  // {
  //   name: 'MainDB.db',
  //   location: 'default',
  // },
  // () => {},
  // (error) => {
  //   console.log(error);
  // }
);

export const createTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS RegisterUser (firstName TEXT, lastName TEXT, userName VARCHAR, email VARCHAR, phone INTEGER, password VARCHAR, confirmPassword VARCHAR )',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
    return promise;
  });
};
export const insert = (
  firstName,
  lastName,
  userName,
  phone,
  email,
  password,
  confirmPassword
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO RegisterUser (firstName, lastName, userName , email, phone, password, confirmPassword) VALUES (?,?,?,?,?,?,?)',
        [
          firstName,
          lastName,
          userName,
          phone,
          email,
          password,
          confirmPassword,
        ],
        (_, result) => {
          resolve(result);
          console.log(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
    return promise;
  });
  //   (tx, results) => {
  //     console.log('Results', results.rowsAffected);
  //     if (results.rowsAffected > 0) {
  //       Alert.alert(
  //         'Success',
  //         'You are Registered Successfully',
  //         [
  //           {
  //             text: 'Ok',
  //             onPress: () => navigation.navigate('Home'),
  //           },
  //         ],
  //         { cancelable: false }
  //       );
  //     } else alert('Registration Failed');
  //   }
  //       );
  //     });
  //   });
};
export const seetable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM RegisterUser`,
        [],
        (_, result) => {
          resolve(result);
          console.log(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
    return promise;
  });
};

export const fetchdata = (userName, password) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT userName, password FROM RegisterUser WHERE userName="${userName}" AND password="${password}"`,
        [],
        (_, result) => {
          resolve(result);
          const len = result.rows.length;
          if (!len) {
            alert('This account does not exist');
          } else {
            const row = result.rows.item(0);
            if (password === row.password) {
            }
          }
          if (result.userName === result.password) {
            alert('successful');
          } else {
            alert('unsuccessful');
          }
          console.log(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
    return promise;
  });
};
