import React from "react";
import { ComponentProps, Student } from "../Tools/data.model";

import { sendJSONData } from "../Tools/Toolkit";

const SEND_SCRIPT: string = "http://localhost:8080/deleteStudent";
const SEND_SCRIPT_DELETE_ALL: string = "http://localhost:8080/deleteAllStudents";

const StudentList = ({ setToken, studentInfo }: ComponentProps) => {

    const [students, setStudents] = React.useState<Student[] | undefined>([]);
    const [deleteOnePopup, setDeleteOnePopup] = React.useState<string>("");
    const [deleteAllPopup, setDeleteAllPopup] = React.useState<boolean>(false);
    const [studentEmails, setStudentEmails] = React.useState<(string | undefined)[] | undefined>([]);

    // delete
    const deleteOneButton = (e:any):void => {
        setDeleteOnePopup(e.target.id);
    }

    const deleteAllButton = (e:any):void => {
        setDeleteAllPopup(true);
    }

    const cancelButton = (e:any):void => {
        setDeleteOnePopup("");
        setDeleteAllPopup(false);
    }

    const confirmOneButton = (e: any): void => {
        let sendJSON = {
            email: e.target.name 
          };
        let sendString = JSON.stringify(sendJSON);
        sendJSONData(SEND_SCRIPT, sendString, onSuccess, ():void => console.log("*** Error has occured during AJAX data transmission"), "DELETE");
    };

    const confirmAllButton = (e: any): void => {
        let sendJSON = {
            emails: studentEmails 
        };
        let sendString = JSON.stringify(sendJSON);
        sendJSONData(SEND_SCRIPT_DELETE_ALL, sendString, onSuccess, ():void => console.log("*** Error has occured during AJAX data transmission"), "DELETE");
    };

    const onSuccess = () => {
        setDeleteOnePopup("");
        setDeleteAllPopup(false);
        window.location.reload();
    }

    // set the student list alphabetically by first name
    React.useEffect((): void => {
        let studentsTemp = studentInfo;
        studentsTemp.sort((a,b) => a.firstName.localeCompare(b.firstName));
        setStudents(studentsTemp);

        // sort out the weeks (pull all weeks from all reflections and then get distinct weeks)
        const emailsTemp:Array<string | undefined> | undefined = [];
        // map to array
        studentInfo?.map((student) => emailsTemp.push(student.email));
        setStudentEmails(emailsTemp);
    }, [studentInfo]);

    return (
        <div>
            <br/><br/><br/><br/><br/><br/><br/>
            <div>Student List <button onClick={deleteAllButton} disabled={students?.length === 0}>Delete All</button></div>
            {students?.map(student => 
                <div>
                    {student.firstName} {student.lastName} 
                    <button id={student._id} onClick={deleteOneButton}>Delete</button>
                    <div style={{ display: deleteOnePopup === student._id ? "block" : "none"}}>
                        <div>Are you sure you want to delete {student.firstName} {student.lastName}?</div>
                        <button name={student.email} onClick={confirmOneButton}>Confirm</button>
                        <button onClick={cancelButton}>Cancel</button> 
                    </div>
                </div>  
                  
            )}
            <div style={{ display: deleteAllPopup === true ? "block" : "none"}}>
                <div>Are you sure you want to delete all of the students?</div>
                <button onClick={confirmAllButton}>Confirm</button>
                <button onClick={cancelButton}>Cancel</button> 
            </div>
        </div>
    );
}

export default StudentList;