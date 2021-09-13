import {AppBlock} from '../../app/app';
import React, {Component} from 'react';
import { Container,Row,Col } from 'reactstrap';


export default class ErrorPage extends Component{

    render()
    {
        return <AppBlock>
            <Container>
                <Row>
                    <Col>Упс. Неверная страница.</Col>
                </Row>
            </Container>
        </AppBlock>
    }
}

