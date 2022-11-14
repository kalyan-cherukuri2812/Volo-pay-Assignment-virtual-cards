import './index.css'

import {Component} from 'react'
import {BsGridFill} from 'react-icons/bs'
import {BiVideo} from 'react-icons/bi'

import {AiOutlinePlus} from 'react-icons/ai'

import {withRouter} from 'react-router-dom'

import {GoThreeBars} from 'react-icons/go'

class Header extends Component {
  state = {your: false, all: true, blocked: false, cardFullWidth: false}

  componentDidMount = async () => {
    const {history} = this.props
    if (history.location.pathname === '/your') {
      this.setState({your: true, all: false, blocked: false})
    }
    if (history.location.pathname === '/') {
      this.setState({your: false, all: true, blocked: false})
    }
    if (history.location.pathname === '/blocked') {
      this.setState({your: false, all: false, blocked: true})
    }
  }

  cardGridClick = async () => {
    await this.setState(prev => ({cardFullWidth: false}))
    const {cardFullWidth} = this.state
    const {updatedCardWidth} = this.props
    await updatedCardWidth(cardFullWidth)
  }

  cardlistClick = async () => {
    await this.setState({cardFullWidth: true})
    const {cardFullWidth} = this.state
    const {updatedCardWidth} = this.props
    await updatedCardWidth(cardFullWidth)
  }

  yourClick = async () => {
    const {history} = this.props
    history.replace('/your')
  }

  allClick = async () => {
    const {history} = this.props
    await history.replace('/')
  }

  blockedClick = async () => {
    const {history} = this.props
    await history.replace('/blocked')
  }

  render() {
    const {your, all, blocked, cardFullWidth} = this.state

    return (
      <div className="header">
        <div className="header-heading-div">
          <div className="heading-main-heading-div">
            <h1 className="header-heading">Virtual cards</h1>
            <h1 className="learnmore-heading">
              <BiVideo className="video-icon" />
              {'  '}
              Learn more
            </h1>
          </div>

          <button className="v-c-add-btn" type="button">
            <AiOutlinePlus className="header-v-c-add-icon" /> Virtual cards
          </button>
        </div>
        <div className="header-div-2">
          <div className="header-options">
            <h1
              onClick={this.yourClick}
              className={
                your ? 'header-options-heading t' : 'header-options-heading '
              }
            >
              Your
            </h1>
            <h1
              onClick={this.allClick}
              className={
                all ? 'header-options-heading t' : 'header-options-heading '
              }
            >
              All
            </h1>
            <h1
              onClick={this.blockedClick}
              className={
                blocked ? 'header-options-heading t' : 'header-options-heading '
              }
            >
              Blocked
            </h1>
          </div>
          <div>
            <BsGridFill
              onClick={this.cardGridClick}
              className={
                cardFullWidth === false
                  ? 'header-grid-icon width-clr'
                  : 'header-grid-icon '
              }
            />
            <GoThreeBars
              onClick={this.cardlistClick}
              className={
                cardFullWidth === true
                  ? 'header-grid-icon width-clr'
                  : 'header-grid-icon '
              }
            />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
