import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Ul, LiBlock} from '../charDetails/charDetails';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

const LiCursor = styled(LiBlock)`
    cursor: pointer;
`;
const UlCursor = styled(Ul)`
    cursor: pointer;
    border-radius: 5px;
`;
function ItemList({getData, onItemSelected, renderItem,page}){

    const [itemList, updateList] = useState([]);
    function onError()
    {
        itemList[10] =1;
    }
    itemList[10] =0;
    useEffect(() => {
        getData()
            .then((data) =>{
                updateList(data)
            })
            .catch(() => onError())
    }, [])
        function renderItems(arr) {
        return arr.map((item,i) =>{
            if (i != 10)
            {
         const {id} = item;
         const label = renderItem(item);
            return (
                 <LiCursor key={id} onClick={() => onItemSelected(i + (page-1)*10 +1 )}>
                    {label}
                </LiCursor>
            )
        }})
    };
    
            if (itemList[10] === 1)
        {
            return <ErrorMessage/>
        }
        if (!itemList) {
            return <Spinner/>
        }

        const items = renderItems(itemList); 

        return (
            <UlCursor>
                {items}
            </UlCursor>
        );
}
export default ItemList;