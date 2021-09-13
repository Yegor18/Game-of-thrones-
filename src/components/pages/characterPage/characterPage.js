import React, {Component} from 'react';
import ItemList from '../../itemList';
import CharDetails, {Field} from '../../charDetails';
import GotService from '../../../services/gotService';
import ErrorMessage from '../../errorMessage/errorMessage';
import RowBlock from '../../rowBlock/rowBlock';


export default class CharacterPage extends Component {

    gotService = new GotService();
    
    state = {
        selectedChar: 0,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {

        if(this.state.error) {
            return <ErrorMessage/>
        }

        let {page} = this.props;
        if (!page)
        page=5;
        const itemList = (
            <ItemList onItemSelected={this.onItemSelected} getData={() => this.gotService.getAllCharacters(page)}
                    renderItem={(item) => `${item.name} (${item.gender})`} page={page}/>
        )
        

        const charDetails = (
            <CharDetails charId = {this.state.selectedChar} onData={this.gotService.getCharacter}>
                <Field field ='gender' label='Gender'/>
                <Field field ='born' label='Born'/>
                <Field field ='died' label='Died'/>
                <Field field ='culture' label='Culture'/>
            </CharDetails>
        )

        

        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}