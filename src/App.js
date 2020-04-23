import React from 'react';

class App extends React.Component{
    render() {
        return <div>
            <h1>Rock, Paper, Scissors, Lizard, Spock with React</h1>
            <Game/>
        </div>;
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            played: false,
            status: null,
            playerMove: null,
            opponentMove: null
        };
        this.rock = this.rock.bind(this);
        this.paper = this.paper.bind(this);
        this.scissors = this.scissors.bind(this);
        this.lizard = this.lizard.bind(this);
        this.spock = this.spock.bind(this);
        this.playGame = this.playGame.bind(this);
        this.reset = this.reset.bind(this);
    }

    playGame(playerMove){
        if(! this.state.played){
            let opponentMove = chooseRandomAction();
            let status = chooseWinner(playerMove , opponentMove);
            this.setState({
                played: true,
                status: status,
                playerMove: playerMove,
                opponentMove: opponentMove
            });
        }
    }

    rock() {
        console.log("Rocks Chosen!");
        this.playGame("Rock");
    }

    paper() {
        console.log("Paper Chosen!");
        this.playGame("Paper");
    }

    scissors() {
        console.log("Scissors Chosen!");
        this.playGame("Scissors");
    }

    lizard(){
        console.log("Lizard Chosen!");
        this.playGame("Lizard");
    }

    spock(){
        console.log("Spock Chosen!");
        this.playGame("Spock");
    }

    reset(){
        console.log("Resetting Game!");
        this.setState({
            played: false
        });
    }

    render() {
        let stat = this.state.played ? statusCodeToText(this.state.status) : "";
        let op = this.state.played ? this.state.opponentMove : "";
        let pl = this.state.played ? this.state.playerMove : "";

        let resetBtn = this.state.played ? <button onClick={this.reset}> Reset </button> : null;

        return <div className={"bordered spaced"}>
            <div className={"spaced"}>
                <button onClick={this.rock}> Rock</button>
                <button onClick={this.paper}> Paper</button>
                <button onClick={this.scissors}> Scissors</button>
                <button onClick={this.lizard}> Lizard </button>
                <button onClick={this.spock}> Spock </button>
            </div> <hr/>
            <div className={"spaced"}>
                <span> Game Status: {stat}</span><br/>
                <span> Player's Choice: {pl}</span><br/>
                <span> Opponent's Choice: {op}</span><br/>
                {resetBtn}
            </div>
        </div>;
    }
}
function chooseRandomAction(){
    let moves = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
    let randNr = Math.floor(Math.random()*5);
    let randMove = moves[randNr];
    return randMove;
}
function chooseWinner(playerMove, opponentMove){
    if(playerMove === opponentMove){
        return 0;
    }
    if(playerMove === "Rock"){
        if(opponentMove === "Paper"){
            return -1;
        }
        if(opponentMove === "Scissors"){
            return 1;
        }
        if(opponentMove === "Lizard"){
            return 1;
        }
        if(opponentMove === "Spock"){
            return -1;
        }
    }
    if(playerMove === "Paper"){
        if(opponentMove === "Scissors"){
            return -1;
        }
        if(opponentMove === "Rock"){
            return 1;
        }
        if(opponentMove === "Lizard"){
            return -1;
        }
        if(opponentMove === "Spock"){
            return 1;
        }
    }
    if(playerMove === "Scissors"){
        if(opponentMove === "Rock"){
            return -1;
        }
        if (opponentMove === "Paper"){
            return 1;
        }
        if(opponentMove === "Lizard"){
            return 1;
        }
        if(opponentMove === "Spock"){
            return -1;
        }
    }
    if(playerMove === "Lizard"){
        if(opponentMove === "Rock"){
            return -1;
        }
        if (opponentMove === "Paper"){
            return 1;
        }
        if(opponentMove === "Scissors"){
            return -1;
        }
        if(opponentMove === "Spock"){
            return 1;
        }
    }
    if(playerMove === "Spock"){
        if(opponentMove === "Rock"){
            return 1;
        }
        if (opponentMove === "Paper"){
            return -1;
        }
        if(opponentMove === "Lizard"){
            return -1;
        }
        if(opponentMove === "Scissors"){
            return 1;
        }
    }
}
function statusCodeToText(code){
    if(code == -1){
        return "Lose";
    }
    if(code == 0){
        return "Draw";
    }
    if(code == 1){
        return "Win";
    }
}
export default App;
