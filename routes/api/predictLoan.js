const express = require("express"),
  router = express.Router(),
  request = require("request"),
  encodeData = require("../../Middleware/index");

//Post route to predict the loan status
/**
 *
 * 1. Gets the field from user
 * 2. Post the relevant fields to the  machine learning model
 * 3. Use the eligibility and score probability along with the salaries to calculate the amount of loan
 */
router.post("/CreditLoanStatus", (req, res) => {


  let {
    ApplicantName,
    ApplicantIncome,
    LoanAmount,
    Credit_History,
    Gender,
    Married,
    Dependents,m,    
    Education,
    Property_Area,
    RepaymentPeriod,
  } = encodeData(req.body);

  //Request to Random Forest model
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
  request(options,  (error, response) =>{
    if (error) {
      throw new Error(error);
    }

    const { success, creditScore, Message, eligible } = JSON.parse(
      response.body
    );

    if (success) {
      /**
       * Assumption: a credit score of less than 37% (0.37) Gets your loan rejected
       * Maximum loan awarded to a person is = salary/income * (creditScore-0.25)*20
       * A person of credit score of 100% will get loan of salary*18
       * Interest rate=20% PM
       */
      let loanInterest = 0;
      let awardedLoan = false;
      let totalLoanToBeRepaid = 0;
      const interestRate = 0.2;
      //Round off the negative diff to 0, i.e credit <0.37 Round to nearest 500
      const maxLoanAmountEligible =
        Math.floor(
          (ApplicantIncome * Math.max(0, creditScore - 0.37) * 20) / 500
        ) * 500;

      if (LoanAmount < maxLoanAmountEligible) {
        loanInterest = (
          (LoanAmount * interestRate * RepaymentPeriod) /
          12
        ).toFixed(2);
        totalLoanToBeRepaid = parseFloat(LoanAmount) + parseFloat(loanInterest);
        awardedLoan = !awardedLoan;
      }
      //  console.log(maxLoanAmountEligible)
      return res.status(200).json({
        success: true,
        awardedLoan,
        LoanAmount,
        creditScore: creditScore,
        maxLoanAmountEligible,
        loanInterest,
        totalLoanToBeRepaid,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: Message,
      });
    }
  });
});

module.exports = router;
