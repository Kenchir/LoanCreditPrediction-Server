const express = require("express"),
  router = express.Router(),
  request = require("request");

router.get("/home", (req, res) => {
  return res
    .status(200)
    .json({ success: false, error: "Phone number is required" });
});
//Post route to predict the loan status
/**
 *
 * 1. Gets the field from user
 * 2. Post the relevant fields to the  machine learning model
 * 3. Use the eligibility and score probability along with the salaries to calculate the amount of loan
 */
router.post("/CreditLoanStatus", (req, res) => {
  const {
    ApplicantIncome,
    LoanAmount,
    Credit_History,
    Gender,
    Married,
    Dependents,
    Education,
    Property_Area,
  } = req.body;
  const options = {
    method: "POST",
    url:
      "https://loan-eligibility-adalabs.herokuapp.com/predict_loan_eligibility",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ApplicantIncome: [ApplicantIncome],
      CoapplicantIncome: [0],
      LoanAmount: [LoanAmount],
      Credit_History: [Credit_History],
      Gender: [Gender],
      Married: [Married],
      Dependents: [Dependents],
      Education: [Education],
      Property_Area: [Property_Area],
    }),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    const { creditScore, eligible } = JSON.parse(response.body);
    return res
      .status(200)
      .json({ success: true, creditScore: creditScore, eligible: eligible });
  });
});
module.exports = router;
