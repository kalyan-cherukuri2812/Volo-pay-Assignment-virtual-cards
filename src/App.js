import {BrowserRouter, Route, Switch} from 'react-router-dom'
import All from './components/All'
import Blocked from './components/Blocked'
import Your from './components/Your'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={All} />
      <Route exact path="/blocked" component={Blocked} />
      <Route exact path="/your" component={Your} />
    </Switch>
  </BrowserRouter>
)

export default App
