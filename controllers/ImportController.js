const fs = require('fs');
const csv = require('fast-csv');
const model = require('../models/index');
const user = model.User;

module.exports = {
  async importData(req, res) {
    try {
      if (req.file === undefined) {
        return res.status(400).send("Please upload a CSV file!");
      }

      const users = [];
      const path = "./uploads/" + req.file.filename;

      fs.createReadStream(path)
        .pipe(csv.parse({ headers: true }))
        .on("error", (error) => {
          throw error.message;
        })
        .on("data", (row) => {
            const { Id, CustomerName, DatePurchase} = row
            const generateRandomShorthand = () => Math.random().toString(36).substr(2, 10);
            const mail = generateRandomShorthand()
            users.push({
                name: CustomerName,
                email: `${mail}-abc@mail.com`,
                password: Id,
                datePurchase: DatePurchase,
                customerId: Id,
            });
        })
        .on("end", () => {
            console.log("users",users)
          user.bulkCreate(users)
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
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Failed to upload the file: " + req.file.originalname,
      });
    }
  },
};
