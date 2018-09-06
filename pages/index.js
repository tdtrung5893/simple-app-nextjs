import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Head from 'next/head'

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: null,
      user: null
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({
      username: e.target.value
    })
  }

  async handleSubmit(e){
    e.preventDefault()
    const {username} = this.state
    const data = await fetch(`https://api.github.com/users/${username}`)
    let res = await data.json()
    return await this.setState({user: res})
  }

  // async handleSubmit(e){
  //   e.preventDefault()
  //   const {username} = this.state
  //   fetch(`https://api.github.com/users/${username}`)
  //     .then(res => res.json())
  //     .then(user => this.setState({user}))
  //     .catch(err => console.log(err + ''))
  // }

  render() {
    const {user, username} = this.state
    let infoElm = null
    if (user) {
      if (user.message == "Not Found") {
        infoElm = (<div><h3>Username does not exist</h3></div>)
      } else {
        infoElm = (
          <div>
            <h4>username: <strong>{user.login}</strong></h4>
            <img src={user.avatar_url} width={200} />
            <h4>Fullname: <strong>{user.name}</strong></h4>
            <h4>Number public repos: <strong>{user.public_repos}</strong></h4>
          </div>
        )
      }
    }

    return(
      <div className="container">
        <Head>
          <link
            rel="stylesheet"
            href="//cdn.bootcss.com/spectre.css/0.1.29/spectre.min.css"/>
        </Head>
        {infoElm}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Type username on Github" onChange={this.handleChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
