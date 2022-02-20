import React from "react";
import { ComponentProps, Reflection, Student } from "../Tools/data.model";

import { BsCaretDownFill } from 'react-icons/bs'
import { BsCaretUpFill } from 'react-icons/bs'

const ReflectionOverview = ({ studentInfo, studentEmail }: ComponentProps) => {

    // get the email from session storage
    const storedEmail: string | null = sessionStorage.getItem("email");
    const email: string | undefined =
    storedEmail !== null ? JSON.parse(storedEmail) : undefined;

    const [student, setStudent] = React.useState<Student | undefined>();
    const [reflections, setReflections] = React.useState<Reflection[] | undefined>([]);
    const [showMe, setShowMe] = React.useState<string>("");

    React.useEffect((): void => {
        setStudent(studentInfo.find((x) => x.email === email));
        setReflections(student?.reflections);
    }, [studentInfo, email, student?.reflections]);

    const arrowClick = (e:any):void => {
        showMe === e.target.id 
        ?
        setShowMe("")
        :
        setShowMe(e.target.id);
    }

    return(
        <div>
            <div style={{paddingTop: '90px'}}>
                Past Reflections for {student?.firstName} {student?.lastName}
            </div>
            <div>
                {reflections?.map((reflection) => 
                    <div>
                        <div id={reflection.date} onClick={arrowClick}>
                            {reflection.date} 
                            {showMe === reflection.date
                            ?
                            <BsCaretUpFill/>
                            :
                            <BsCaretDownFill/>
                            }
                        </div>
                        <div style={{ display: showMe === reflection.date ? "block" : "none" }}>
                            <div>Exercise:</div>
                            <div>Time - {reflection.exerciseTime}</div>
                            <div>Type - {reflection.exerciseType}</div>
                            <div>Meditation:</div>
                            <div>Time - {reflection.meditation}</div>
                            <div>Random act of kindness:</div>
                            <div>{reflection.kindness}</div>
                            <div>Something I was grateful for:</div>
                            <div>{reflection.gratitude}</div>
                            <div>My journal for the week:</div>
                            <div>{reflection.journal}</div>
                            <div>My overall reflection for the week:</div>
                            <div>{reflection.final}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        
    );
}

export default ReflectionOverview;