import React from 'react';

const Table = ({table=[]}) => {
    return(
        <>
        {table.map((data,index) => {
            if(data) {
                return (
                    <h2>{data.Name}, {data.Age}</h2>
                    <p>{data.Breed}, {data.Suburb}</p>
                )
            }
        })}
        </>
    )
}

export default Table;