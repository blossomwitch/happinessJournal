import React from "react";
import { ComponentProps, Student, Token } from "../Tools/data.model";

import { BsCaretDownFill } from 'react-icons/bs'
import { BsCaretUpFill } from 'react-icons/bs'
import { sendJSONData } from "../Tools/Toolkit";

const SEND_SCRIPT: string = "http://localhost:8080/deleteStudent";

const Overview = ({ setToken, studentInfo }: ComponentProps) => {

    const [students, setStudents] = React.useState<Student[] | undefined>([]);
    const [showMe, setShowMe] = React.useState<string>("");
    const [deletePopup, setDeletePopup] = React.useState<boolean>(false);

    // logout
    const logoutButton = (e: any): void => {
        const token: Token = {
          token: "",
        };
        sessionStorage.setItem("email", "");
        setToken(token);
      };

    // delete
    const deleteButton = (e:any):void => {
        setDeletePopup(true);
    }

    const cancelButton = (e:any):void => {
        setDeletePopup(false);
    }

    const confirmButton = (e: any): void => {
        let sendJSON = {
            email: e.target.name 
          };
        let sendString = JSON.stringify(sendJSON);
        sendJSONData(SEND_SCRIPT, sendString, onSuccess, ():void => console.log("*** Error has occured during AJAX data transmission"), "DELETE");
    };

    const onSuccess = () => {
        setDeletePopup(false);
        window.location.reload();
    }

    // content visibility
    const arrowClick = (e:any):void => {
        showMe === e.target.id 
        ?
        setShowMe("")
        :
        setShowMe(e.target.id); 
    }

    // set the student list alphabetically by first name
    React.useEffect((): void => {
        let studentsTemp = studentInfo;
        studentsTemp.sort((a,b) => a.firstName.localeCompare(b.firstName));
        setStudents(studentsTemp);
    }, [studentInfo]);

    return (
        <div>
            <button onClick={logoutButton}>Logout</button>
            <div>End of Week Reflections</div>
            {students?.map((student) => 
                <div>
                    <div id={student._id} onClick={arrowClick}>
                        {student.firstName}
                        {showMe === student._id
                        ?
                        <BsCaretUpFill/>
                        :
                        <BsCaretDownFill/>
                        }
                    </div>
                    <div style={{ display: showMe === student._id ? "block" : "none"}}>
                        <button onClick={deleteButton}>Delete Student</button>
                        {student.reflections.map((reflection) => 
                            <div>
                                <div>{reflection.date}</div>
                                <div>{reflection.final}</div>
                            </div>
                        ).reverse()}
                        <div style={{ display: deletePopup === true ? "block" : "none"}}>
                            <div>Are you sure you want to delete {student.firstName} {student.lastName}?</div>
                            <button name={student.email} onClick={confirmButton}>Confirm</button>
                            <button onClick={cancelButton}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Overview;