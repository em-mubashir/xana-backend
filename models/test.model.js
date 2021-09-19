const testModel = {
  addNew: (testObj, userId) =>
    new Promise(async (resolve, reject) => {
      console.log("testObj ::>>", testObj);
      console.log("userId ::>>", userId);
      con.query(
        `INSERT INTO xana.test_info 
        (testName, userId, manufacturer, description, performance, authorization) 
        VALUES 
        ('${testObj.testName}', ${testObj.userId}, '${testObj.manufacturer}','${testObj.description}', '${testObj.performance}', '${testObj.authorization}'`,
        (err, res) => {
          if (res) {
            if (res.affectedRows > 0) {
              return resolve(res);
            }
          } else {
            console.log("err", err);
            return reject(new Error("Something went wrong", err));
          }
        }
      );
    }),
};

module.exports = testModel;
