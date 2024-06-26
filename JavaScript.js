class CommentBox {
    constructor(username, comment, main) {
        this.div = document.createElement("div");
        this.div.className = "comment";
        this.user = document.createElement("p");
        this.user.textContent = "Username: " + username;
        this.br = document.createElement("br");
        this.com = document.createElement("p");
        this.com.textContent = "" + comment;
        
        this.div.appendChild(this.user);
        this.div.appendChild(this.br);
        this.div.appendChild(this.com);
        main.appendChild(this.div);         //div wird mit user, br und com angelegt die in main zusammengefasst werden
    }
}

var storage;
/*if (localStorage.getItem("form") != null) {      //wenn im localStorage bereits Eintrag mit Key "form" existiert wir dieser in storage gespeichert
    storage = localStorage.getItem("form"); 
}*/

const form = document.querySelector('form');                                //selektiert erstes Forular-Element

form.addEventListener('submit', async (e) => {                              //reagiert auf Absenden des Kommentars
    e.preventDefault();                                                     //verhindert neuladen
    const fd = new FormData(form);                                          //sammelt Daten aus form (enthält username und comment)
    const obj = Object.fromEntries(fd);                                     //wird in Objekt umgewandelt
    console.log(JSON.stringify({name: obj.username, com: obj.comment}));
    
    
    try {
        const response = await fetch(`/api/video/new_comment`, {           
            method: 'PUT',                                                  //Methode Put für Anfrage
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: obj.username, com: obj.comment})    //Konvertiert obj-Objekt in JSON String und sendet es an Anfrage
          });
    }
    catch{

    }
    window.location.href = "run.html";                                      
})

function getData(){
    const fetchData = async () => {                                         //funktion mit name fetchData
        try {
            const response = await fetch(`/api/video/comments`);            //enthält alle Zeilen aus comments Tabelle aus Datenbank
            const Data = await response.json();                             //await: multithreat nicht singlethreat
            loadContent(Data);
        }
        catch {  
        }
    }

    const loadContent = (data) => {
        console.log(data);
        data.forEach(item => {
            console.log(item.username);
            new CommentBox(item.username, item.comment, document.getElementById("data"));
        }) 
    }
    fetchData();
}
getData();
