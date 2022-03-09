import React from "react";
import { ComponentProps, Student } from "../Tools/data.model";

import { BsCaretDownFill } from 'react-icons/bs'
import { BsCaretUpFill } from 'react-icons/bs'

import { GrOverview } from "react-icons/gr";

import "./Overview.scss";

const Overview = ({ studentInfo }: ComponentProps) => {

    const [students, setStudents] = React.useState<Student[] | undefined>([]);
    const [showMe, setShowMe] = React.useState<string>("");
    const [weekList, setWeekList] = React.useState<(string | undefined)[] | undefined>([]);

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

        // sort out the weeks (pull all weeks from all reflections and then get distinct weeks)
        const tempWeekList:Array<string | undefined> | undefined = [];
        // map to array
        students?.map((student) => student.reflections?.map((reflection) => tempWeekList.push(reflection.date)));
        // get distinct weeks
        const distinctWeekList = tempWeekList.filter((value, index, self) => self.indexOf(value) === index);
        setWeekList(distinctWeekList);

    }, [studentInfo, students]);

    return (
        <div className="overview-teacher-wrapper">
            <div className="overview-teacher-title">End of Week Reflections</div>
            {weekList?.map(week => 
                <div className="overview-teacher-content">
                    <div className="overview-teacher-click" id={week} onClick={arrowClick}>
                        {week}
                        {showMe === week
                        ?
                        <BsCaretUpFill/>
                        :
                        <BsCaretDownFill/>
                        }
                    </div>
                    <div className="overview-teacher-info" style={{ display: showMe === week ? "block" : "none"}}>
                        {students?.map(student =>
                            {if(student.reflections.find(reflection => reflection.date === week) !== undefined) {
                                return (
                                <div className="overview-teacher-card">
                                    <div className="overview-teacher-subtitle">
                                        <GrOverview className="icon" /> {student.firstName} {student.lastName}:
                                    </div>
                                    <div className="overview-teacher-item">
                                        {student.reflections.find(reflection => reflection.date === week)?.final}
                                    </div>
                                    <hr className="overview-teacher-hr"/>
                                </div>
                                );
                            }}
                        )}
                        </div>
                    </div>
            ).reverse()}
        </div>
    );
}

export default Overview;