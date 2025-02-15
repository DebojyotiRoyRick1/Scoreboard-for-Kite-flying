/* Updated code with detailed player score display */

function requestPoint(team, playerName) {
    let opponentTeam = team === 'A' ? 'B' : 'A';
    let confirmAction = confirm("Opponent won this tangle. Accept?");
    if (confirmAction) {
        let opponentPlayers = match[opponentTeam === 'A' ? 'teamA' : 'teamB'].players;
        let opponentPlayerNames = opponentPlayers.map(player => player.name);
        
        // Create a dropdown dynamically
        let select = document.createElement("select");
        select.id = "losingPlayerSelect";
        
        opponentPlayerNames.forEach(name => {
            let option = document.createElement("option");
            option.value = name;
            option.text = name;
            select.appendChild(option);
        });
        
        let submitButton = document.createElement("button");
        submitButton.innerText = "Confirm";
        submitButton.onclick = function() {
            let selectedPlayer = select.value;
            if (selectedPlayer) {
                let teamObj = match[team === 'A' ? 'teamA' : 'teamB'];
                let opponentObj = match[opponentTeam === 'A' ? 'teamA' : 'teamB'];
                
                teamObj.score++;
                let winningPlayer = teamObj.players.find(player => player.name === playerName);
                winningPlayer.wins = (winningPlayer.wins || 0) + 1;
                
                let losingPlayer = opponentObj.players.find(player => player.name === selectedPlayer);
                losingPlayer.losses = (losingPlayer.losses || 0) + 1;
                
                document.getElementById(`team-${team.toLowerCase()}-score`).innerText = teamObj.score;
                document.getElementById(`${team}-${playerName}-score`).innerText = `(${winningPlayer.wins} Won / ${winningPlayer.losses} Lost)`;
                document.getElementById(`${opponentTeam}-${selectedPlayer}-score`).innerText = `(${losingPlayer.wins || 0} Won / ${losingPlayer.losses} Lost)`;
                
                document.body.removeChild(select);
                document.body.removeChild(submitButton);
            }
        };
        
        document.body.appendChild(select);
        document.body.appendChild(submitButton);
    }
}
