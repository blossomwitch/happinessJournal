import { startOfWeek } from "date-fns";
import { endOfWeek } from "date-fns/esm";
import { ComponentProps } from "../Tools/data.model";

const ReflectionForm = ({ studentInfo, studentEmail }: ComponentProps) => {
    // start and end week dates - week starts on Monday
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const end = endOfWeek(new Date(), { weekStartsOn: 1 });
  const storedEmail = sessionStorage.getItem("email");
  const email = storedEmail !== null ? JSON.parse(storedEmail) : undefined;

  return (
    <div>
      <form>
        <div>
          <p>
            {" "}
            Week of&nbsp;
            {start.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}{" "}
            to&nbsp;{" "}
            {end.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div>
          <p>
            {studentInfo.find((x) => x.email === email)?.firstName}&nbsp;
            {studentInfo.find((x) => x.email === email)?.lastName}'s
            Weekly Reflections
          </p>
        </div>
        <div>
          <div>Exercise</div>
          <select>
            <option value="0 - 10 Minutes">0 - 10 minutes</option>
            <option value="10 - 20 Minutes">10 - 20 minutes</option>
            <option value="20 - 30 Minutes">20 - 30 minutes</option>
            <option value="30 - 40 Minutes">30 - 40 minutes</option>
            <option value="40 - 50 Minutes">40 - 50 minutes</option>
            <option value="50 - 60 Minutes">50 - 60 minutes</option>
            <option value="More than an hour!">More than an hour!</option>
          </select>
          <br />
          <input type="text" placeholder="type of activity"></input>
        </div>
        <div>
          <div>Meditation</div>
          <select>
            <option value="0 - 10 Minutes">0 - 10 minutes</option>
            <option value="10 - 20 Minutes">10 - 20 minutes</option>
            <option value="20 - 30 Minutes">20 - 30 minutes</option>
            <option value="30 - 40 Minutes">30 - 40 minutes</option>
            <option value="40 - 50 Minutes">40 - 50 minutes</option>
            <option value="50 - 60 Minutes">50 - 60 minutes</option>
            <option value="More than an hour!">More than an hour!</option>
          </select>
        </div>
        <div>
          <div>Random Act of Kindness</div>
          <textarea placeholder="Something kind I've done this week..."></textarea>
        </div>
        <div>
          <div>Gratitude</div>
          <textarea placeholder="Something I am grateful for this week..."></textarea>
        </div>
        <div>
          <div>Journal</div>
          <textarea placeholder="My thoughts and feelings this week..."></textarea>
        </div>
        <div>
          <button>Save</button>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ReflectionForm;
