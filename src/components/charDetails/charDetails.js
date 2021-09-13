import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const Field = ({item, field, label}) =>
{
    return (
        <LiBlock>
            <Parametr>{label}</Parametr>
                <span>{item[field]}</span>
            </LiBlock>
    )
}

export {
    Field
}

const MainBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    border-radius: 10px;
    h4 {
        margin-bottom: 20px;
    text-align: center;
    }
    
`;
const LiBlock = styled.li`
    display:flex;
    justify-content: space-between;
    position: relative;
    padding: 0.75rem 1.25rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-width: 0 0 1px;
`;
const Parametr = styled.span`
    font-weight: bold;
    padding-right: 30px;
`;
const Ul = styled.ul`
display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
`;
const ListOfCharacters = styled(Ul)`
    border-radius: 0;
`;
const ErrorCharacter = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`;

function CharDetails({charId, onData,children}) {

     const [charDetail, updateDetail] = useState({item:null,loading:true,error:false});

    useEffect(() => {updateChar()},[charId])

    function onCharDetailsLoaded(item)
     {
        updateDetail(() =>({item,loading:false}))
    }

    function updateChar() {
        if (!charId) {
            return;
        }

        updateDetail(() =>({loading:true}))

        onData(charId)
            .then( onCharDetailsLoaded )
            .catch( () => onError())
    }

    function onError(){
        updateDetail(() =>({item:null,error:false}))
    }
        const {item,error,loading} = charDetail;

        if (!item && error) {
            return <ErrorMessage/>
        } else if (!item) {
            return <ErrorCharacter>Please select a item</ErrorCharacter>
        }
        
        const {name} = item;
        if (loading) {
            return (
                <div className="item-details rounded">
                    <Spinner/>
                </div>
            )
        }
        return (
            <MainBlock>
                <h4>{name}</h4>
                <ListOfCharacters>
                    {
                        React.Children.map(children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ListOfCharacters>
                </MainBlock>
        );
}

export {Ul, LiBlock, Parametr as Term, ListOfCharacters};
export default CharDetails;