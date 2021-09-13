import React, {Component} from 'react';
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

export default class CharDetails extends Component {

    gotService = new GotService();

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        console.log("mount");
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
        console.log("didupdate");
    }

    onCharDetailsLoaded = (item) => {
        this.setState({
            item,
            loading: false
        })
    }

    updateChar() {
        const {charId} = this.props;
        const {onData} = this.props;
        if (!charId) {
            return;
        }

        this.setState({
            loading: true
        })
        console.log("updatechar");

        onData(charId)
            .then( this.onCharDetailsLoaded )
            .catch( () => this.onError())
    }

    onError(){
        this.setState({
            item: null,
            error: false
        })
    }

    render() {
        if (!this.state.item && this.state.error) {
            return <ErrorMessage/>
        } else if (!this.state.item) {
            return <ErrorCharacter>Please select a item</ErrorCharacter>
        }
        const {item} = this.state;
        const {name} = item;
        if (this.state.loading) {
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
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ListOfCharacters>
                </MainBlock>
        );
    }
}
