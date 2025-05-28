import { useState } from "react";

class Experience {
    constructor(place, title, start, end, responsibilities) {
        this.place = place
        this.jobTitle = title
        this.startDate = start
        this.endDate = end
        this.responsibilities = responsibilities
        this.id = this.place + this.jobTitle + this.startDate + this.endDate + this.responsibilities.length;
    }
    static blankExperience() {
        return new Experience("No place set", "No job title", "Never", "Present", []);
    }

}

export default function EducationSection() {
    const [interactionMode, setInteractionMode] = useState(true); //true = edit mode, false = view mode
    let curPanel, btnContent

    const [experiences, setExperiences] = useState([Experience.blankExperience(), Experience.blankExperience()]);
    if (interactionMode) {
        curPanel = <EditEducation setExperiences={setExperiences} experiences={experiences}/>
        btnContent="Display Info";
    } else {
        curPanel = <DisplayEducation experiences={experiences}/>
        btnContent="Edit Info";
    }

    return (<>
        {curPanel}
        <button key={"interactionSwitchBtn"} onClick={() => setInteractionMode(!interactionMode)}>{btnContent}</button>
    </>)    
}

function DisplayEducation({experiences}) { 
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

function EditEducation({experiences, setExperiences}) { //TOOD: Wrap div editContentBox in a box
    return(
        <>
            {experiences.map((experience) => {
                let content = <>
                    <p>Company Name</p>
                    <input type="text"></input>

                    <p>Job Title</p>
                    <input type="text"></input>

                    <p>Start Date</p>
                    <input type="date"></input>

                    <p>End Date</p>  {/* TODO: Add checkbox that shows/hides end date and replaces it with current */}
                    <input type="date"></input> 
                </>
                //now we need to handle experience!
                
                return <div key={experience.id} id="editContainerBox">{content}{<ResponsibilityList experience={experience} setExperiences={setExperiences}/>}</div>
            })}   
        </>
    )
}

function ResponsibilityList({experience, setExperiences}) {
    //load the experiences current responsibilities
    let list = <>
        {experience.responsibilities.map((responsibility) => {
            return <div key={responsibility}>
                <label>{responsibility}</label>
                <input type="button"></input>
            </div>
        })}


    </>
    //for each experience 

    //create box that creates a new thing, that always appears at the bottom, plus the button to add it

}
