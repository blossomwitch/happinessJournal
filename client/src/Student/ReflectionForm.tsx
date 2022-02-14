import { startOfWeek } from "date-fns";
import { endOfWeek } from "date-fns/esm";
import { ComponentProps, Student } from "../Tools/data.model";
import "./ReflectionForm.scss";

// icon import
import { FaRunning } from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";
import { FaSmileWink } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { sendJSONData } from "../Tools/Toolkit";
import React from "react";

const SAVE_REFLECTION: string = "http://localhost:8080/saveReflection";
const SUBMIT_REFLECTION: string = "http://localhost:8080/submitReflection";

const ReflectionForm = ({ studentInfo }: ComponentProps) => {
  // start and end week dates - week starts on Monday
  const start: Date = startOfWeek(new Date(), { weekStartsOn: 1 });
  const end: Date = endOfWeek(new Date(), { weekStartsOn: 1 });
  const stringDate: string = `Week of ${start.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  })} to ${end.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  })}`;
  // get the email from session storage
  const storedEmail: string | null = sessionStorage.getItem("email");
  const email: string | undefined =
    storedEmail !== null ? JSON.parse(storedEmail) : undefined;

  // set the student to the one with the matching email
  const [student, setStudent] = React.useState<Student | undefined>();

  // different form fields to display save data if any
  const [exerciseTime, setExerciseTime] = React.useState<string>("");
  const [exerciseType, setExerciseType] = React.useState<string>("");
  const [meditation, setMeditation] = React.useState<string>("");
  const [kindness, setKindness] = React.useState<string>("");
  const [gratitude, setGratitude] = React.useState<string>("");
  const [journal, setJournal] = React.useState<string>("");

  // final message field
  const [final, setFinal] = React.useState<string>("");

  // button message for save and submit
  const [btnMessage, setBtnMessage] = React.useState<string>("");
  // button group visibility - submit and confirm submit with final reflection
  const [buttonsVisible, setButtonsVisible] = React.useState<boolean>(true);

  // make sure the values are loaded on login and refreshes
  React.useEffect((): void => {
    setStudent(studentInfo.find((x) => x.email === email));
    setExerciseTime(
      student?.saved[0] === undefined || student.saved[0].exerciseTime === null
        ? ""
        : student.saved[0].exerciseTime
    );
    setExerciseType(
      student?.saved[0] === undefined || student.saved[0].exerciseType === null
        ? ""
        : student.saved[0].exerciseType
    );
    setMeditation(
      student?.saved[0] === undefined || student.saved[0].meditation === null
        ? ""
        : student.saved[0].meditation
    );
    setKindness(
      student?.saved[0] === undefined || student.saved[0].kindness === null
        ? ""
        : student.saved[0].kindness
    );
    setGratitude(
      student?.saved[0] === undefined || student.saved[0].gratitude === null
        ? ""
        : student.saved[0].gratitude
    );
    setJournal(
      student?.saved[0] === undefined || student.saved[0].journal === null
        ? ""
        : student.saved[0].journal
    );
  }, [studentInfo, email, student?.saved]);

  // -------------------------------------------------------- fieldChanges
  const fieldChange = (e: any): void => {
    setBtnMessage("");
    if (e.target.id === "exerciseTimeInput") {
      setExerciseTime(e.target.value);
    } else if (e.target.id === "exerciseTypeInput") {
      setExerciseType(e.target.value);
    } else if (e.target.id === "meditationInput") {
      setMeditation(e.target.value);
    } else if (e.target.id === "kindnessInput") {
      setKindness(e.target.value);
    } else if (e.target.id === "gratitudeInput") {
      setGratitude(e.target.value);
    } else if (e.target.id === "journalInput") {
      setJournal(e.target.value);
    } else if (e.target.id === "finalInput") {
      setFinal(e.target.value);
    }
  };

  // -------------------------------------------------------- save and submit buttons
  const onSave = (e: any): void => {
    e.preventDefault();
    let JSONData = {
      _id: student?._id,
      saveData: {
        saved: "saved",
        exerciseType: exerciseType,
        exerciseTime: exerciseTime,
        meditation: meditation,
        kindness: kindness,
        gratitude: gratitude,
        journal: journal,
      },
    };
    let sendString = JSON.stringify(JSONData);
    sendJSONData(SAVE_REFLECTION, sendString, saveSuccess, saveError, "PUT");
  };

  const saveSuccess = () => {
    setBtnMessage("Save successful.");
  };

  const saveError = () => {
    setBtnMessage("Error with saving.");
  };

  const onSubmit = (e: any): void => {
    e.preventDefault();
    setBtnMessage("");
    setButtonsVisible(false);
  };

  const onCancel = (e: any): void => {
    e.preventDefault();
    setButtonsVisible(true);
  };

  const onConfirmSubmit = (e: any): void => {
    let JSONData = {
      _id: student?._id,
      submitData: {
        date: stringDate,
        exerciseType: exerciseType,
        exerciseTime: exerciseTime,
        meditation: meditation,
        kindness: kindness,
        gratitude: gratitude,
        journal: journal,
        final: final
      },
    };
    let sendString = JSON.stringify(JSONData);
    sendJSONData(
      SUBMIT_REFLECTION,
      sendString,
      submitSuccess,
      submitError,
      "PUT"
    );
  };

  const submitSuccess = () => {
    setBtnMessage("Reflection submitted successfully.");
  };

  const submitError = () => {
    setBtnMessage("Error with submission.");
  };

  return (
    student?.reflections !== undefined && student.reflections.find(r => r.date === stringDate) !== undefined
    ?
    <div className="student-wrapper">Reflection for the {stringDate} has been submitted!</div>
    :
    <div className="student-wrapper">
      <form className="student-form">
        <div className="student-week">
          <p>{stringDate}</p>
        </div>
        <div className="student-info">
          <p>
            {student?.firstName}&nbsp;
            {student?.lastName}'s Weekly Reflections:
          </p>
        </div>
        <div className="student-content" id="exercise">
          <div className="student-subtitle">
            <FaRunning className="icon" /> Exercise
            <hr />
          </div>
          <select
            id="exerciseTimeInput"
            className="student-ex-select"
            onChange={fieldChange}
            value={exerciseTime}
          >
            <option value="">Please select an option</option>
            <option value="0 - 10 minutes">0 - 10 minutes</option>
            <option value="10 - 20 minutes">10 - 20 minutes</option>
            <option value="20 - 30 minutes">20 - 30 minutes</option>
            <option value="30 - 40 minutes">30 - 40 minutes</option>
            <option value="40 - 50 minutes">40 - 50 minutes</option>
            <option value="50 - 60 minutes">50 - 60 minutes</option>
            <option value="More than an hour!">More than an hour!</option>
          </select>
          <br />
          <input
            id="exerciseTypeInput"
            className="student-exercise"
            type="text"
            placeholder="type of activity"
            value={exerciseType}
            onChange={fieldChange}
          ></input>
        </div>
        <div className="student-content" id="meditation">
          <div className="student-subtitle">
            <GiMeditation className="icon" /> Meditation
            <hr />
          </div>
          <select
            id="meditationInput"
            className="student-meditation"
            onChange={fieldChange}
            value={meditation}
          >
            <option value="">Please select an option</option>
            <option value="0 - 10 Minutes">0 - 10 minutes</option>
            <option value="10 - 20 Minutes">10 - 20 minutes</option>
            <option value="20 - 30 Minutes">20 - 30 minutes</option>
            <option value="30 - 40 Minutes">30 - 40 minutes</option>
            <option value="40 - 50 Minutes">40 - 50 minutes</option>
            <option value="50 - 60 Minutes">50 - 60 minutes</option>
            <option value="More than an hour!">More than an hour!</option>
          </select>
        </div>
        <div className="student-content" id="kindness">
          <div className="student-subtitle">
            <FaSmileWink className="icon" /> Random Act of Kindness
            <hr />
          </div>
          <textarea
            id="kindnessInput"
            className="student-kindness"
            placeholder="Something kind I've done this week..."
            value={kindness}
            onChange={fieldChange}
          ></textarea>
        </div>
        <div className="student-content" id="gratitude">
          <div className="student-subtitle">
            <FaHandsHelping className="icon" /> Gratitude
            <hr />
          </div>
          <textarea
            id="gratitudeInput"
            className="student-gratitude"
            placeholder="Something I am grateful for this week..."
            onChange={fieldChange}
            value={gratitude}
          ></textarea>
        </div>
        <div className="student-content" id="journal">
          <div className="student-subtitle">
            <GoBook className="icon" /> Journal
            <hr />
          </div>
          <textarea
            id="journalInput"
            className="student-journal"
            placeholder="My thoughts and feelings this week..."
            value={journal}
            onChange={fieldChange}
          ></textarea>
        </div>
        <div style={{ display: buttonsVisible ? "none" : "block" }}>
          <div>Final Reflection (this will be visible to your teacher)</div>
          <textarea
            id="finalInput"
            placeholder="An overview of your week..."
            value={final}
            onChange={fieldChange}
          ></textarea>
        </div>
        <div
          className="student-btnArea"
          style={{ display: buttonsVisible ? "block" : "none" }}
        >
          <button className="btnSave" onClick={onSave}>
            Save
          </button>
          <button
            className="btnSubmit"
            onClick={onSubmit}
            disabled={
              exerciseTime === "" &&
              exerciseType === "" &&
              meditation === "" &&
              gratitude === "" &&
              kindness === "" &&
              journal === ""
            }
          >
            Submit
          </button>
        </div>
        <div
          className="student-btnArea"
          style={{ display: buttonsVisible ? "none" : "block" }}
        >
          <button
            className=""
            disabled={final === ""}
            onClick={onConfirmSubmit}
          >
            Confirm Submit
          </button>
          <button className="" onClick={onCancel}>
            Cancel
          </button>
        </div>
        <div className="btnMessages">{btnMessage}</div>
      </form>
    </div>
  );
};

export default ReflectionForm;
