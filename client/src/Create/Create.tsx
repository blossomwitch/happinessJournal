import { useState, useCallback } from "react";
import { ComponentProps, JSONData, Token } from "../Tools/data.model";
import { getJSONData, sendJSONData } from "../Tools/Toolkit";
import ReCAPTCHA from "react-google-recaptcha";
import "./Create.scss";
import img from "./logo.png";
import { Link } from "react-router-dom";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";

const SEND_SCRIPT: string = "http://localhost:8080/createAccount";
const STUDENT_INFO = "http://localhost:8080/getStudentInfo";

const Create = ({ studentInfo, setStudentInfo }: ComponentProps) => {

  const [loading, setLoading] = useState<boolean>(false);
  // ---------------------------------------------------------------------------------- Input Checking
  // First name, Last name, Email, Password, Password Check
  const [fName, setfName] = useState<string>("");
  const [lName, setlName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  // Error Message Status Save
  const [fnameMessage, setfNameMessage] = useState<string>("");
  const [lnameMessage, setlNameMessage] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");

  // Check validiation
  const [isfName, setIsfName] = useState<boolean>(false);
  const [islName, setIslName] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const [recaptchaPassed, setRecaptchaPassed] = useState<boolean>(false);
  // const router = useRouter()

  // confirmation message
  const [confirmationVisible, setConfirmationVisible] =
    useState<boolean>(false);

  // First Name
  const onChangefName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setfName(e.target.value);
      if (e.target.value.length < 1) {
        setfNameMessage("Please Enter your first name");
        setIsfName(false);
      } else {
        setfNameMessage("Good :D");
        setIsfName(true);
      }
    },
    []
  );

  // Last Name
  const onChangelName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setlName(e.target.value);
      if (e.target.value.length < 1) {
        setlNameMessage("Please Enter your last name");
        setIslName(false);
      } else {
        setlNameMessage("Good :D");
        setIslName(true);
      }
    },
    []
  );

  // Email
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // need to fix!!!!!!
      // need to make nscc email Regex
      const emailRegex =
        /([wW][0-9][0-9][0-9][0-9][0-9][0-9][0-9])@([n][s][c][c])(.[c][a])/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage("The format of the email is wrong");
        setIsEmail(false);
      } else if (
        studentInfo.find((student) => student.email === emailCurrent)
      ) {
        setEmailMessage(
          "Email is already in use - please choose another email"
        );
        setIsEmail(false);
      } else {
        setEmailMessage("Good :D");
        setIsEmail(true);
      }
    },
    [studentInfo]
  );

  // Password
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // need to fix!!!!!!!!
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          "Use at least 8 characters including a number, a special character, and a lowercase letter."
        );
        setIsPassword(false);
      } else {
        setPasswordMessage("Good :D");
        setIsPassword(true);
      }
    },
    []
  );

  // Password Confirm
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("Good :D");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("Those passwords didn’t match. Try again.");
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  // ---------------------------------------------------------------- Event Handlers
  // back button to return to login page and reset the student info array to include the new student
  const infoSent = (result: JSONData): void => {
    setStudentInfo(result.students);
    console.log("student info sent")
  };  

  const backButton = (e: any): void => {
    getJSONData(
      STUDENT_INFO,
      // (result: JSONData): void => setStudentInfo(result.students),
      infoSent,
      (): void => console.log("Error Retrieving JSON Data")
    );
  };

  // send account data to the server and redirect to their reflections page
  const onSubmit = (e: any): void => {
    setLoading(true);
    e.preventDefault();
    let sendJSON = {
      firstName: fName,
      lastName: lName,
      email: email,
      password: password,
    };
    let sendString = JSON.stringify(sendJSON);
    sendJSONData(
      SEND_SCRIPT,
      sendString,
      onSuccess,
      (): void => console.log("Error creating account"),
      "POST"
    );
  };

  // if account data sends successfully
  const onSuccess = (e: any): void => {
    setLoading(false);
    setConfirmationVisible(true);
  };

  // ---------------------------------------------------------------- ReCaptcha
  const recaptchaChecked = (e: any): void => {
    // failsafe for if the verification expires - disables button
    if (e === null) {
      setRecaptchaPassed(false);
    } else {
      // secret key from google and the response is generated on check
      let captchaData = {
        secret: "6Lf6DVQeAAAAAN14mandf2IVlsSwNXTDS8NRfSzF",
        response: e,
      };
      let sendString = JSON.stringify(captchaData);
      // send data to server for google verification of generated key
      sendJSONData(
        "http://localhost:8080/recaptcha",
        sendString,
        (): void => setRecaptchaPassed(true),
        (): void => console.log("Error verifying ReCaptcha"),
        "POST"
      );
    }
  };

  return (
    <div className="create-wrapper">
      <LoadingOverlay enabled={loading} bgColor="#ffffff" spinnerColor="#131250" />
      <div className="create-logo">
        <img src={img} alt="happiness journal logo" />
      </div>
      <form onSubmit={onSubmit}>
        <div className="create-content">
          <h1>Create Account</h1>
          <div className="create-input">
            <span className="create-title">First Name: </span>
            <input id="firstName" type="text" onChange={onChangefName} />
            {fName.length > 0 && (
              <span
                id="fname"
                className={`message ${isfName ? "success" : "error"}`}
              >
                {fnameMessage}
              </span>
            )}
          </div>
          <div className="create-input">
            <span className="create-title">Last Name: </span>
            <input id="lastName" type="text" onChange={onChangelName} />
            {lName.length > 0 && (
              <span
                id="lname"
                className={`message ${islName ? "success" : "error"}`}
              >
                {lnameMessage}
              </span>
            )}
          </div>
          <div className="create-input">
            <span className="create-title">School Email: </span>
            <input
              id="email"
              placeholder="W0000000@nscc.ca"
              type="text"
              onChange={onChangeEmail}
            />
            {email.length > 0 && (
              <span
                id="email"
                className={`message ${isEmail ? "success" : "error"}`}
              >
                {emailMessage}
              </span>
            )}
          </div>
          <div className="create-input">
            <span className="create-title">Password: </span>
            <input id="password" type="password" onChange={onChangePassword} />
            {password.length > 0 && (
              <span
                id="password"
                className={`message ${isPassword ? "success" : "error"}`}
              >
                {passwordMessage}
              </span>
            )}
          </div>
          <div className="create-input">
            <span className="create-title">Confirm Password: </span>
            <input
              id="confirm"
              type="password"
              onChange={onChangePasswordConfirm}
            />
            {passwordConfirm.length > 0 && (
              <span
                id="passwordCf"
                className={`message ${isPasswordConfirm ? "success" : "error"}`}
              >
                {passwordConfirmMessage}
              </span>
            )}
          </div>
          <div className="recapcha">
            <ReCAPTCHA
              className="recap"
              sitekey="6Lf6DVQeAAAAANT8S4kwjehuEXJ4nTnLjiboozQr"
              onChange={recaptchaChecked}
            />
          </div>
          <div
            className="confirmation-message"
            style={{ display: confirmationVisible ? "block" : "none" }}
          >
            <div
              className="return-alert">
              Your account has been successfully created. <br></br>
              Please return to login page.
            </div>
            <Link to="/">
              <button className="btnReturn" onClick={backButton}>
                Return to Login
              </button>
            </Link>
          </div>
          <div
            className="create-button"
            style={{ display: confirmationVisible ? "none" : "block" }}
          >
            <button
              className="btnCreateAccount"
              type="submit"
              disabled={
                !(
                  isfName &&
                  islName &&
                  isEmail &&
                  isPassword &&
                  isPasswordConfirm &&
                  recaptchaPassed
                )
              }
            >
              {" "}
              Create Account
            </button>
            <Link to="/">
              <button className="btnBack">Back</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
