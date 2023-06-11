module.exports = {
    async paginator({model = {},page = 1, perPage = 10}) {
      const offset = (page - 1) * perPage;
      console.log("mde;",model)
    
      const { count, rows } = await model.findAndCountAll({
        limit: perPage,
        offset,
      });
    
      const totalPages = Math.ceil(count / perPage);
    
      return {
        data: rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalUsers: count,
        },
      };
    }
}
