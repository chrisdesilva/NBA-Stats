import React, { Component } from 'react';

class PlayerStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeTeam: undefined,
      homeScore: undefined,
      awayTeam: undefined,
      awayScore: undefined,
      gameStatus: undefined,
      period: undefined,
      error: undefined
    }
  }

  componentDidMount(){
    fetch("https://www.balldontlie.io/api/v1/games")
      .then(res => res.json())
      .then( result => {
        console.log(result)
        this.setState({
          homeTeam: result.data[0].home_team.full_name,
          homeScore: result.data[0].home_team_score,
          awayTeam: result.data[0].visitor_team.full_name,
          awayScore: result.data[0].visitor_team_score,
          gameStatus: result.data[0].status,
          period: result.data[0].period
        })
      })
      .catch(error => console.log(error))
  } 

  render() {
    return (
      <div>
        <div>
          {this.state.homeTeam} : {this.state.homeScore} - {this.state.awayTeam} : {this.state.awayScore}
        </div>
        <div>
          {this.state.period} / {this.state.gameStatus}
        </div>
      </div>
    )
  }
}

export default PlayerStats