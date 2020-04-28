import React from 'react';

class App extends React.Component{
    constructor(props) {
        super(props);
        console.log("constructor called");
        console.log(this)
        this.state = {
            games: [],
            idx: 0,
            gamesPlayed: 0,
            gamesWon: 0
        };
        this.createNewGame = this.createNewGame.bind(this);
        this.handleGameUpdate = this.handleGameUpdate.bind(this);
    }

    createNewGame(){
        console.log("Creating New Game!");
        // let game = <li key={this.state.idx}><Game handleGameUpdate ={this.state.handleGameUpdate} key={this.state.idx}/></li>;
        let games = this.state.games;
        games.push(<li key={this.state.idx}><Game handleGameUpdate = {this.handleGameUpdate} key={this.state.idx}/></li>);

        this.setState((state, props) => {
            console.log(this);
            console.log("setting state called!");
            return{
              games : games,
                idx : state.idx + 1
            };
        });
    }


    handleGameUpdate(e) {
        console.log("handle called");
        console.log(e)
        console.log(this)
        if (e.type === "play") {
            console.log("win");
            this.setState((state, props) => {
                return {
                    gamesPlayed: state.gamesPlayed + 1
                }
            });
            if (e.playerWon) {
                this.setState((state, props) => {
                    return {
                        gamesWon: state.gamesWon + 1
                    }
                });
            }
        } else {
            let gamesWon = this.state.gamesWon,
                games = this.state.games;
            if (e.type === "delete") {
                // remove the item at index
                if (games.length > 0) {
                    // remove one item at the index
                    games.splice(e.index, 1);
                }
            }

            if (e.playerWon) {
                gamesWon--;
            }
            console.log(gamesWon);
            console.log(games);
            this.setState((state) => {
                return {
                    gamesPlayed: state.gamesPlayed - 1,
                    gamesWon: gamesWon,
                    games: games
                }
            });
        }
    }

    render() {
        console.log("Render app");
        return <div>
            <h1>Rock, Paper, Scissors, Lizard, Spock with React</h1>
            <Stats gamesPlayed ={this.state.gamesPlayed} gamesWon = {this.state.gamesWon} />
            <ul>
                {this.state.games}
            </ul>
            <button onClick={this.createNewGame}> New Game </button>
        </div>;
    }
}

class Stats extends React.Component{
    render(){
        console.log("redner stats called");
        console.log(this);
        let rate = this.props.gamesPlayed ? this.props.gamesWon / this.props.gamesPlayed : 0;
        return <div>
            <span> Games Played: {this.props.gamesPlayed} |
                   Games Won: {this.props.gamesWon} |
                   Win Rate: {(rate * 100).toFixed(2)}% </span>
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
        this.notifyParentOfPlay = this.notifyParentOfPlay.bind(this);
        this.notifyParentOfDelete = this.notifyParentOfDelete.bind(this);
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
            }, this.notifyParentOfPlay);
        }
    }

    notifyParentOfPlay(){
        let playerWon = this.state.status == true;
        this.props.handleGameUpdate({
            type: "play",
            playerWon: playerWon
        });
    }

    notifyParentOfDelete(){
        let playerWon = this.state.status == true;
        this.props.handleGameUpdate({
            type: "delete",
            playerWon: playerWon,
            index: this.props.idx
        });
    }

    notifyParentOfReset(){
        let playerWon = this.state.status == true;
        this.props.handleGameUpdate({
            type: "reset",
            playerWon: playerWon
        });
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
        }, this.notifyParentOfReset);
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
                <button onClick={this.notifyParentOfDelete}> Delete </button>
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
