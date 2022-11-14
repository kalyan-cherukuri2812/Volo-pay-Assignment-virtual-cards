import './index.css'

import ProgressBar from '@ramonak/react-progress-bar'
import {ImFire} from 'react-icons/im'
import {FaGlobeAmericas} from 'react-icons/fa'
import {GoPrimitiveDot} from 'react-icons/go'

const Card = props => {
  const {details, cardWidth} = props
  const {
    name,
    ownerName,
    budgetName,
    cardType,
    expiry,
    limit,

    spent,
    availableToSpend,
  } = details

  const processBarVal = (spent.value / availableToSpend.value) * 100

  return (
    <li style={cardWidth ? {width: '100%'} : {width: '46%'}}>
      <div className="li-div-1">
        <div className="li-sub-div-1">
          <h1 className="li-name">{name}</h1>
          <h1 className="li-owner-name">
            {ownerName} • {budgetName}
          </h1>
          <h1 className="card-type">{cardType.toUpperCase()}</h1>
        </div>
        <div className="li-sub-div-2">
          {cardType === 'burner' ? (
            <ImFire className="fire-icon" />
          ) : (
            <FaGlobeAmericas className="fire-icon" />
          )}
          {cardType === 'burner' ? (
            <h1 className="expiry">Expires: {expiry}</h1>
          ) : (
            <h1 className="expiry">November Limit: {limit} SGD</h1>
          )}
        </div>
      </div>
      <div>
        <ProgressBar
          className="process-bar"
          completed={processBarVal}
          bgColor=" rgb(255, 0, 64)"
          baseBgColor=" rgb(10, 124, 10)"
          height="12px"
          customLabel=" "
        />

        <div className="spent-avb-div">
          <div className="spent-h-div">
            <GoPrimitiveDot className="dot-spent" />
            <h1 className="spent">Spent</h1>
          </div>
          <h1 className="spent-value">
            {spent.value} {spent.currency}
          </h1>
        </div>
        <div className="spent-avb-div">
          <div className="spent-h-div">
            <GoPrimitiveDot className="dot-available" />
            <h1 className="spent">Available to spend</h1>
          </div>
          <h1 className="available-value">
            {availableToSpend.value} {availableToSpend.currency}
          </h1>
        </div>
      </div>
    </li>
  )
}

export default Card
