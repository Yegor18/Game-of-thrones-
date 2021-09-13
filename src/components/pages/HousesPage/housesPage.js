import React, {Component} from 'react';
import ItemList from '../../itemList';
import CharDetails, {Field} from '../../charDetails';
import GotService from '../../../services/gotService';
import ErrorMessage from '../../errorMessage/errorMessage';
import RowBlock from '../../rowBlock/rowBlock';


export default class HousesPage extends Component {

    gotService = new GotService();
    
    state = {
        selectedChar: 0,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
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
        const itemList = (
            <ItemList 
            onItemSelected={this.onItemSelected} 
            getData={() => this.gotService.getAllHomes(page)}
                    renderItem={(item) => `${item.name}`} page={page}/>
        )

        const charDetails = (
            <CharDetails charId = {this.state.selectedChar} onData={this.gotService.getHome}>
                <Field field ='region' label='Region'/>
                <Field field ='title' label='Title'/>
                <Field field ='coatOfArms' label='coatOfArms'/>
            </CharDetails>
        )

        

        return (
            <RowBlock left={itemList} right={charDetails}/>
        )
    }
}