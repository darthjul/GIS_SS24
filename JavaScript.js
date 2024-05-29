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
if (localStorage.getItem("form") != null) {      //wenn im localStorage bereits Eintrag mit Key "form" existiert wir dieser in storage gespeichert
    storage = localStorage.getItem("form"); 
}

const form = document.querySelector('form');     //schaut ob Element des Typs form in document ist

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);              
    const obj = Object.fromEntries(fd);         
    console.log(obj);

    
    if(storage != null){
        let comments = JSON.parse(localStorage.getItem("form"));    //Wert von localStorage wird in Objekt geparst
        Object.assign(comments, {[obj.username]:obj.comment})       //neuer Kommentar wird hinzugefügt
        localStorage.setItem("form", JSON.stringify(comments));     //aktualisierte Objekt wird zurück in den localStorage als JSON-String gespeichert
    }
    else {                                                          //Falls keine Kommentare im localStorage existieren,                                                    
        let comments = {                                            //wird ein neues Objekt erstellt, der Kommentar hinzugefügt 
        }                                                           //und im localStorage gespeichert
        Object.assign(comments, {[obj.username]:obj.comment})
        localStorage.setItem("form", JSON.stringify(comments));
    }

    window.location.href = "run.html";
})

const json = localStorage.getItem('form');
const obj = JSON.parse(json);
console.log(obj);
for (key in obj) {
    let c = new CommentBox(key, obj[key], document.getElementById("data"));
}
