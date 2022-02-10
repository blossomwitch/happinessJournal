import { startOfWeek } from "date-fns";
import { endOfWeek } from "date-fns/esm";
import { ComponentProps } from "../Tools/data.model";
import "./ReflectionForm.scss";

// icon import
import { FaRunning } from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";
import { FaSmileWink } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { GoBook } from "react-icons/go";

const ReflectionForm = ({ studentInfo, studentEmail }: ComponentProps) => {
    // start and end week dates - week starts on Monday
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const end = endOfWeek(new Date(), { weekStartsOn: 1 });
  const storedEmail = sessionStorage.getItem("email");
  const email = storedEmail !== null ? JSON.parse(storedEmail) : undefined;

  return (
    <div className="student-wrapper">
      <form className="student-form">
        <div className="student-week">
          <p>
            {" "}
            Week of&nbsp;
            {start.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}{" "}
            to{" "}
            {end.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="student-info">
          <p>
            {studentInfo.find((x) => x.email === email)?.firstName}&nbsp;
            {studentInfo.find((x) => x.email === email)?.lastName}'s
            Weekly Reflections:
          </p>
        </div>
        <div className="student-content" id="exercise">
          <div className="student-subtitle">
            <FaRunning className="icon"/> Exercise<hr />
          </div>
          <select className="student-ex-select">
            <option value="0 - 10 Minutes">0 - 10 minutes</option>
            <option value="10 - 20 Minutes">10 - 20 minutes</option>
            <option value="20 - 30 Minutes">20 - 30 minutes</option>
            <option value="30 - 40 Minutes">30 - 40 minutes</option>
            <option value="40 - 50 Minutes">40 - 50 minutes</option>
            <option value="50 - 60 Minutes">50 - 60 minutes</option>
            <option value="More than an hour!">More than an hour!</option>
          </select>
          <br />
          <input className="student-exercise" type="text" placeholder="type of activity"></input>
        </div>
        <div className="student-content" id="meditation">
          <div className="student-subtitle">
            <GiMeditation className="icon"/> Meditation<hr />
          </div>
          <select className="student-meditation">
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
            <FaSmileWink className="icon"/> Random Act of Kindness<hr />
          </div>
          <textarea className="student-kindness" placeholder="Something kind I've done this week..."></textarea>
        </div>
        <div className="student-content" id="gratitude">
          <div className="student-subtitle">
            <FaHandsHelping className="icon"/> Gratitude<hr />
          </div>
          <textarea className="student-gratitude" placeholder="Something I am grateful for this week..."></textarea>
        </div>
        <div className="student-content" id="journal">
          <div className="student-subtitle">
            <GoBook className="icon"/> Journal<hr />
          </div>
          <textarea className="student-journal" placeholder="My thoughts and feelings this week..."></textarea>
        </div>
        <div className="student-btnArea">
          <button className="btnSave">Save</button>
          <button className="btnSubmit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ReflectionForm;
