import { useState } from "react";

class Experience {
    constructor(place, title, start, end, responsibilities) {
        this.place = place
        this.jobTitle = title
        this.startDate = start
        this.endDate = end
        this.responsibilities = [...responsibilities]
        this.id = this.place + this.jobTitle + this.startDate + this.endDate + this.responsibilities.length;
    }
    static blankExperience() {
        return new Experience("No place set", "No job title", "Never", "Present", []);
    }
    static copyExperience(copy) {
        return new Experience(copy.place, copy.jobTitle, copy.startDate, copy.endDate, copy.responsibilities);
    }
}

export default function JobSection() {
    const [interactionMode, setInteractionMode] = useState(true); //true = edit mode, false = view mode
    let curPanel, btnContent

    const [experiences, setExperiences] = useState([Experience.blankExperience()]);
    if (interactionMode) {
        curPanel = <EditJob setExperiences={setExperiences} experiences={experiences}/>
        btnContent="Display Info";
    } else {
        curPanel = <DisplayJob experiences={experiences}/>
        btnContent="Edit Info";
    }

    return (<>
        {curPanel}
        <button key={"interactionSwitchBtn"} onClick={() => setInteractionMode(!interactionMode)}>{btnContent}</button>
    </>)    
}

function DisplayJob({experiences}) { 
    return(<>
    {experiences.map((experience) => {
        if (experience.responsibilities.length == 0) {
            return (<div key={experience.id} id="contentBox">
                <p><b>{experience.jobTitle}, {experience.place}</b></p>
                <p>{experience.startDate} - {experience.endDate}</p>
            </div>)
        } else {
            return <div key={experience.id} id="contentBox">
                <p><b>{experience.jobTitle}, {experience.place}</b></p>
                <p>{experience.startDate} - {experience.endDate}</p>
                <ul> 
                    {experience.responsibilities.map((responsibility, index) => {
                        return responsibility.length != 0 ? <li>{responsibility}</li> : null;
                    })}
                </ul>
            </div>
        }
    })}
    </>)

}

function EditJob({experiences, setExperiences}) { //TOOD: Wrap div editContentBox in a box
    const [curExperience, setCurExperience] = useState(Experience.blankExperience());

    return(
        <>
            <DisplayJob experiences={experiences} />
            {/* This time around we're just going to be able to add new ones to avoid overwhelming ourselves. */}
            <br></br>
            <label>Company</label>
            <input type="text" onChange={(event) => {
                const company = event.target.value;
                setCurExperience({...curExperience, place: company})
            }}/>

            <label>Job Title</label>
            <input type="text" onChange={(event) => {
                const title = event.target.value;
                setCurExperience({...curExperience, jobTitle: title})
            }}/>

            <label>Start Date</label>
            <input type="date" onChange={(event) => {
                const date = event.target.value;
                setCurExperience({...curExperience, startDate: date})
            }}/>

            <label>End Date</label>
            <input type="date" onChange={(event) => {
                const date = event.target.value;
                setCurExperience({...curExperience, endDate: date})
            }}/>

            <button onClick={() => {
                setExperiences(experiences.concat(Experience.copyExperience(curExperience)));
            }}>Submit</button>
            
        </>
    )
}