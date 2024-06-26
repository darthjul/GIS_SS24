class CommentBox {
    constructor(id, username, comment, main) {
        this.id = id;
        this.div = document.createElement("div");
        this.div.className = "comment";
        
        this.user = document.createElement("p");
        this.user.textContent = "User: " + username;
        
        this.com = document.createElement("p");
        this.com.textContent = "" + comment;
        
        this.deleteButton = document.createElement("button");
        this.deleteButton.textContent = "Delete";
        this.deleteButton.className = "delete-button";
        this.deleteButton.onclick = () => {
            this.deleteComment(id, main);
        };

        this.div.appendChild(this.user);
        this.div.appendChild(document.createElement("br"));
        this.div.appendChild(this.com);
        this.div.appendChild(this.deleteButton);
        
        main.appendChild(this.div);
    }
    async deleteComment(id, main) {
        try {
            const response = await fetch(`/api/video/comments/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                main.removeChild(this.div); 
            } else {
                console.error('Failed to delete comment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

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
            new CommentBox(item.id, item.username, item.comment, document.getElementById("data"));
        }) 
    }
    fetchData();
}
getData();

form.addEventListener('submit', async (e) => {                              //reagiert auf Absenden des Kommentars
    e.preventDefault();                                                     //verhindert neuladen
    const fd = new FormData(form);                                          //sammelt Daten aus form (enthält username und comment)
    const obj = Object.fromEntries(fd);                                     //wird in Objekt umgewandelt
    console.log(JSON.stringify({name: obj.username, com: obj.comment}));
    
    
    try {
        const response = await fetch(`/api/video/delete_comment`, {           
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

