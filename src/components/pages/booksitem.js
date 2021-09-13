import React,{Component} from 'react';
import GotService from '../../services/gotService';
import CharDetails, {Field,LiBlock} from '../charDetails';
import BookDetails from '../bookDetails/bookDetails';
import styled from 'styled-components';
import book from '../book.png';


const ImageBook = styled.div`
    background-image: url(${book});
    background-size: cover;
    width:600px;
    height:800px;
    margin: 0 50% 0 50%;
`;
const Table = styled.div`
    text-align:center;
    color:white;
    padding: 30% 0 50% 0;

`;
const DivFlame = styled.div`
    margin:5px 0 5px 0;
`;

const BookField = ({item, field, label}) =>
{
    return (
        <DivFlame margin="5px 0 5px 0">
            {label}  {item[field]}<div dangerouslySetInnerHTML={{__html: ''}} />
                </DivFlame>
    )
}

export default class BooksItem extends Component {
    gotService = new GotService();

    
    
    render() {
        return (
                <ImageBook>
                    <Table>
                    <BookDetails charId = {this.props.bookId} onData={this.gotService.getBook} >
                   <BookField field ='author' label='Author'/>
                   <BookField field ='numberOfPages' label='NumberOfPages'/>
                   <BookField field ='isbn' label='ISBN'/>
               </BookDetails>
                    </Table>
                    </ImageBook>
        )
    }
}
