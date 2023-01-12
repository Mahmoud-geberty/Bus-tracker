import React from 'react';
import { Container } from '@mui/material';
import VirtualizedList from './RouteList';
import RouteBar from './RouteBar';

export default class RoutePage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
        <div>
          <RouteBar />
          <Container>
            <VirtualizedList />
          </Container>
        </div>
    );
  }
}
