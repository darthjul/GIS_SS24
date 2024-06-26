const http = require('http');                  // HTTP-Modul wird importiert
const express = require('express');            // Express-Modul wird importiert
const fs = require('fs');                      // File System Modul wird importiert
const port = 3000;                             // Port wird auf 3000 gesetzt

const app = express();                         // Express-Anwendung wird erstellt

const path = require('path');                  // Path-Modul wird importiert
const mariadb = require('mariadb');            // MariaDB-Modul wird importiert

const pool = mariadb.createPool({              // Verbindung zu MariaDB
    host: '127.0.0.1',
    user: 'root',
    password: '1W00k!em#+',
});

app.use(express.json());                            //ermöglicht dem Server das Nutzen von JSON-Dateien
app.use(express.static("public"));                  //bedient statische Dateien aus public
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));  //Expess sucht in public nach Templates

app.get('',(req, res) => {                          //bei localhost Anfrage wird get Anfrage an Server geschicht
    res.render ('index')                            //index wird als Antwort gerendert
})

app.put(`/api/video/new_comment`, async (req, res)=>{   //Route für HTTP Get Anfrage
    let username = req.body.name;                   //Wert aus name (siehe JavaScript.js) wird in username gespeichert
    let comment = req.body.com;                     //Wert aus com wird in comment gesp.
    console.log(""+username+""+comment+"");
    let con;
    
    try {
        con = await pool.getConnection();           //connection zu MariaDB wird hergestellt
        
        await con.query("INSERT INTO db.comments (username, comment) VALUES ('" + username + "', '" + comment + "')");
        //SQL insert fügt Kommentar in comments Tabelle der Datenbank hinzu
    }
    catch {
        
    }
    finally {                                       
        if (con) {con.end();}                       //wenn Verbindung besteht wird sie geschlossen
        res.end();                                  
}
})

app.get(`/api/video/comments`, async (req, res)=>{
    let con;

    try {
        con = await pool.getConnection();           //connection zu MariaDB wird hergestellt
        let comments = await con.query("SELECT * FROM db.comments");    //SQL Select das alle Zeilen aus comments Tabelle aus Datenbank abruft
        if (con) {con.end();}                       //prüft ob con gültige Datenbakverbindung enthält und dass sie ordnungsgemäß freigegeben und beendet wird
        res.json(comments);                         //Express Methode die Daten als JSON an Client schickt
    }

    catch {
        console.log("no Con")
    }
})
app.listen(3000, () => {
    console.log("App listening on port 3000")
})

app.delete(`/api/video/comments/:id`, async (req, res) => {
    let commentId = req.params.id;                              // ID des zu löschenden Kommentars
    let con;

    try {
        con = await pool.getConnection(); // Verbindung zu MariaDB herstellen
        await con.query("DELETE FROM db.comments WHERE id = ?", [commentId]); // Kommentar löschen
        res.sendStatus(200); // Erfolgreich gelöscht
    } catch (err) {
        console.error(err);
        res.sendStatus(500); // Fehler beim Löschen
    } finally {
        if (con) { con.end(); } // Verbindung schließen
    }
});