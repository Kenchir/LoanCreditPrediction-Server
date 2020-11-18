const express = require("express"),
  router = express.Router();

router.use("/predictCreditAmount", require("./predictLoan"));

module.exports = router;
