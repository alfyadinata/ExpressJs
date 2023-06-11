// code references : https://github.com/fachryansyah/

module.exports = {
    success: function(res, data, code) {
        return res.status(code ? code : 200).json({
            data,
        })
    },
    error: function(res, message, code) {
        return res.status(code ? code : 500).json({
            message,
        })
    },
    notFound: function(res, error, code) {
        return res.status(code ? code : 404).json({
            message: error.message || error,
        })
    },
    validationError: function(res, message, code) {
        return res.status(code ? code : 304).json({
            message
        })
    }
}