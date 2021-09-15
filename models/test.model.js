const testModel = {
  addNew: (testObj, userId) =>
    new Promise(async (resolve, reject) => {
      console.log("testObj ::>>", testObj);
      console.log("userId ::>>", userId);
      con.query(
        `INSERT INTO xana.test_info 
        (testName, userId, firstName, lastName, dob, passportNo, testName, testManufacturer, testDescription, testPerformance, testAuthorization, sampleDate, resultDate, result) 
        VALUES 
        (1, ${data.userId}, '${data.firstName}','${data.lastName}', STR_TO_DATE('${data.dob}','%d-%m-%Y'), '${data.passportNo}', '${data.testName}', '${data.testManufacturer}', '${data.testDescription}', '${data.testPerformance}', '${data.testAuthorization}', STR_TO_DATE('${data.sampleDate}','%d-%m-%Y'), STR_TO_DATE('${data.resultDate}','%d-%m-%Y'), '${data.result}' ) `,
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
