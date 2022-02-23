import React from "react";
import { ComponentProps, Reflection, Student } from "../Tools/data.model";

import { BsCaretDownFill } from 'react-icons/bs'
import { BsCaretUpFill } from 'react-icons/bs'

// icon import
import { FaRunning } from "react-icons/fa";
import { GiMeditation } from "react-icons/gi";
import { FaSmileWink } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { GoBook } from "react-icons/go";
import { GrOverview } from "react-icons/gr";

import "./ReflectionOverview.scss";

const ReflectionOverview = ({ studentInfo }: ComponentProps) => {

    // get the email from session storage
    const storedEmail: string | null = sessionStorage.getItem("email");
    const email: string | undefined =
    storedEmail !== null ? JSON.parse(storedEmail) : undefined;

    const [student, setStudent] = React.useState<Student | undefined>();
    const [reflections, setReflections] = React.useState<Reflection[] | undefined>([]);
    const [showMe, setShowMe] = React.useState<string>("");

    // set the student and the reflections
    React.useEffect((): void => {
        setStudent(studentInfo.find((x) => x.email === email));
        // reverse the reflections array so the newest date is first
        let reflectionTemp = student?.reflections;
        reflectionTemp?.reverse();
        setReflections(reflectionTemp);
    }, [studentInfo, email, student?.reflections]);

    // on click show/hide that dates content
    const arrowClick = (e:any):void => {
        showMe === e.target.id 
        ?
        setShowMe("")
        :
        setShowMe(e.target.id); 
    }

    return(
        <div className="overview-wrapper">
            <div className="overview-title">
                Past Reflections for {student?.firstName} {student?.lastName}
            </div>
            <div className="overview-content">
                {reflections?.map((reflection) => 
                    <div> 
                        <div className="overview-click" id={reflection.date} onClick={arrowClick}>
                            {reflection.date}
                            {showMe === reflection.date
                            ?
                            <BsCaretUpFill/>
                            :
                            <BsCaretDownFill/>
                            }
                        </div>
                        <div className="overview-info" style={{ display: showMe === reflection.date ? "block" : "none"}}>
                            <div className="overview-card " id="exercise">
                                <div className="overview-subtitle">
                                    <FaRunning className="icon" /> Exercise:
                                    <hr />
                                </div>
                                <div className="overview-item">
                                    <span className="overview-bold">Time</span> - {reflection.exerciseTime}
                                </div>
                                <div className="overview-item">
                                    <span className="overview-bold">Type</span> - {reflection.exerciseType}
                                </div>
                            </div>
                            <div className="overview-card" id="meditation"> 
                                <div className="overview-subtitle">
                                    <GiMeditation className="icon" /> Meditation:
                                    <hr />
                                </div>
                                <div className="overview-item">
                                    <span className="overview-bold">Time</span> - {reflection.meditation}
                                </div>
                            </div>
                            <div className="overview-card" id="kindness">                             
                                <div className="overview-subtitle">
                                    <FaSmileWink className="icon" /> Random act of kindness:
                                    <hr />
                                </div>
                                <div className="overview-item">{reflection.kindness}</div>
                            </div>
                            <div className="overview-card" id="gratitude">                             
                                <div className="overview-subtitle">
                                    <FaHandsHelping className="icon" /> Something I was grateful for:
                                    <hr />
                                </div>
                                <div className="overview-item">
                                    {reflection.gratitude}
                                </div>
                            </div>
                            <div className="overview-card" id="journal">                             
                                <div className="overview-subtitle">
                                    <GoBook className="icon" /> My journal for the week:
                                    <hr />
                                </div>
                                <div className="overview-item">
                                    {reflection.journal}
                                </div>
                            </div>
                            <div className="overview-card" id="overview">                             
                                <div className="overview-subtitle">
                                    <GrOverview className="icon" /> My overall reflection for the week:
                                    <hr />
                                </div>
                                <div className="overview-item">{reflection.final}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="overview-content">
                <div className="overview-click">
                    Test Card
                </div>
            </div>
            <div className="overview-content">
                <div className="overview-click">
                    Test Card
                </div>
            </div>
            <div className="overview-content">
                <div className="overview-click">
                    Test Card
                </div>
            </div>
        </div>
        
    );
}

export default ReflectionOverview;