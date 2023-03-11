// Write your code here.

import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordItem'

const initialWebsiteList = []

const randomColorsList = [
  'blue',
  'amber',
  'orange',
  'red',
  'green',
  'light-green',
]

class PasswordManager extends Component {
  state = {
    websiteList: initialWebsiteList,
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isPasswordShown: false,
  }

  filteredWebsiteResultsList = () => {
    const {websiteList, searchInput} = this.state
    const filteredWebsiteResults = websiteList.filter(eachWebsite =>
      eachWebsite.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return filteredWebsiteResults
  }

  togglePassCode = () => {
    this.setState(prevState => ({isPasswordShown: !prevState.isPasswordShown}))
  }

  deleteWebsite = id => {
    const {websiteList} = this.state
    const filteredWebsiteList = websiteList.filter(
      eachWebsite => eachWebsite.id !== id,
    )

    this.setState({websiteList: filteredWebsiteList})
  }

  showOrHidePasswordContainer = () => {
    const filteredWebsiteResults = this.filteredWebsiteResultsList()

    const imageContainer =
      filteredWebsiteResults.length >= 1
        ? this.showPasswordContainer()
        : this.showNoPasswordImage()

    return imageContainer
  }

  showNoPasswordImage = () => (
    <div className="no-password-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-image"
      />
      <p className="no-passwords">No Passwords</p>
    </div>
  )

  showPasswordContainer = () => {
    const {isPasswordShown} = this.state
    const filteredWebsiteResults = this.filteredWebsiteResultsList()

    return (
      <ul className="website-list-container">
        {filteredWebsiteResults.map(eachWebsite => (
          <PasswordItem
            key={eachWebsite.id}
            websiteDetails={eachWebsite}
            deleteWebsite={this.deleteWebsite}
            isPasswordShown={isPasswordShown}
          />
        ))}
      </ul>
    )
  }

  onSubmitForm = event => {
    event.preventDefault()

    const randomColor =
      randomColorsList[Math.ceil(Math.random() * randomColorsList.length - 1)]

    const {website, username, password} = this.state
    const newWebsite = {
      id: uuidv4(),
      website,
      username,
      password,
      randomBgColor: randomColor,
    }

    this.setState(prevState => ({
      websiteList: [...prevState.websiteList, newWebsite],
      website: '',
      username: '',
      password: '',
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {website, username, password, searchInput} = this.state
    const filteredWebsiteResults = this.filteredWebsiteResultsList()

    return (
      <div className="app-container">
        <div className="password-manager-container">
          <img
            alt="app logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
            className="logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="image-container">
              <img
                className="password-manager"
                alt="password manager"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              />
            </div>
            <div className="add-password-container">
              <h1 className="add-password-heading">Add New Password</h1>
              <div className="input-container">
                <div className="icon-container">
                  <img
                    alt="website"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    className="icon"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input-text"
                  value={website}
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="input-container">
                <div className="icon-container">
                  <img
                    alt="username"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                    className="icon"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input-text"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-container">
                <div className="icon-container">
                  <img
                    alt="password"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    className="icon"
                  />
                </div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input-text"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <button type="submit" className="submit-btn">
                Add
              </button>
            </div>
          </form>

          <div className="password-container">
            <div className="extra-password-container">
              <div className="your-header-password-container">
                <div className="password-count-container">
                  <h1 className="password-heading">Your Passwords</h1>
                  <p className="password-count">
                    {filteredWebsiteResults.length}
                  </p>
                </div>
                <div className="search-container">
                  <div className="search-icon-container">
                    <img
                      alt="search"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                      className="search-icon"
                    />
                  </div>
                  <input
                    type="search"
                    placeholder="Search"
                    className="search-input-text"
                    value={searchInput}
                    onChange={this.onChangeSearchInput}
                  />
                </div>
              </div>
              <hr className="horizontal-line" />
              <div className="checkbox-container">
                <input
                  id="checkbox"
                  type="checkbox"
                  className="check-box"
                  onClick={this.togglePassCode}
                />
                <label htmlFor="checkbox" className="show-password">
                  Show Passwords
                </label>
              </div>
              {this.showOrHidePasswordContainer()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
