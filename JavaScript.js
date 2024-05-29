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
        main.appendChild(this.div);
    }
}

var storage;
if (localStorage.getItem("form") != null) {
    storage = localStorage.getItem("form");
}

const form = document.querySelector('form');     //schaut ob Element des Typs form in document ist

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);              
    const obj = Object.fromEntries(fd);
    console.log(obj);

    
    if(storage != null){
        let comments = JSON.parse(localStorage.getItem("form"));    //wert von localStorage wird in Objekt geparst
        Object.assign(comments, {[obj.username]:obj.comment})       //neuer Kommentar wird hinzugefügt
        localStorage.setItem("form", JSON.stringify(comments));
    }
    else {
        let comments = {

        }
        Object.assign(comments, {[hilf]:obj.comment})
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
