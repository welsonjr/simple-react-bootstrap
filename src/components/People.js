import React,{ useState, useEffect } from 'react';

const People = (props) => {
    const [specie,setSpecie] = useState(null);

    const getSpecie = async (url) => {
        try {
            if(!url)
                setSpecie("UNKNOWN");;
            let res = await fetch(url);
            res = await res.json();
            setSpecie(res['name']);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getSpecie(props.data.species[0]);
    },[]);

    return (<li>{props.data.name} - {props.data.mass} - {specie ? specie : ( <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>) }</li>)
}

export default People;