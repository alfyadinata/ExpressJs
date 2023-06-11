const yup = require('yup');
const model = require('../models/index');
const user = model.User;
const resp = require('../utils/httpResponse');
const bcrypt = require('bcryptjs');
const { default: paginator } = require('../utils/paginator');

const storeSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  customerId: yup.string().optional(),
  datePurchase: yup.date().optional(),
  password: yup.string().required(),
});

const updateSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  customerId: yup.string(),
  datePurchase: yup.date(),
  password: yup.string(),
}).defined();

module.exports = {
  async getAllUsers(req, res) {
    try {
      const { page = 1, perPage = 10 } = req.query;
      const offset = (page - 1) * perPage;

      const { count, rows } = await user.findAndCountAll({
        limit: perPage || 10,
        offset,
      });

      const totalPages = Math.ceil(count / perPage);

      return resp.success(res, {
        users: rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalUsers: count,
        },
      });
    } catch (error) {
      return resp.error(res, error);
    }
  },

  async store(req, res) {
    try {
      const { email, name, customerId, datePurchase, password } = await storeSchema.validate(req.body);

      const hashedPassword = await bcrypt.hash(password, 10);

      const data = await user.create({
        email,
        name,
        customerId,
        datePurchase,
        password: hashedPassword,
      });

      return resp.success(res, data);
    } catch (error) {
      return resp.error(res, error);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const data = await user.findByPk(id);

      if (!data) {
        return resp.error(res, 'User not found');
      }

      return resp.success(res, data);
    } catch (error) {
      return resp.error(res, error);
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { email, name, customerId, datePurchase, password } = await updateSchema.validate(req.body, {
        abortEarly: false,
      });

      let data = await user.findByPk(id);

      if (!data) {
        return resp.error(res, 'User not found');
      }

      const hashedPassword = password ? await bcrypt.hash(password, 10) : data.password;

      await data.update({
        email,
        name,
        customerId,
        datePurchase,
        password: hashedPassword,
      });

      return resp.success(res, data);
    } catch (error) {
      return resp.error(res, error);
    }
  },
};
