module.exports = {
  server: {
    baseDir: "./",
    middleware: [
      function (req, res, next) {
        const url = req.url;
        if (!url.includes('.') && url !== '/') {
          req.url = `${url}.html`;
        }
        next();
      }
    ]
  }
};
