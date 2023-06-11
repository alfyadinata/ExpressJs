const model = require('../models/index');
const resp = require('../utils/httpResponse');
const UserController = require('./UserController');

jest.mock('../models/index');
jest.mock('../utils/httpResponse');

describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    test('should return all users with pagination', async () => {
      const mockFindAndCountAll = jest.fn().mockResolvedValueOnce({ count: 3, rows: ['user1', 'user2', 'user3'] });
      model.User.findAndCountAll = mockFindAndCountAll;

      const req = { query: { page: 1, perPage: 10 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await UserController.getAllUsers(req, res);

      expect(mockFindAndCountAll).toHaveBeenCalledWith({ limit: 10, offset: 0 });
      expect(resp.success).toHaveBeenCalledWith(res, { users: ['user1', 'user2', 'user3'], pagination: { currentPage: 1, totalPages: 1, totalUsers: 3 } });
    });

    test('should handle error and send error response', async () => {
      const mockFindAndCountAll = jest.fn().mockRejectedValueOnce('error');
      model.User.findAndCountAll = mockFindAndCountAll;

      const req = { query: { page: 1, perPage: 10 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await UserController.getAllUsers(req, res);

      expect(mockFindAndCountAll).toHaveBeenCalledWith({ limit: 10, offset: 0 });
      expect(resp.error).toHaveBeenCalledWith(res, 'error');
    });
  });

  describe('show', () => {
    test('should return the user with the given ID', async () => {
      const mockFindByPk = jest.fn().mockResolvedValueOnce('user');
      model.User.findByPk = mockFindByPk;

      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await UserController.show(req, res);

      expect(mockFindByPk).toHaveBeenCalledWith(1);
      expect(resp.success).toHaveBeenCalledWith(res, 'user');
    });

    test('should handle user not found and send not found response', async () => {
      const mockFindByPk = jest.fn().mockResolvedValueOnce(null);
      model.User.findByPk = mockFindByPk;

      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await UserController.show(req, res);

      expect(mockFindByPk).toHaveBeenCalledWith(1);
      expect(resp.notFound).toHaveBeenCalledWith(res, 'User not found');
    });

    test('should handle error and send error response', async () => {
      const mockFindByPk = jest.fn().mockRejectedValueOnce('error');
      model.User.findByPk = mockFindByPk;

      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      await UserController.show(req, res);

      expect(mockFindByPk).toHaveBeenCalledWith(1);
      expect(resp.error).toHaveBeenCalledWith(res, 'error');
    });
  });

  describe('destroy', () => {
    test('should delete the user with the given ID', async () => {
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      const mockFindByPk = jest.fn().mockResolvedValueOnce('user');
      model.User.findByPk = mockFindByPk;
      model.User.destroy = jest.fn();

      await UserController.destroy(req, res);

      expect(mockFindByPk).toHaveBeenCalledWith(1);
      expect(model.User.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    test('should handle user not found and send not found response', async () => {
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      const mockFindByPk = jest.fn().mockResolvedValueOnce(null);
      model.User.findByPk = mockFindByPk;

      await UserController.destroy(req, res);

      expect(mockFindByPk).toHaveBeenCalledWith(1);
      expect(resp.notFound).toHaveBeenCalledWith(res, 'User not found');
    });

    test('should handle error and send error response', async () => {
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

      const mockFindByPk = jest.fn().mockRejectedValueOnce('error');
      model.User.findByPk = mockFindByPk;

      await UserController.destroy(req, res);

      expect(mockFindByPk).toHaveBeenCalledWith(1);
      expect(resp.error).toHaveBeenCalledWith(res, 'error');
    });
  });
});
