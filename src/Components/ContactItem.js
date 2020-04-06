import React from 'react';
import "./contactitem.css"

// const styleHeadline = {}

const ContactItem = (props) => {
    return (
        <section className="Grid">
            <img src={props.pictureUrl} alt="" />
            <h1>{props.name}</h1>
            <h1>{props.popularity}</h1>
            <button onClick={() => props.DeleteOnButton(props.popularity)} id={props.popularity}><b>delete</b></button>
            {/* <button id={props.popularity}><b>delete</b></button> */}
        </section>
    )
}

export default ContactItem;