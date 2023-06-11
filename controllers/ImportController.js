const fs = require('fs');
const csv = require('fast-csv');
const model = require('../models/index');
const User = model.User;

const generateRandomShorthand = () => Math.random().toString(36).substr(2, 10);

const insertUsers = async (users) => {
  try {
    await User.bulkCreate(users);
    console.log(`Inserted ${users.length} users`);
  } catch (error) {
    throw new Error(`Failed to insert users: ${error.message}`);
  }
};

module.exports = {
  async importData(req, res) {
    try {
      if (req.file === undefined) {
        return res.status(400).send("Please upload a CSV file!");
      }

      const batchSize = 1000; // Set the desired batch size
      const users = [];
      const path = "./uploads/" + req.file.filename;

      fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
          throw error.message;
        })
        .on("data", (row) => {
          const { Id, CustomerName, DatePurchase } = row;
          const mail = generateRandomShorthand();
          users.push({
            name: CustomerName,
            email: `${mail}-abc@mail.com`,
            password: Id,
            datePurchase: DatePurchase,
            customerId: Id,
          });

          if (users.length >= batchSize) {
            const batch = users.splice(0, batchSize);
            insertUsers(batch)
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .on("end", () => {
          if (users.length > 0) {
            insertUsers(users)
              .then(() => {
                res.status(200).send({
                  message:
                    "The file: " +
                    req.file.originalname +
                    " was uploaded successfully!",
                });
              })
              .catch((error) => {
                res.status(500).send({
                  message: "Couldn't import data into the database!",
                  error: error.message,
                });
              });
          } else {
            res.status(200).send({
              message:
                "The file: " +
                req.file.originalname +
                " was uploaded successfully!",
            });
          }
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Failed to upload the file: " + req.file.originalname,
      });
    }
  },
};
