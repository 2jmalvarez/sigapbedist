const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://juan:juan@elcluster-r0s4h.mongodb.net/angular-auth?retryWrites=true&w=majority', {
// mongoose.connect('mongodb://localhost/angular-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(db => {
        console.log('------------El mongo esta conectado------------')
        global.colecciones= Object.keys( db.connections[0]['collections'])
        
        // console.log(global.colecciones);
        // modelos = Object.keys(db.connections[0]['base']['modelSchemas']['Subitem'])
        global.esquemas = db.connections[0]['base']['modelSchemas']//['Subitem']['obj']
        // console.log(modelos);
    })
    .catch(err => console.log(err));


    // db.ugls.update(
    //     {},
    //     { $set:{ activo:true } },
    //     {
    //       upsert: true,
    //       multi: true,
     
    //     }
    //  )
