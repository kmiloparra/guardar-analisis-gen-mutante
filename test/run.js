console.log("entre al run");
let index = require('../dist/src/index')


const event = {
    Records:[
        {
            body:JSON.stringify(
                { 
                    "Message": "{\"dna\":[\"wwwwww\",\"wwwwww\",\"wwwwww\",\"wwwwww\",\"wwwwww\",\"wwwwww\"],\"esMutante\":\"true\"}"
                })
        }
    ]
}

console.log(JSON.stringify(event));
 index.handler(event)
.then(resultado => console.log("resultado: paso",resultado))
.catch(err => console.log("error: ",err));

// {
//     "clientId":"101010101",
//     "data":"informacion-1"
// }