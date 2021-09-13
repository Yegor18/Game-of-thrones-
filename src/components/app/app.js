import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharacterPage from '../pages/characterPage/characterPage';
import './app.css';
import BooksItem from '../pages/booksitem';
import GotService from '../../services/gotService';
import ErrorMessage from '../errorMessage/errorMessage';
import BooksPage from '../pages/BooksPage/booksPage';
import HousesPage from '../pages/HousesPage/housesPage';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import img from './got.jpeg';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

const AppBlock = styled.div`
    background-image: url(${img});
    background-size: cover;
    height: 1400px;	
    `;
export {AppBlock};
export default class App extends React.Component {
    gotService = new GotService();
    state = {
        toggled: true,
        error: false,
    }

    componentDidCatch()
    {
        console.log('error');
        this.setState({error: true})
    }

    

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    toggleChar = () =>
    {
        this.setState(({toggled}) => ({
            toggled: !toggled,
        }))
    };

    


    render() {
        
        const {toggled,error} = this.state;
        if (error) {
            return <ErrorMessage/>
        }
        const char = toggled ? <RandomChar/> : null;    
        const pathes = ['/characters', '/houses', '/books', '/'];
        return (
            <Router>
                <AppBlock>
            <Container>
                <Header />
            </Container>
            
            <Container>
                <Row>
                    <Col lg={{size: 5, offset: 0}}>
                        {char}
                        <button className="toggle-btn" type="submit" onClick={this.toggleChar} >Toggle random character</button>
                    </Col>
                </Row>
                
                <Route path='/characters' component={CharacterPage}/>
                <Route path='/houses' component={HousesPage}/>
                <Route path='/books' exact component={BooksPage}/>
                <Route path='/books/:id' render={
                    ({match}) => 
                    
                    {
                        const {id} = match.params;
                        pathes.push(`/books/${id}`);
                        return <BooksItem bookId={id}/>}  
                }/>
            </Container>
            </AppBlock>
            <Route path='/' render={
                ({location}) => {
                    if (pathes.indexOf(location.pathname) === -1)
                    {return <ErrorPage/>}
                    
                }
            }/>
            </Router>
    )
}     
};

