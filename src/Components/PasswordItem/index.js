import './index.css'

const PasswordItem = props => {
  const {websiteDetails, deleteWebsite, isPasswordShown} = props
  const {id, website, username, password, randomBgColor} = websiteDetails

  const onDeleteWebsite = () => {
    deleteWebsite(id)
  }

  const passCode = isPasswordShown ? (
    <p className="username">{password}</p>
  ) : (
    <img
      alt="stars"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
      className="stars-img"
    />
  )

  return (
    <li className="website-app-container">
      <div className="website-container">
        <h1 className={`first-letter ${randomBgColor}`}>
          {website[0].toUpperCase()}
        </h1>
        <div className="website-details-container">
          <p className="website-name">{website}</p>
          <p className="username">{username}</p>
          {passCode}
        </div>
      </div>
      <button
        type="button"
        className="button"
        onClick={onDeleteWebsite}
        data-testid="delete"
      >
        <img
          alt="delete"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
