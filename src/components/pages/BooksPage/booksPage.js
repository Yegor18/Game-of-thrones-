import React, {Component} from 'react';
import ItemList from '../../itemList';
import GotService from '../../../services/gotService';
import ErrorMessage from '../../errorMessage/errorMessage';
import {withRouter} from 'react-router-dom';


class BooksPage extends Component {

    gotService = new GotService();
    
    state = {
        error: false
    }


    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        };
        let {page} = this.props;
        if (!page)
        page=1;

        

        return (
            <ItemList onItemSelected={(itemId) => {
                this.props.history.push(`/books/${itemId}`)
            }} getData={() => this.gotService.getAllBooks(page)}
                    renderItem={(item) => `${item.name}`} page={page}/>
        )
    }
}

export default withRouter(BooksPage);