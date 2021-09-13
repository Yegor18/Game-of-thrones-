import React, {Component} from 'react';
import {Term,LiBlock, ListOfCharacters} from '../charDetails/charDetails_old';
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



export default class RandomChar extends Component {

    getService = new GotService();
    state = {
        char: {},
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar, this.props.interval);
        
    }

    componentWillUnmount()
    {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = (err) => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const id =Math.floor(Math.random() * 140 +25);
        this.getService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() {
        const {char, loading, error} = this.state;
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