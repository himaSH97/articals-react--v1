import React from 'react';
import '../styles/test.scss';
import { useEffect, useState, useContext } from 'react';
import Card from "../components/Card.jsx"
import { UserContext } from '../UserContext.cjs';
import { reactLocalStorage } from 'reactjs-localstorage';
import { useNavigate } from 'react-router-dom';


const HistoryArticals = () => {
    const [hist, setHist] = useState([])
    const [datatag, setDatatag] = useState([])
    const { user, setUser } = useContext(UserContext);
    const disUser = reactLocalStorage.get("thisUser")
    const history = useNavigate();


    const removeUser = (e) => {
        e.preventDefault();
        reactLocalStorage.clear();
        history("/log")
    }

    useEffect(() => {
        fetch('https://myservice-5ysh.onrender.com/getarticals')
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item => item.articalType === 'history');
                setHist(filteredData);
            })
            .catch(error => console.error(error));
        console.log(hist);
    }, []);


    return (
        <div className='item'>
            <div className="title">
                <h2>History Articals</h2>
                <div className="accInfo">
                    <h6>{disUser}</h6>
                    <a>
                        <button onClick={(e) => removeUser(e)}>log out</button>
                    </a>
                </div>
            </div>

            <div className="card-list">
                <div className="addArtical">

                    <a href="/test">
                        <img className='write' src="../img/write.png" alt="" />
                        <h4> write an artical</h4>
                    </a>
                </div>
                <div className="cards" >


                    {hist.map(card => (
                        <Card className="card"
                            key={card._id}
                            title={card.title}
                            content={card.content}
                            date={card.date}
                            tag1={card.tag1}
                            author={card.creatorName}
                            imgUrl={card.imgUrl}
                            tag2={card.tag2}

                        />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default HistoryArticals;
