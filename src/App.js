import React from 'react'
import Indexs from './pages/index/index'
import City from './pages/City/citys'
import Map from './pages/map/index'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/index" component={Indexs} />
        <Route exact path="/citys" component={City} />
        <Route exact path="/map" component={Map} />
        <Route exact path="/" render={() => <Redirect to="/index" />} />
      </Router>
    )
  }
}
