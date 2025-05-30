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

}

export default function EducationSection() {
    const [interactionMode, setInteractionMode] = useState(true); //true = edit mode, false = view mode
    let curPanel, btnContent

    const [experiences, setExperiences] = useState([Experience.blankExperience()]);
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
                    <input type="text" onChange={(event) => {
                        
                    }}></input>

                    <p>Job Title</p>
                    <input type="text"></input>

                    <p>Start Date</p>
                    <input type="date"></input>

                    <p>End Date</p>  {/* TODO: Add checkbox that shows/hides end date and replaces it with current */}
                    <input type="date"></input> 
                </>
                //now we need to handle experience!
                
                return <div key={experience.id} id="editContainerBox">
                    {content}
                    <br/>
                    {<ResponsibilityList responsibilities={experience.responsibilities} experience={experience} experiences={experiences} setExperiences={setExperiences}/>}
                    <br /> <br />
                    <button>Save Experience</button>
                    <hr/>
                    </div>
            })}   
        </>
    )
}

function ResponsibilityList({responsibilities, experience, experiences, setExperiences}) {
    //load the experiences current responsibilities
    let list = <>
        <p>Responsibilities</p>
        {responsibilities.map((responsibility) => {
            return <div key={responsibility}>
                <label>{responsibility}</label>
                <input type="button"></input>
            </div>
        })}
    </>
    let resp = "";
    let addBox = <>
        
        <input type="input" onChange={(event) => {
            resp = event.target.value;
        }}/>
        <button onClick={() => {
            console.log(typeof(experiences))
            let index = experiences.indexOf(experience);
            let duties = [...responsibilities, {resp}];
            let myExp = Experience.blankExperience(experience.place, experience.jobTitle, experience.startDate, experience.endDate, duties);
            
            console.log(`Index: ${index} \nDuties: ${duties.toString()}\nExperience: ${Object.values(myExp)}`)
            let allExps = [...experiences];
            allExps[index] = myExp;

            setExperiences(allExps);
        }}>Add Responsibility</button>
    </>

    return <>
        {list} {addBox}
    </>
}
