function errorhandler(err, req, res, next) {
        //console.log("got error: "+err);
        res.status(501)
        .json({
          status: false,
          message: err.message
        });
};

module.exports = errorhandler;