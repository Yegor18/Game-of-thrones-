import React, {useEffect, useState} from 'react';
import {Term,LiBlock, ListOfCharacters} from '../charDetails/charDetails';
import Spinner from '../spinner/spinner';
import styled from 'styled-components';
import GotService from '../../services/gotService'; 
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types';

const RandomCharBlock = styled.div`
background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    border-radius: 0.25rem;
 h4{
    margin-bottom: 20px;
    text-align: center;
}
`;



function RandomChar({interval}) {

    let getService = new GotService();
    const [itemList, updateList] = useState({char:[],loading:true,error:false});


    useEffect(() => {
        updateChar();
        let timerId = setInterval(updateChar, interval);
        return () => {
            clearInterval(timerId);
            console.log(1);
        }
    }, [])

    function onCharLoaded(char) 
    {
        updateList(() => ({char, loading:false}))
    }

    function onError() {
        updateList(() => ({error:true, loading:false}))
    }

    function updateChar()  
    {
        const id =Math.floor(Math.random() * 140 +25);
        getService.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    }

        const {char, loading, error} = itemList;
        const message = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;
         
        return (
            
                <RandomCharBlock>
                    {spinner}
                    {message}
                {content}
            </RandomCharBlock>
        );
}

RandomChar.defaultProps = {
    interval: 15000
}

RandomChar.propTypes = {
    interval: PropTypes.number,
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ListOfCharacters>
                <LiBlock>
                    <Term>Gender </Term>
                    <span>{gender}</span>
                </LiBlock>
                <LiBlock>
                    <Term>Born </Term>
                    <span>{born}</span>
                </LiBlock>
                <LiBlock>
                    <Term>Died </Term>
                    <span>{died}</span>
                </LiBlock>
                <LiBlock>
                    <Term>Culture </Term>
                    <span>{culture}</span>
                </LiBlock>
            </ListOfCharacters>
        </>
    )
}

export default RandomChar;