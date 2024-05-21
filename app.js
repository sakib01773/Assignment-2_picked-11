fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=a`)
    .then(res => res.json())
    .then(data => loadPlayer(data.player))


const loadPlayer = (player) => {
    const container = document.getElementById("sakib")
    player.slice(0, 10).forEach(player => {
        const imageUrl = player?.strThumb ? player.strThumb : 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSRQCofu0UtuyxSzTgozeorI-HO_EKt2LXJYUBIPr4dvj9oEMOR';
        const div = document.createElement("div")
        div.innerHTML =
            `<div id="sakib-cart " class="card " style="width: 18rem;">
     <img src="${imageUrl}" class="card-img-top" alt="no image">
     <div class="card-body">
       <h5 class="card-title">${player.idPlayer}</h5>
       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
     </div>
     <ul class="list-group list-group-flush">
       <li class="list-group-item">${player.strPlayer}</li>
       <li class="list-group-item">${player.strNationality}</li>
     </ul>
     <div class="card-body">
        <button type="button" class="btn btn-primary" onclick="showPlayerDetails('${player.idPlayer}')">Details</button>
        <button type="button" class="btn btn-info" onclick="handleAddcart('${player.strPlayer}')">Add to team</button>
     </div>
    </div>`;
        container.appendChild(div);

    });

}

const search_show = () => {

    const inputvalue = document.getElementById("search-place").value;
    console.log(inputvalue);

    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${inputvalue}`)
        .then(res => res.json())
        .then(data => displayPlayer(data.player))


    const container = document.getElementById("sakib")
    container.innerHTML = "";
    const displayPlayer = (player) => {



        player.forEach(player => {
            const imageUrl = player?.strThumb ? player.strThumb : 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSRQCofu0UtuyxSzTgozeorI-HO_EKt2LXJYUBIPr4dvj9oEMOR';
            const div = document.createElement("div")
            div.innerHTML =
                `<div id="sakib-cart " class="card " style="width: 18rem;">
             <img src="${imageUrl}" class="card-img-top" alt="no image">
             <div class="card-body">
               <h5 class="card-title">${player.idPlayer}</h5>
               <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
             </div>
             <ul class="list-group list-group-flush">
               <li class="list-group-item">${player.strPlayer}</li>
               <li class="list-group-item">${player.strNationality}</li>
             </ul>
             <div class="card-body">
             <button type="button" class="btn btn-primary" onclick="showPlayerDetails('${player.idPlayer}')">Details</button>
             <button type="button" class="btn btn-info" onclick="handleAddcart('${player.strPlayer}')">Add to team</button>
             </div>
            </div>`;
            container.appendChild(div);


        });

    }


}

const handleAddcart = (name) => {
    const cartcount = document.getElementById("count-player").innerText;
    let convertcount = parseInt(cartcount);
    if (convertcount < 11) {
        convertcount += 1;
        document.getElementById("count-player").innerText = convertcount;
        const cardcontainer = document.getElementById("cart-container")
        const li = document.createElement("li")
        li.innerHTML = ` ${name}`
        cardcontainer.appendChild(li);

    } else {
        alert("Sorry You Can Not Add More than 11 player.")
    }


}

const showPlayerDetails = (playerId) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${playerId}`)
        .then(res => res.json())
        .then(data => {
            const player = data.players[0];
            const imageUrl = player?.strThumb ? player.strThumb : 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSRQCofu0UtuyxSzTgozeorI-HO_EKt2LXJYUBIPr4dvj9oEMOR';
            const playerDetails = `
                <h5>${player.strPlayer}</h5>
                <img src="${imageUrl}" class="img-fluid" alt="Player image">
                <p><strong>Nationality:</strong> ${player.strNationality}</p>
                <p><strong>Team:</strong> ${player.strTeam}</p>
                <p><strong>Description:</strong> ${player.strDescriptionEN}</p>
            `;
            document.getElementById("player-details").innerHTML = playerDetails;
            new bootstrap.Modal(document.getElementById('playerModal')).show();
        });
}