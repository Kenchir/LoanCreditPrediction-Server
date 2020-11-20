/**
 * 
 * @param function name(params) {
   converts the data fields to 0 and 1(binary which the ML model understands)
   Parse other strings to integers
 } 
 */
module.exports = encodeData = ({
  ApplicantIncome,
  LoanAmount,
  Gender,
  Credit_History,
  Married,
  Dependents,
  Education,
  RepaymentPeriod,
  Property_Area,
}) => {
  if (Property_Area == "urban") {
    Property_Area = 1;
  } else {
    Property_Area = 0;
  }

  if (Gender == "Male") {
    Gender = 1;
  } else {
    Gender = 0;
  }
  if (Married == "Married") {
    Married = 1;
  } else {
    Married = 0;
  }
  if (Education == "postGraduate" || Education == "undergraduate") {
    Education = 0;
  } else {
    Education = 1;
  }
  if (Property_Area == "urban") {
    Property_Area = 1;
  } else {
    Property_Area = 0;
  }
  if (Credit_History == "yes") {
    Credit_History = 0;
  } else {
    Credit_History = 1;
  }

  return {
    ApplicantIncome: parseFloat(ApplicantIncome),
    LoanAmount: parseFloat(LoanAmount),
    Credit_History,
    Gender,
    Married,
    Dependents: parseInt(Dependents),
    RepaymentPeriod: parseInt(RepaymentPeriod),
    Education,
    Property_Area,
  };
};
