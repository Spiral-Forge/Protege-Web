import React,{useState,useEffect} from 'react';
import './Resource.css'
import {db} from '../../firebase'
import {
    useParams
} from "react-router-dom";
import Box from "./resourcebox";
function Resource() {
    let { id } = useParams();
    let [info , setInfo] = useState([]);
    useEffect(() => {
        Fetchdata();
    },[]);
    const Fetchdata = ()=>{
        db.collection(id).get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                setInfo(arr => [...arr , element]);
            });
        })
    }
    
    info.sort((a,b) =>((b.data().upvote -b.data().downvote) > (a.data().upvote -a.data().downvote)) ? 1 : (((a.data().upvote -a.data().downvote)> (b.data().upvote -b.data().downvote))  ? -1 : 0))
    return (
        <div>
            <h1 className="SResourceHeading">{id} resources</h1>
            {
                info.map((resource) =>{
                return(
                    <Box title ={resource} link={resource.data().Link} id= {id}/>);
                })
            }
        </div>
    );
}

export default Resource;
