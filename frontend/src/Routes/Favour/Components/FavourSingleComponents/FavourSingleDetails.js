import React from 'react';
import Time from 'react-time-format';

const FavourSingleDetails = (props) => {
    let type = '';
    if (props.favour.oweMe) { type = 'Owe me'; }
    else { type = 'I owe'; }

    return (
        <div>
            <h1>Favour: {props.favour.favourName}</h1>
            <p>{props.favour.timeCompleted == null ?
                (<span><b>Date Created: </b><Time value={props.favour.timeCreated} format="DD/MM/YYYY" /></span>)
                :
                (<span><b>Date Completed: </b><Time value={props.favour.timeCompleted} format="DD/MM/YYYY" /></span>)}</p>
            <p><b>Friend: </b>{props.favour.oweMe ? (props.favour.owner.firstName) : (props.favour.ower.firstName)}</p>
            <p><b>Type: </b>{type}</p>
            <p><b>Status: </b>{props.favour.status}</p>
            <p>{props.favour.favourComment !== "" ? (<span><b>Comments: </b>{props.favour.favourComment}</span>) : ('')}</p>
            <p>{props.favour.proof !== "" ? (<span><b>Photo proof: </b><a href={props.favour.proof}>Proof</a></span>) : ('')}</p>
        </div>
    );
}

export default FavourSingleDetails;