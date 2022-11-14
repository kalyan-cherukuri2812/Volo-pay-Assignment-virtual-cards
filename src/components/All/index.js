import './index.css'

import {Component} from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'
import {v4} from 'uuid'

import dataBase from '../Data/index.json'

import Header from '../Header'
import Card from '../Card'
import Filter from '../filter'

export default class All extends Component {
  state = {
    data: dataBase,
    dataList: [],
    search: '',
    subscriptionValue: '',
    burnerValue: '',
    optionValue: 'Search Cardholder',
    limit: 10,
    cardFullWidth: false,
  }

  componentDidMount = () => {
    const {data} = this.state

    const camelCaseData = data.data.map(each => ({
      id: v4(),
      name: each.name,
      ownerName: each.owner_name,
      budgetName: each.budget_name,
      cardType: each.card_type,
      expiry: each.expiry,
      limit: each.limit,
      ownerId: each.owner_id,
      spent: each.spent,
      availableToSpend: each.available_to_spend,
      status: each.status,
    }))
    this.setState({dataList: camelCaseData})

    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const {limit} = this.state
    console.log(window.scrollY) //scrolled from top
    console.log(window.innerHeight) //visible part of screen
    console.log(document.documentElement.scrollHeight)

    if (
      window.scrollY + 1 + window.innerHeight >=
        document.documentElement.scrollHeight &&
      limit <= 90
    ) {
      console.log('scrolled')
      setTimeout(() => {
        this.setState(prev => ({limit: prev.limit + 10}))
      }, 1000)
    }
  }

  search = searchValue => {
    console.log(searchValue)
    this.setState({search: searchValue})
  }

  filterData = (subscriptionValue, burnerValue, optionValue) => {
    this.setState({subscriptionValue, burnerValue, optionValue})
  }

  clearFilter = (subscriptionValue, burnerValue, optionValue) => {
    this.setState({subscriptionValue, burnerValue, optionValue})
  }

  updatedCardWidth = cardFullWidth => {
    this.setState({cardFullWidth})
  }

  render() {
    const {
      dataList,
      search,
      subscriptionValue,
      burnerValue,
      optionValue,
      limit,
      cardFullWidth,
    } = this.state

    const result = dataList.filter(each =>
      each.name.toLowerCase().includes(search.toLowerCase()),
    )

    const a = []
    dataList.map(each => a.push(each.ownerName))
    const cardholders = [...new Set(a)]
    console.log(cardFullWidth, limit)

    let filtersData = []

    if (subscriptionValue && burnerValue) {
      if (optionValue !== 'Search Cardholder') {
        filtersData = result.filter(each => each.ownerName === optionValue)
      } else {
        filtersData = result
      }
    } else if (subscriptionValue) {
      if (optionValue !== 'Search Cardholder') {
        filtersData = result.filter(
          each =>
            each.cardType === 'subscription' && each.ownerName === optionValue,
        )
      } else {
        filtersData = result.filter(each => each.cardType === 'subscription')
      }
    } else if (burnerValue) {
      if (optionValue !== 'Search Cardholder') {
        filtersData = result.filter(
          each => each.cardType === 'burner' && each.ownerName === optionValue,
        )
      } else {
        filtersData = result.filter(each => each.cardType === 'burner')
      }
    } else if (optionValue !== 'Search Cardholder') {
      filtersData = result.filter(each => each.ownerName === optionValue)
    } else {
      filtersData = result
    }

    return (
      <div>
        <Header updatedCardWidth={this.updatedCardWidth} />
        <Filter
          updateInput={this.search}
          cardholders={cardholders}
          filterData={this.filterData}
          clearFilter={this.clearFilter}
        />
        <div>
          <ul>
            {filtersData.slice(0, limit).map(each => (
              <Card
                onScroll={this.handleScroll}
                key={each.id}
                details={each}
                cardWidth={cardFullWidth}
              />
            ))}
          </ul>
          <div className="loader">
            {limit <= filtersData.length - 1 ? (
              <ScaleLoader color=" rgb(255, 0, 64)" />
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}
