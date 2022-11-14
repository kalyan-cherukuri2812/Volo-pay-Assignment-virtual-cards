import './index.css'
import {Component} from 'react'
import Popup from 'reactjs-popup'
import {BsFilter} from 'react-icons/bs'
import {BiSearch} from 'react-icons/bi'

export default class Filter extends Component {
  state = {
    searchValue: '',
    subscriptionValue: false,
    burnerValue: false,
    optionValue: 'Search Cardholder',
  }

  optionChange = event => {
    this.setState({optionValue: event.target.value})
  }

  search = async event => {
    await this.setState({searchValue: event.target.value})
    const {searchValue} = this.state
    const {updateInput} = this.props
    await updateInput(searchValue)
  }

  subscriptionChecked = event => {
    this.setState({subscriptionValue: event.target.checked})
  }

  burnerChecked = event => this.setState({burnerValue: event.target.checked})

  applyClick = () => {
    const {subscriptionValue, burnerValue, optionValue} = this.state
    const {filterData} = this.props
    filterData(subscriptionValue, burnerValue, optionValue)
  }

  clearClick = async () => {
    await this.setState({
      subscriptionValue: false,
      burnerValue: false,
      optionValue: 'Search Cardholder',
    })
    const {subscriptionValue, burnerValue, optionValue} = this.state
    const {clearFilter} = this.props
    await clearFilter(subscriptionValue, burnerValue, optionValue)
  }

  render() {
    const {
      searchValue,
      subscriptionValue,
      burnerValue,
      optionValue,
    } = this.state
    const {cardholders} = this.props

    return (
      <div className="header-search-filter-div">
        <div className="search-div">
          <input
            value={searchValue}
            onChange={this.search}
            className="search-input"
            type="text"
          />
          <BiSearch />
        </div>

        <Popup
          trigger={
            <button className="filter-btn" type="button">
              <BsFilter className="filter-icon" />
              Filter
            </button>
          }
          position="bottom right"
        >
          <div className="popup-div">
            <h1 className="filter-h">Filter</h1>

            <div className="popup-sub-div">
              <h1 className="filter-type-h">Type</h1>
              <div className="popup-input-div1">
                <div className="check-box-div">
                  <input
                    className="check-box-input"
                    id="subscription"
                    type="checkbox"
                    onChange={this.subscriptionChecked}
                    checked={subscriptionValue}
                  />
                  <label className="checkbox-label" htmlFor="subscription">
                    Subscription
                  </label>
                </div>
                <div className="check-box-div">
                  <input
                    className="check-box-input"
                    id="burner"
                    type="checkbox"
                    onChange={this.burnerChecked}
                    checked={burnerValue}
                  />
                  <label className="checkbox-label" htmlFor="burner">
                    Burner
                  </label>
                </div>
              </div>
              <h1 className="filter-type-h">Cardholder</h1>
              <select
                value={optionValue}
                onChange={this.optionChange}
                className="select"
              >
                <option>Search Cardholder</option>
                {cardholders.map(each => (
                  <option key={each} value={each}>
                    {each}
                  </option>
                ))}
              </select>
              <div className="filter-btn">
                <button
                  onClick={this.applyClick}
                  className="btn apply-btn"
                  type="button"
                >
                  Apply
                </button>
                <button
                  onClick={this.clearClick}
                  className="btn clear-btn"
                  type="button"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    )
  }
}
