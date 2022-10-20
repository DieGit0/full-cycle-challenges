const mysql   = require('mysql')
const express = require('express')
const app     = express()
const port    = 3000

const pool = mysql.createPool({
    connectionLimit : 100,
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
});

values = [
  ["1 - Marvin Gaye, 'What's Going On' (1971)"]           ,
  ["2 - The Beach Boys, 'Pet Sounds' (1966)"]             ,
  ["3 - Joni Mitchell, 'Blue' (1971)"]                    ,
  ["4 - Stevie Wonder, 'Songs in the Key of Life' (1976)"],
  ["5 - The Beatles, 'Abbey Road' (1969)"]                ,
  ["6 - Nirvana, 'Nevermind' (1991)"]                     ,
  ["7 - Fleetwood Mac, 'Rumours' (1977)"]                 ,
  ["8 - Prince and the Revolution, 'Purple Rain' (1984)"] ,
  ["9 - Bob Dylan, 'Blood on the Tracks' (1975)"]         ,
  ["10 - Lauryn Hill, 'The Miseducation of Lauryn Hill' (1998)"]];  

function addRow(data) {
  let insertQuery = 'INSERT INTO ?? (??) VALUES ?';
  let query = mysql.format(insertQuery,["album", "name", values]);  
  pool.query(query,(err, response) => {
      if(err) {
          console.error(err);
          return;
      }
      console.log(response); 
      getRow();
      pool.close;
  });
}
      addRow(values);

function getRow(){
pool.query("SELECT * FROM album",(err, data) => {
    if(err) {
        console.error(err);
        return;
    }

    albumListHTML = ''
    data.forEach(album => {   
         albumListHTML =  albumListHTML + `<tr><td>${album.name}</td></tr>`
         console.log(albumListHTML)   
    });

app.get('/', (req,res) => {
    res.send(
        `<style>
            table, th, td {background-color:azure; border:1px solid black;}
            h1 {background-color:black; color:gold;text-align:center;}
        </style>
            <body style="background-color:Azure;">

                <p> <h1 style="width:30%"> Full Cycle Rocks! </h1> </p>

                <p> <h3 style="color:black;"> Top 10 Greatest Albums of All Time, according to Rolling Stone: </h3> </p>

                <p> <a href="https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/lauren-hill-the-miseducation-of-lauryn-hill-1063223/">The 500 Greatest Albums of All Time – Rolling Stone</a> <p>
      
                <table style="width:30%">
                  <tr>
                    <th>Name</th>
                  </tr>
                    ${albumListHTML}
                </table>

            </body>
        `)
    })
});
}

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})