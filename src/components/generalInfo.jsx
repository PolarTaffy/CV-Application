import { useState } from "react"

export default function GeneralInfoSection() {
    const [interactionMode, setInteractionMode] = useState(true); //true = edit mode, false = view mode
    const [userInfo, setUserInfo] = useState({name: "No name", email: "urmom@gmail.com", phoneNumber: "000-000-0000"});

    let curPanel, btnContent;
    if (interactionMode) {
        curPanel = <EditGeneralInfo setUserInfo={setUserInfo} userInfo={userInfo} />
        btnContent="Display Info";
    } else {
        curPanel = <DisplayGeneralInfo name={userInfo.name} email={userInfo.email} phoneNumber={userInfo.phoneNumber}/>
        btnContent="Edit Info";
    }

    return (<>
        {curPanel}
        <button key={"interactionSwitchBtn"} onClick={() => setInteractionMode(!interactionMode)}>{btnContent}</button>
    </>)    
}

function EditGeneralInfo({setUserInfo, userInfo}) {
    return (
        <>
            <h2>General Information</h2>
            <h3>Name</h3>
            <input type="text" onChange={(event) => {
                const newInfo = {...userInfo, name: event.target.value};
                setUserInfo(newInfo);
            }}/>
            <h3>Email</h3>
            <input type="email" onChange={(event) => {
                const newInfo = {...userInfo, email: event.target.value};
                setUserInfo(newInfo);
            }}/>
            <h3>Phone Number</h3>
            <input type="tel" onChange={(event) => {
                const newInfo = {...userInfo, phoneNumber: event.target.value};
                setUserInfo(newInfo);
            }}/> <br/>
            <small>Format: 123-456-7890</small>
            <br/><br/>
        </>
    )
}

function DisplayGeneralInfo({name, email, phoneNumber}) {
    return (<>
        <h2>General Information</h2>
        <p>Name: {name}</p>
        <p>Email Address: {email}</p>
        <p>Phone Number: {phoneNumber}</p>
    </>)
}