const { Router } = require('express');
const router = Router();


const Usuario = require('../models/Usuario');
const Prestador = require('../models/Prestador');
const Profesion = require('../models/Profesion')

const Informe = require('../models/Informe');
const Hoja = require('../models/Hoja');
const Item = require('../models/Item');
const Subitem = require('../models/SubItem');

const Auditoria = require('../models/Auditoria');
const PlantillaInforme = require('../models/PlantillaInforme');
const Rol = require('../models/Rol');
const TipoPrestador = require('../models/TipoPrestador');

const Observacion = require('../models/Observacion');
const Seccion = require('../models/Seccion');

const Item2 = require('../models/Item2');
const midSubItem = require('../models/midSubitem');

const UGL = require('../models/UGL');
const LogInforme = require('../models/LogInforme');

const jwt = require('jsonwebtoken');

const CompInforme = require('../models/CompInforme')


const ObjectId = require('mongodb').ObjectID;

const nodemailer = require('nodemailer')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

router.post('/send_mail', (req, res) => {


        var transporter = nodemailer.createTransport({
                // host: 'smtp.ethereal.email',
                // port: 587,
                host: 'correo.pami.org.ar',
                port: 465,
                // secure: false,
                auth: {
                        user: 'jmalvarez@pami.org.ar',
                        pass: '21497349240'
                }
        })
        var mailOptions = {
                from: "yo",
                to: 'javierdiaz@pami.org.ar',
                subject: 'prueba app auditoria',
                text: 'hola'
        }
        // transporter.sendMail(mailOptions, (err, info) => {
        //         if (err) {
        //                 res.status(500).send(err.message)
        //         } else {
        //                 console.log('====================================');
        //                 console.log('mail enviado');
        //                 console.log('====================================');
        //                 res.status(200).jsonp(req.body)
        //         }
        // })
});
function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
}
router.post('/rpas', async (req, res) => {

        let { legajo } = JSON.parse(req.body.opc)
        let npass = getRandomInt(111111, 999999)
        let usuario = await Usuario.findOneAndUpdate({ legajo: legajo }, { $set: { contrasenia: npass } })
        console.log('===============req.body=====================');
        console.log(usuario.correo, npass);
        console.log('==============req.body======================');
        var transporter = nodemailer.createTransport({
                // host: 'smtp.ethereal.email',
                // port: 587,
                host: 'correo.pami.org.ar',
                port: 465,
                // secure: false,
                auth: {
                        user: 'jmalvarez@pami.org.ar',
                        pass: '21497349240'
                }
        })
        var mailOptions = {
                from: "SIGAP",
                to: usuario.correo,
                subject: 'Restablecer contraseña SIGAP - alfa',
                text: 'Estimado/a su nueva contraseña para ingresar al sistema es: ' + npass
        }
        transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                        res.status(500).send(err.message)
                } else {
                        console.log('====================================');
                        console.log('mail enviado');
                        console.log('====================================');
                        res.status(200).jsonp(req.body)
                }
        })
});
router.post('/rpas2', async (req, res) => {

        let { legajo } = JSON.parse(req.body.opc)
        let npass = getRandomInt(111111, 999999)
        let usuario = await Usuario.findOne({ legajo });
        console.log('===============req.body=====================');
        console.log(usuario, usuario.correo);
        console.log('==============req.body======================');
        var transporter = nodemailer.createTransport({
                // host: 'smtp.ethereal.email',
                // port: 587,
                host: 'correo.pami.org.ar',
                port: 465,
                // secure: false,
                auth: {
                        user: 'jmalvarez@pami.org.ar',
                        pass: '21497349240'
                }
        })

        const token = jwt.sign({ _id: usuario._id }, 'secretkey', { expiresIn: 3600 });

        var mailOptions = {
                from: "SIGAP",
                to: usuario.correo,
                subject: 'Nueva contraseña SIGAP - alfa',
                text: 'Estimado/a si usted solicito restablecer su contraseña, ingrese al siguiente link: http://' + req.headers.host + "/api/rpas/" + token + '\n\n\nEn caso contrario desestime este mail.'
        }

        console.log('====================================');
        console.log(mailOptions);
        console.log('====================================');



        transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                        res.status(500).send(err.message)
                } else {
                        let correoAsteriscos = usuario.correo.substring(0,3)+"*****"+ usuario.correo.substring(usuario.correo.indexOf("@"))
                        console.log('====================================');
                        console.log('mail enviado a '+ usuario.correo, correoAsteriscos);
                        console.log('====================================');
                        res.status(200).jsonp(correoAsteriscos)
                }
        })
});

// get para ver todas las coleciones enviadas
router.get('/rpas/:token', async (req, res) => {


        // console.log('====================================');
        // console.log('Llegaste wachoooo', req.params.token);
        // console.log('====================================');
        try {
                var payload = await jwt.verify(req.params.token, 'secretkey')
                
        } catch (error) {
                console.log('====================================');
                console.log(error);
                console.log('====================================');
        }
        if (payload) {
                console.log('=================payload===================');
                console.log(payload);
                console.log('===================payload=================');
                // res.send(`<html lang="es">

                // <head>
                //     <meta charset="UTF-8">
                //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
                //     <link rel="icon" type="image/x-icon" href="favicon.ico">
                //     <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet">
                //     <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                //     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/yeti/bootstrap.min.css">
                //     <title>Document</title>
                // </head>
                
                // <body style="   margin:0; background-color: #fafafa;">
                //     <div style="  font-size: 2rem; color:whitesmoke;  background-color: #3f51b5;">
                //         <!-- <br> -->
                //         <b>SIGAP</b>
                //         <!-- <br> -->
                //         <!-- <br> -->
                //     </div>
                //     <div style="height: 100%; margin:0;padding:0; background-color: #fafafa;">
                //         <br>
                //         <br>
                //         <form style=" background-color: #fafafa;
                //                       text-align: center;" name="myForm" action="/api/rpaspos/"
                //             onsubmit="return validateForm()">
                //             <label for="pas">Ingrese una nueva contraseña:</label>
                //             <input type="password" id="pas" name="${req.params.token}"><br><br>
                //             <label for="rpas">Repita la contraseña ingresada:</label>
                //             <input type="password" id="rpas"><br><br>
                //             <input type="submit" value="Cambiar contraseña">
                //         </form>
                //     </div>
                //     <script>
                //         function validateForm() {
                //             var pass = document.forms["myForm"]["${req.params.token}"].value;
                //             var rpass = document.getElementById("rpas").value;
                //             if (pass == "") {
                //                 alert("Debe ingresar una contraseña");
                //                 return false;
                //             }
                
                //             if (pass != rpass) {
                //                 alert("Las contraseñas ingresadas no coinciden");
                //                 return false;
                //             }
                //         }
                //     </script>
                // </body>
                
                // </html>`)
                // window.alert('asd')
                res.send(`
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap" rel="stylesheet">
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/yeti/bootstrap.min.css">
                <body style="   margin:0; background-color: #fafafa;">
                <div style="  font-size: 2rem; color:whitesmoke;  background-color: #3f51b5;"
                >
                        
                
                <b style="margin-left: 8px;">SIGAP</b> - Alfa 
              
                        
                </div>
                <div style="height: 100%; margin:0;padding:0; background-color: #fafafa;">
                        <br>
                        <br>
                        <form 
                                style=" background-color: #fafafa;
                                /*margin: 1rem;
                                        padding: 1rem;
                                        IMPORTANTE */
                                        text-align: center;" 
                                name="myForm" 
                                action="/api/rpaspos/" 
                                onsubmit="return validateForm()"
                        >
                                <label for="pas">Ingrese una nueva contraseña:</label>
                                <input type="password" id="pas" name="${req.params.token}"><br><br>
                                <label for="rpas">Repita la contraseña ingresada:</label>
                                <input type="password" id="rpas" ><br><br>
                                <input type="submit" value="Cambiar contraseña">
                        </form>
                </div>
                <script>
                function validateForm() {
                        var pass = document.forms["myForm"]["${req.params.token}"].value;
                        var rpass = document.getElementById("rpas").value;
                        if (pass == "") {
                          alert("Debe ingresar una contraseña");
                          return false;
                        }
                        
                        if (pass != rpass) {
                                alert("Las contraseñas ingresadas no coinciden");
                                return false;
                              }
                      }
                </script>
                </body>
                `
                )



                // res.sendFile(__dirname+'/pas.html')
        }



})

router.get('/rpaspos?', async (req, res) => {
        const mensaje = req.url.split('?')[1].split('=')
        // console.log('====================================');
        // console.log('venis de puta madre wachin', mensaje);
        // console.log('====================================');
        const payload = await jwt.verify(mensaje[0], 'secretkey');
        // res.send(payload._id)

        if (payload) {
                let PassEncriptada = await Usuario.encryptPassword(mensaje[1])
                let usuario = await Usuario.findOneAndUpdate({ _id: payload._id }, { $set: { contrasenia:  PassEncriptada} })
                // res.redirect('http://192.168.0.95:4200/signin')
                res.redirect('http://192.168.0.95:4200/signin')
        } else {
                res.send('Se produjo un error, por favor comuniquese con su superior inmediato')
        }

})






















router.get('/', (req, res) => {
        res.send('Bienvenido a la API del SIGAP')
});

router.post('/signup', async (req, res) => {

        const { nombre, apellido, correo, legajo, contrasenia, profesiones } = req.body;
        console.log(req.body);

        mostrar = nombre + " " + apellido

        //     console.log(nombre, apellido, correo, legajo, contrasenia, profesiones);

        const nuevoUsuario = new Usuario({ nombre, apellido, correo, legajo, contrasenia, profesiones, mostrar });
        nuevoUsuario.contrasenia = await Usuario.encryptPassword(nuevoUsuario.contrasenia);
        await nuevoUsuario.save();
        return res.status(200).send('Usuario registrado correctamente, contáctese con Marisa Rodenas (marodenas@pami.org.ar) para finalizar su registración.');
        // const token = await jwt.sign({ _id: nuevoUsuario._id }, 'secretkey');
        // res.status(200).json({ token });
});

router.post('/signin', async (req, res) => {
        const { legajo, contrasenia } = req.body;

        const user = await Usuario.findOne({ legajo });
        if (!user || legajo == null) return res.status(401).send('No se encontro al usuario');
        const matchPassword = await Usuario.comparePassword(
                contrasenia,
                user.contrasenia
                );
                
        if (!matchPassword) return res.status(401).send('Datos de usuario o contraseña incorrectos');
        // if (user.contrasenia !== contrasenia) return res.status(401).send('Datos de usuario o contraseña incorrectos');

        console.log('====================================');
        console.log('====================================');
        console.log('====================================');
        console.log(user, "-------", user.roles);
        console.log('====================================');
        console.log('====================================');
        console.log('====================================');

        if (user.roles.length != 0) {
                const token = jwt.sign({ _id: user._id }, 'secretkey', { expiresIn: 36000 });

                let aux = {}
                aux['token'] = jwt.sign({ _id: user._id }, 'secretkey', { expiresIn: 36000 });
                aux['nombre'] = user.nombre
                aux['apellido'] = user.apellido
                aux['legajo'] = user.legajo
                return res.status(200).json(aux);
        } else res.status(401).send('Usuario registrado correctamente, contáctese con Marisa Rodenas (marodenas@pami.org.ar) para finalizar su registro.');
});

router.get('/tasks', (req, res) => {
        res.json([
                {
                        _id: '1',
                        name: "Auditoria 1",
                        prestador: 'Prestador 1',
                        date: "2019-11-06T15:50:18.921Z"
                },
                {
                        _id: '2',
                        name: "Auditoria 2",
                        prestador: 'Prestador 1',
                        date: "2019-11-06T15:50:18.921Z"
                },
                {
                        _id: '3',
                        name: "Auditoria 3",
                        prestador: 'Prestador 2',
                        date: "2019-11-06T15:50:18.921Z"
                },
        ])
});





router.post('/private-tasks', verifyToken, async (req, res) => {

        const { idauditoria, fecha, estado, prestador, hojas } = req.body;
        const nInforme = new Informe({ idauditoria, fecha, estado, prestador, hojas });
        await nInforme.save();
        const token = await jwt.sign({ _id: nInforme._id }, 'secretkey');
        res.status(200).json({ token });

});

router.get('/private-tasks', verifyToken, (req, res) => {


        res.json([
                {
                        _id: '1',
                        name: "Auditoria 1",
                        prestador: 'Prestador 1',
                        date: "25/01/2020"
                },
                {
                        _id: '2',
                        name: "Auditoria 2",
                        prestador: 'Prestador 2',
                        date: "13/02/2020"
                },
                {
                        _id: '3',
                        name: "Auditoria 3",
                        prestador: 'Prestador 2',
                        date: "07/03/2020"
                },
        ])
});

async function verifyToken(req, res, next) {
        try {
                if (!req.headers.authorization) {
                        return res.status(401).send('Unauhtorized Request');
                }
                let token = req.headers.authorization.split(' ')[1];
                if (token === 'null') {
                        return res.status(401).send('Unauhtorized Request');
                }

                const payload = await jwt.verify(token, 'secretkey');
                // console.log('=================payload===================');
                // console.log(payload);
                // console.log('==================payload==================');
                if (!payload) {
                        return res.status(401).send('Unauhtorized Request');
                }

                if (req.userId != undefined) {
                        console.log('===================a=================');
                        console.log(req.userId);
                        console.log('===================a=================');
                }
                req.userId = payload._id;
                next();
        } catch (e) {
                //console.log(e)
                return res.status(401).send('Unauhtorized Request');
        }
}
async function verifyToken2(req, res, next) {
        console.log('=================verifyToken2===================');
        console.log(res.params);
        console.log('================verifyToken2====================');
        try {
                if (!req.headers.authorization) {
                        return res.status(401).send('Unauhtorized Request');
                }
                let token = req.headers.authorization.split(' ')[1];
                if (token === 'null') {
                        return res.status(401).send('Unauhtorized Request');
                }

                const payload = await jwt.verify(token, 'secretkey');
                // console.log('=================payload===================');
                // console.log(payload);
                // console.log('==================payload==================');
                if (!payload) {
                        return res.status(401).send('Unauhtorized Request');
                }

                if (req.userId != undefined) {
                        console.log('===================a=================');
                        console.log(req.userId);
                        console.log('===================a=================');
                }
                req.userId = payload._id;
                next();
        } catch (e) {
                //console.log(e)
                return res.status(401).send('Unauhtorized Request');
        }
}




router.post('/BasePrest', verifyToken, async (req, res) => {
        const { campoBusqueda } = req.body;
        console.log(campoBusqueda);

        // `/.*${campoBusqueda}.*/`
        buscar = new RegExp(".*" + campoBusqueda + ".*", "i")

        console.log(buscar);



        const prestador = await Prestador
                .find({ $or: [{ D_PRESTADOR: buscar }, { N_SAP: buscar }, { N_CUIT_CUIL: buscar }] }, { activo: true })
                .select('D_PRESTADOR N_SAP C_LOCALIDAD_PAMI C_UGL N_CUIT_CUIL')
                .limit(50);


        // const lala = await Prestador.find({ D_PRESTADOR: { $regex: '.*' + "esp" + '.*' }},{ D_PRESTADOR: 1, N_SAP: 1 });
        // console.log("lala: ",lala.length);


        console.log(`Se envian ${prestador.length} elementos`);


        res.json(prestador);




});

router.post('/prestador', verifyToken, async (req, res) => {
        const { ID } = req.body;
        console.log(ID);

        // `/.*${campoBusqueda}.*/`
        // buscar =   new RegExp(".*"+campoBusqueda+".*","i")

        // console.log(buscar);

        const prestador = await Prestador.findOne({ _id: ID });



        console.log(`Se envian ${prestador} elementos`);


        res.json(prestador);




});

/*  --------------------------------------------------------------------------------------   */
/*  --------------------------------------------------------------------------------------   */
/*  --------------------------------------------------------------------------------------   */
/*  --------------------------------------------------------------------------------------   */
/*  --------------------------------------------------------------------------------------   */
/*  --------------------------------------------------------------------------------------   */

/*  Envia un vector con el nombre de todas las colecciones de la base de datos
    Aca podrian fitrarse las que no se quieran mostrar para editar
*/
router.get('/colecciones', async (req, res) => {

        res.send(global.colecciones);

});


/*  Objeto que relaciona el nombre de las coleciones con el esquema correspondiente
        colecYesque[coleccion] = objeto de esquema

*/
const colecYesque = {
        auditorias: Auditoria,
        hojas: Hoja,
        informes: Informe,
        items: Item,
        plantillasInformes: PlantillaInforme,
        prestadores: Prestador,
        profesiones: Profesion,
        roles: Rol,
        subitems: Subitem,
        tipoPrestadores: TipoPrestador,
        usuarios: Usuario,
        // observaciones: Observacion,
        secciones: Seccion,
        // compinformes: CompInforme,
        // items2: Item2,
        // midsubitems: midSubItem,
        ugls: UGL,
        loginformes: LogInforme,
        //nuevo
}



// var objPopulate = {
//         path: "secciones.secciones",
//         populate: {
//                 path: "hojas.hojas",
//                 populate: {
//                         path: "items.items",
//                         populate: {
//                                 path: "subitems.subitems",
//                         }
//                 }
//         }
// }

function supElemArr(arr, items) {
        for (const key in items) {
                if (items.hasOwnProperty(key)) {
                        const element = items[key];
                        var i = arr.indexOf(element);
                        if (i !== -1) {
                                arr.splice(i, 1);
                        }
                }
        }

}

function supElemObj(obj, eliminar) {

        for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                        const elemento = obj[key];

                        for (const a of eliminar) {

                                if (a == key) {

                                        delete obj[key]

                                }
                        }

                }
        }
}

// get para ver todas las coleciones enviadas
router.get('/for/:base', verifyToken, async (req, res) => {

        // console.log('===============base=====================');
        // console.log(base);
        // console.log('==============base======================');

        const base = req.params.base
        if (base == undefined)
                return res.status(404)

        columnasEsquema = Object.keys(global.esquemas[colecYesque[base].modelName]['obj'])
        supElemArr(columnasEsquema, ['activo', 'contrasenia'])

        // tipo = Object.values(global.esquemas[colecYesque[base].modelName]['obj'])
        esquema = {}
        esquema = global.esquemas[colecYesque[base].modelName]['paths']

        Tipo = {}
        for (elem in esquema) {

                if (esquema[elem]['instance'] == "Array" && esquema[elem].hasOwnProperty('schema')) {

                        subColumnas = esquema[elem]['schema']['paths']

                        aux = {}
                        for (const key in subColumnas) {
                                if (subColumnas.hasOwnProperty(key)) {
                                        const i = subColumnas[key];

                                        if (key != "_id")
                                                aux[key] = i['instance']
                                }
                        }

                        Tipo[elem] = [aux]

                }
                else Tipo[elem] = esquema[elem]['instance']
        }



        supElemObj(Tipo, ['activo', '__v', 'updatedAt', 'createdAt', 'contrasenia'])





        baseBuscada = await colecYesque[base]
                .find({ activo: true }, { activo: 0, __v: 0, updatedAt: 0, createdAt: 0 })
                .limit(1000)
                .catch(error => console.log(
                        "==============ERROR=======================",
                        "==============GET=======================",
                        "==============ERROR=======================",
                        error
                )
                )
        //




        const busqueda = [
                baseBuscada,
                columnasEsquema,
                Tipo,

        ]


        // console.log('==================Tipo==================');
        // console.log(Tipo);
        // console.log('===============Tipo=====================');





        return res.status(200).json(busqueda);

});

//buscar con opciones
router.post('/opc/:base', verifyToken, async (req, res) => {

        const nElemento = req.body
        const base = req.params.base
        if (base == undefined)
                return res.status(404)

        // columnasEsquema = Object.keys(global.esquemas[colecYesque[base].modelName]['obj'])
        // supElemArr(columnasEsquema, ['activo'])

        // // tipo = Object.values(global.esquemas[colecYesque[base].modelName]['obj'])
        // esquema = {}
        // esquema = global.esquemas[colecYesque[base].modelName]['paths']

        // Tipo = {}
        // for (elem in esquema) {

        //         if (esquema[elem]['instance'] == "Array" && esquema[elem].hasOwnProperty('schema')) {

        //                 subColumnas = esquema[elem]['schema']['paths']

        //                 aux = {}
        //                 for (const key in subColumnas) {
        //                         if (subColumnas.hasOwnProperty(key)) {
        //                                 const i = subColumnas[key];

        //                                 if (key != "_id")
        //                                         aux[key] = i['instance']
        //                         }
        //                 }

        //                 Tipo[elem] = [aux]

        //         }
        //         else Tipo[elem] = esquema[elem]['instance']
        // }



        // supElemObj(Tipo, ['activo', '__v', 'updatedAt', 'createdAt'])



        console.log('====================================');
        console.log(nElemento.select);
        console.log('====================================');

        baseBuscada = await colecYesque[base]
                .find({ activo: true })//, { activo: 0, __v: 0, updatedAt: 0, createdAt: 0 }
                .select(nElemento.select)
                .limit(1000)
                .catch(error => console.log(
                        "==============ERROR=======================",
                        "==============GET=======================",
                        "==============ERROR=======================",
                        error
                )
                )
        //




        const busqueda =
                baseBuscada





        // console.log('==================Tipo==================');
        // console.log(Tipo);
        // console.log('===============Tipo=====================');





        return res.status(200).json(busqueda);

});





router.post('/for/:base', verifyToken, async (req, res) => {

        const base = req.params.base
        const nElemento = req.body

        const nuevoElemento = new colecYesque[base](nElemento)


        console.log("nElemento", nElemento);
        //     console.log("base",base);

        await nuevoElemento.save()
                .then(a => res.json(a))
                .catch(error => console.log(
                        "==============ERROR=======================",
                        "==============POST=======================",
                        "==============ERROR=======================",
                        error
                )
                )

        // res.json(nElemento)

});
router.post('/pop/:base', verifyToken, async (req, res) => {

        const base = req.params.base
        const nElemento = req.body

        if (base == undefined)
                return res.status(404)

        columnasEsquema = Object.keys(global.esquemas[colecYesque[base].modelName]['obj'])
        supElemArr(columnasEsquema, ['activo'])

        // tipo = Object.values(global.esquemas[colecYesque[base].modelName]['obj'])
        esquema = {}
        esquema = global.esquemas[colecYesque[base].modelName]['paths']

        Tipo = {}
        for (elem in esquema) {

                if (esquema[elem]['instance'] == "Array" && esquema[elem].hasOwnProperty('schema')) {

                        subColumnas = esquema[elem]['schema']['paths']

                        aux = {}
                        for (const key in subColumnas) {
                                if (subColumnas.hasOwnProperty(key)) {
                                        const i = subColumnas[key];

                                        if (key != "_id")
                                                aux[key] = i['instance']
                                }
                        }

                        Tipo[elem] = [aux]

                }
                else Tipo[elem] = esquema[elem]['instance']
        }



        supElemObj(Tipo, ['activo', '__v', 'updatedAt', 'createdAt'])





        baseBuscada = await colecYesque[base]
                .find({ activo: true }, { activo: 0, __v: 0, updatedAt: 0, createdAt: 0 })
                .limit(1000)
                .populate(nElemento)
                .catch(error => console.log(
                        "==============ERROR=======================",
                        "==============GET=======================",
                        "==============ERROR=======================",
                        error
                )
                )
        //




        const busqueda = [
                baseBuscada,
                columnasEsquema,
                Tipo,

        ]

        return res.status(200).json(busqueda);
});


function populateadaRec(object, Esquemas) {


        for (const key in object) {
                if (object.hasOwnProperty(key)) {
                        const element = object[key];
                        if (
                                typeof element == 'object'
                        ) {
                                // console.log('==================populateadaRec key=================');
                                // console.log(key);
                                // console.log('=================populateadaRec key==================');

                                /** El [0] va a joder cuando se tengan mas de un array de objetos en un objeto */
                                if (element[0][key] == "ObjectID") {
                                        // console.log("-------------------", key, "-------------------"
                                        //         , tipoEsquema(Esquemas[colecYesque[key].modelName]['paths']))
                                        Tipo = tipoEsquema(Esquemas[colecYesque[key].modelName]['paths'])

                                        return {
                                                path: key + "." + key,
                                                populate: populateadaRec(Tipo, Esquemas)
                                        }
                                }


                        }

                }
        }


        return ""
}
function populateadaCom(object, Esquemas) {
        // console.log('==================object==================');
        // console.log(object);
        // console.log('=================object===================');
        Qobjetos = {}
        for (const key1 in object) {
                if (object.hasOwnProperty(key1)) {
                        const element1 = object[key1];
                        if (
                                (element1 == 'Array'
                                        ||
                                        element1 == 'ObjectID')
                                &&
                                key1 != '_id'
                        )
                                Qobjetos[key1] = element1
                }

        }

        console.log('================Qobjetos====================');
        console.log("object", object);
        console.log("Qobjetos", Qobjetos);
        console.log('================Qobjetos====================');

        if (Qobjetos == {}) {

                return ""
        }

        aux = []

        if (Object.keys(Qobjetos).length == 1) {

                res = {

                        path: key2,
                        populate: populateadaCom(Tipo, Esquemas)

                }
                console.log('=================res===================');
                console.log(res);
                console.log('===================res=================');
                return res

        }
        else
                for (const key2 in Qobjetos) {
                        if (Qobjetos.hasOwnProperty(key2)) {
                                const element = Qobjetos[key2];
                                Tipo = tipoEsquema(Esquemas[colecYesque[key2]['modelName']]['paths'])

                                aux.push(
                                        {

                                                path: key2,
                                                populate: populateadaCom(Tipo, Esquemas)

                                        }
                                )

                        }

                }

        if (aux.length >= 1) {
                console.log('=================aux===================');
                console.log(aux);
                console.log('===================aux=================');
                return aux
        }

        // for (const key in object) {
        //         if (object.hasOwnProperty(key)) {
        //                 const element = object[key];
        //                 if (
        //                         // element == 'ObjectID'

        //                         element == 'Array'
        //                         // &&
        //                         // key != '_id'
        //                 ) {
        //                         Tipo = tipoEsquema(Esquemas[colecYesque[key]['modelName']]['paths'])
        //                         // console.log('==================colecYesque==================');
        //                         // console.log(key);
        //                         // console.log('=================colecYesque===================');
        //                         ret = {
        //                                 path: key,
        //                                 populate: populateadaCom(Tipo, Esquemas)
        //                         }

        //                         // if (ret['populate'] == '') {
        //                         //         // break
        //                         //         console.log('=================ret===================');
        //                         //         console.log(ret);
        //                         //         console.log('===============ret=====================');
        //                         // }

        //                         // else
        //                         return ret


        //                 }

        //         }
        // }


}
function populateadaCom2(object, Esquemas) {
        // console.log('==================object==================');
        // console.log(object);
        // console.log('=================object===================');


        for (const key in object) {
                if (object.hasOwnProperty(key)) {
                        const element = object[key];
                        if (
                                // element == 'ObjectID'

                                element == 'Array'
                                // &&
                                // key != '_id'
                        ) {
                                Tipo = tipoEsquema(Esquemas[colecYesque[key]['modelName']]['paths'])
                                // console.log('==================colecYesque==================');
                                // console.log(key);
                                // console.log('=================colecYesque===================');
                                ret = {
                                        path: key,
                                        populate: populateadaCom(Tipo, Esquemas)
                                }

                                // if (ret['populate'] == '') {
                                //         // break
                                //         console.log('=================ret===================');
                                //         console.log(ret);
                                //         console.log('===============ret=====================');
                                // }

                                // else
                                return ret


                        }

                }
        }


}
function populateadaCom3(object, Esquemas) {
        // console.log('==================object==================');
        // console.log(object);
        // console.log('=================object===================');
        Qobjetos = {}
        for (const key1 in object) {
                if (object.hasOwnProperty(key1)) {
                        const element1 = object[key1];
                        if (
                                (element1 == 'Array'
                                        ||
                                        element1 == 'ObjectID')
                                &&
                                key1 != '_id'
                        )
                                Qobjetos[key1] = element1
                }

        }

        console.log('================Qobjetos====================');
        console.log("object", object);
        console.log("Qobjetos", Qobjetos);
        console.log('================Qobjetos====================');

        if (Qobjetos == {}) {

                return ""
        }

        aux = []

        for (const key2 in Qobjetos) {
                if (object.hasOwnProperty(key2)) {
                        const element = object[key2];
                        Tipo = tipoEsquema(Esquemas[colecYesque[key2]['modelName']]['paths'])

                        if (Qobjetos.length == 1) {

                                res = {

                                        path: key2,
                                        populate: populateadaCom(Tipo, Esquemas)

                                }
                                console.log('=================res===================');
                                console.log(res);
                                console.log('===================res=================');
                                return res

                        }

                        aux.push(
                                {

                                        path: key2,
                                        populate: populateadaCom(Tipo, Esquemas)

                                }
                        )

                }

        }

        if (aux.length >= 1) {
                console.log('=================aux===================');
                console.log(aux);
                console.log('===================aux=================');
                return aux
        }

        // for (const key in object) {
        //         if (object.hasOwnProperty(key)) {
        //                 const element = object[key];
        //                 if (
        //                         // element == 'ObjectID'

        //                         element == 'Array'
        //                         // &&
        //                         // key != '_id'
        //                 ) {
        //                         Tipo = tipoEsquema(Esquemas[colecYesque[key]['modelName']]['paths'])
        //                         // console.log('==================colecYesque==================');
        //                         // console.log(key);
        //                         // console.log('=================colecYesque===================');
        //                         ret = {
        //                                 path: key,
        //                                 populate: populateadaCom(Tipo, Esquemas)
        //                         }

        //                         // if (ret['populate'] == '') {
        //                         //         // break
        //                         //         console.log('=================ret===================');
        //                         //         console.log(ret);
        //                         //         console.log('===============ret=====================');
        //                         // }

        //                         // else
        //                         return ret


        //                 }

        //         }
        // }


}

function tipoEsquema(esquema) {
        Tipo = {}
        for (elem in esquema) {

                if (esquema[elem]['instance'] == "Array" && esquema[elem].hasOwnProperty('schema')) {

                        subColumnas = esquema[elem]['schema']['paths']

                        aux = {}
                        for (const key in subColumnas) {
                                if (subColumnas.hasOwnProperty(key)) {
                                        const i = subColumnas[key];

                                        if (key != "_id")
                                                aux[key] = i['instance']
                                }
                        }

                        Tipo[elem] = [aux]

                }
                else Tipo[elem] = esquema[elem]['instance']
        }
        return Tipo
}

router.get('/pop/:base', verifyToken, async (req, res) => {

        const base = req.params.base
        // const nElemento = req.body

        if (base == undefined)
                return res.status(404)

        columnasEsquema = Object.keys(global.esquemas[colecYesque[base].modelName]['obj'])
        supElemArr(columnasEsquema, ['activo'])


        // tipo = Object.values(global.esquemas[colecYesque[base].modelName]['obj'])
        esquema = {}
        esquema = global.esquemas[colecYesque[base].modelName]['paths']

        Tipo = {}
        // for (elem in esquema) {

        //         if (esquema[elem]['instance'] == "Array" && esquema[elem].hasOwnProperty('schema')) {

        //                 subColumnas = esquema[elem]['schema']['paths']

        //                 aux = {}
        //                 for (const key in subColumnas) {
        //                         if (subColumnas.hasOwnProperty(key)) {
        //                                 const i = subColumnas[key];

        //                                 if (key != "_id")
        //                                         aux[key] = i['instance']
        //                         }
        //                 }

        //                 Tipo[elem] = [aux]

        //         }
        //         else Tipo[elem] = esquema[elem]['instance']
        // }

        Tipo = tipoEsquema(esquema)
        // console.log('================Tipo====================');
        // console.log(Tipo);
        // console.log('===================Tipo=================');
        supElemObj(Tipo, ['activo', '__v', 'updatedAt', 'createdAt'])
        let objPopulate3 = populateadaRec(Tipo, global.esquemas)
        // let objPopulate2 = populateadaCom(Tipo, global.esquemas)
        console.log('===================objPopulate3=================');
        console.log(objPopulate3);
        console.log('================objPopulate3====================');


        // console.log('===================TIPO2=================');
        // console.log(Tipo);
        // console.log('================TIPO2====================');
        // let aus = []
        // ausObject = []
        // for (const key in Tipo) {
        //         if (Tipo.hasOwnProperty(key)) {
        //                 const element = Tipo[key];
        //                 if (
        //                         (
        //                                 element == 'Array'
        //                                 || element == 'ObjectID'

        //                                 // || typeof element == 'object'
        //                         )
        //                         && key != "_id"
        //                 ) {
        //                         aus.push(
        //                                 {
        //                                         path: key,
        //                                         select: "mostrar"
        //                                 }
        //                         )
        //                 }

        //                 if (typeof element == 'object') {
        //                         ausObject.push(key)
        //                 }
        //         }
        // }


        // console.log('===============ausObject=====================');
        // console.log(ausObject);
        // console.log('================ausObject====================');





        baseBuscada = await colecYesque[base]
                .find({ activo: true }, { activo: 0, __v: 0, updatedAt: 0, createdAt: 0 })
                .limit(1000)
                .populate(
                        objPopulate3
                )
                .catch(error => console.log(
                        "==============ERROR=======================",
                        "==============GET POPULATE=======================",
                        "==============ERROR=======================",
                        error
                )
                )
        //

        // idObject = baseBuscada[0][ausObject].map(a => a[ausObject])
        // const baseAux = await colecYesque[ausObject].find({ "_id": { "$in": idObject } })
        // console.log('===============baseBuscada=====================-------------');
        // console.log(baseAux, "-44444444444444444444444444444-", baseBuscada);
        // console.log('================baseBuscada====================-------------');

        // for (const iterator in baseBuscada) {

        //         console.log("baseBuscada[iterator]",baseBuscada[iterator]);
        //         // if (baseBuscada.hasOwnPropertsy(iterator))
        //         for (const key in baseBuscada[iterator]) {
        //                 // console.log("KEEEEEEEEEEEYYYYY",key);
        //                 if (baseBuscada[iterator].hasOwnProperty(key)) {
        //                         const element = baseBuscada[iterator][key];

        //                         if (key == ausObject[0]) {
        //                                 console.log("hola wahchinnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", element);

        //                         }
        //                         console.log('================key ====================');
        //                         console.log("key", key," 0000000000 element",element,"00000000000 ausObject[0]", ausObject[0]);
        //                         console.log('============key ========================');
        //                         // if ( element[key] != undefined && element[key] == ausObject[0])

        //                                 // console.log("------------------------------------baseBuscada[key][ausObject]", baseBuscadaAux[key][ausObject]);

        //                         // console.log( "------------------------------------baseBuscada[key][ausObject]",baseBuscada[key]);

        //                 }
        //         }
        // }

        const busqueda = [
                baseBuscada,
                columnasEsquema,
                Tipo,

        ]

        return res.status(200).json(busqueda);
});

router.put('/for/delete/:base', verifyToken, async (req, res) => {

        const base = req.params.base
        const nElemento = req.body
        nElemento.activo = false
        console.log('================nElemento delete====================');
        console.log(nElemento);
        console.log('====================================');
        respuesta = await colecYesque[base].findOneAndUpdate({ _id: nElemento['_id'] }, nElemento)
                .catch(error => console.log(
                        "==============ERROR=======================",
                        "==============DELETE=======================",
                        "==============ERROR=======================",
                        error
                ))

        console.log("elemento act", respuesta);

        // res.json(respuesta)

        return res.status(200).json(respuesta)

});



//guardar registro
router.put('/for/:base', verifyToken, async (req, res) => {

        const base = req.params.base
        const nElemento = req.body

        // if(!nElemento.hasOwnProperty('_id'))
        //         {
        //                 nElemento['_id']= new ObjectId()
        //                 console.log('Id creado dentro de ', base);

        //         }
        // console.log('==================nElemento==================');
        // console.log(nElemento.hasOwnProperty('_id'),nElemento['_id']);
        // console.log('==================nElemento==================');

        respuesta = await colecYesque[base].findOneAndUpdate({ _id: nElemento['_id'] }, nElemento, {
                new: true,
                upsert: true // Make this update into an upsert
        })
                .catch(error => console.log(
                        "==============ERROR=======================",
                        "==============PUT=======================",
                        "==============ERROR=======================",
                        error
                ))

        console.log("respuesta,nElemento", respuesta, nElemento);

        // res.json(respuesta)

        return res.status(200).json(respuesta)


});


// actualizar informes
router.put('/reginforme/:base', verifyToken, async (req, res) => {

        const base = req.params.base
        const nElemento = req.body

        let auxEstado = {}
        let auditoria = {}

        console.log("nElemento!!!!!!!!!!!!!!!!!!!!!!!!! ", nElemento);
        if (base == 'informes') {
                informe = await colecYesque[base].findOneAndUpdate({ auditorias: nElemento['auditorias'] }, nElemento, {
                        upsert: true
                })
                        .catch(error => console.log(
                                "==============ERROR=======================",
                                "==============PUT=======================",
                                "==============ERROR=======================",
                                error
                        ))


                // if (nElemento['GDE'] == undefined || nElemento['GDE'] == '') {
                //         auxEstado['estado'] = 'En proceso'
                //         auxEstado['GDE'] = ''
                // }
                // else {
                //         auxEstado['estado'] = 'Cargada en GDE'
                //         auxEstado['GDE'] = nElemento['GDE']
                // }

                auxEstado['estado'] = nElemento['estado']

                auxEstado['cumplimiento'] = nElemento['val']



                auditoria = await Auditoria.findOneAndUpdate(
                        { _id: nElemento['auditorias'] },
                        {
                                $set: auxEstado
                        }
                )
                        .catch(error => console.log(
                                "==============ERROR=======================",
                                "==============PUT=======================",
                                "==============ERROR=======================",
                                error
                        ))
                GuardarLog("informes", nElemento, 'Actualiza')
                console.log("Guardar informe y actualizar auditoria: ", auditoria, " kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", informe);
                return res.status(200).json(informe)
        }

        if (base == 'auditorias') {

                if (nElemento['estado'] == 'Anulada') {
                        auxEstado['estado'] = 'Anulada'
                        auxEstado['activo'] = false

                        auditoria = await Auditoria.findOneAndUpdate(
                                {
                                        _id: nElemento['_id']
                                },
                                {
                                        $set: auxEstado
                                },
                                {
                                        upsert: true
                                }
                        )
                }
                else {
                        console.log('========cccccccccccccccccc============================');
                        console.log("%c", nElemento['_id'], 'color: rgb(123,25,189)');
                        console.log('======ccccccccccccc==============================');
                        if (nElemento['_id'] == undefined) {
                                nElemento['N_UGL'] = parseInt(nElemento['UGL'])
                                nElemento['UGL'] = await ponerUgl(nElemento['N_UGL'] + '')
                                auditoria = await Auditoria(nElemento)
                                auditoria.save()
                                        .then(a => res.json(a))
                        }
                        else {
                                // if (nElemento['estado'] == 'Reprogramada') {
                                nElemento['N_UGL'] = parseInt(nElemento['UGL'])
                                nElemento['UGL'] = await ponerUgl(nElemento['N_UGL'] + '')
                                // console.log('==================nElemento==================');
                                // console.log('==================nElemento==================');
                                // console.log('==================nElemento==================');
                                // console.log(nElemento);
                                // console.log('=================nElemento===================');
                                // console.log('=================nElemento===================');
                                // console.log('=================nElemento===================');

                                // }

                                // console.log('====================================');
                                // console.log();
                                // console.log('====================================');
                                auditoria = await Auditoria.findOneAndUpdate(
                                        { _id: nElemento['_id'] }, nElemento, {
                                        upsert: true
                                }
                                )
                                return res.status(200).json(auditoria)
                        }
                        // console.log('====================================');
                        // console.log(nElemento, auditoria);
                        // console.log('====================================');

                }
        }






});


router.get('/usuario', verifyToken, async (req, res) => {
        let usuario = await Usuario.findOne({ _id: req.userId }, { activo: true }).select("apellido nombre legajo profesiones mostrar ")
        // console.log('=============req.userId=======================');
        // console.log(usuario);
        // console.log('=================req.userId===================');

        res.json(usuario)

})

router.post('/getone/:base', verifyToken, async (req, res) => {

        const base = req.params.base
        const nElemento = req.body
        respuesta = await colecYesque[base].findOne({ _id: nElemento._id }, { activo: true })
        console.log('getone', respuesta);
        // res.json(respuesta)
        return res.status(200).json(respuesta)
})


router.post('/getoneopc/:base', verifyToken, async (req, res) => {

        const base = req.params.base
        const nElemento = req.body

        respuesta = await colecYesque[base].findOne(nElemento)
        // .populate(
        //         objPopulate3
        // )
        console.log('getoneopc', respuesta);
        // res.json(respuesta)
        return res.status(200).json(respuesta)
})


//bases publicas
const basesPublica = {
        profesiones: Profesion,
        ugls: UGL,
}
router.get('/pub/:base', async (req, res) => {



        // console.log('===============base=====================');
        // console.log(base);
        // console.log('==============base======================');

        const base = req.params.base
        if (base == undefined)
                return res.status(404)

        if (!basesPublica[base])
                return res.status(200).send('La base ' + base + ' no es publica')

        columnasEsquema = Object.keys(global.esquemas[basesPublica[base].modelName]['obj'])
        supElemArr(columnasEsquema, ['activo'])

        // tipo = Object.values(global.esquemas[colecYesque[base].modelName]['obj'])
        esquema = {}
        esquema = global.esquemas[basesPublica[base].modelName]['paths']

        Tipo = {}
        for (elem in esquema) {

                if (esquema[elem]['instance'] == "Array" && esquema[elem].hasOwnProperty('schema')) {

                        subColumnas = esquema[elem]['schema']['paths']

                        aux = {}
                        for (const key in subColumnas) {
                                if (subColumnas.hasOwnProperty(key)) {
                                        const i = subColumnas[key];
                                        if (key != "_id")
                                                aux[key] = i['instance']
                                }
                        }

                        Tipo[elem] = [aux]

                }
                else Tipo[elem] = esquema[elem]['instance']
        }



        supElemObj(Tipo, ['activo', '__v', 'updatedAt', 'createdAt'])





        baseBuscada = await basesPublica[base]
                .find({ activo: true }, { activo: 0, __v: 0, updatedAt: 0, createdAt: 0 })
                .limit(1000)
                .catch(error => console.log(
                        "==============ERROR=======================",
                        "==============GET=======================",
                        "==============ERROR=======================",
                        error
                )
                )
        //




        const busqueda = [
                baseBuscada,
                columnasEsquema,
                Tipo,

        ]



        return res.status(200).json(busqueda);

});


async function ponerUgl(uglRec) {
        // console.log(Ugl, Ugl.C_UGL + " - " + Ugl.D_UGL);
        if (uglRec != undefined) {
                const Ugl = await UGL.find({ C_UGL: uglRec.padStart(2, "0") })
                // console.log('==================ponerUgl==================');
                // console.log('==================ponerUgl==================');
                // console.log('==================ponerUgl==================');
                // console.log(uglRec,uglRec.padStart(2, "0"),Ugl,Ugl[0]);
                // console.log('=================ponerUgl===================');
                // console.log('=================ponerUgl===================');
                // console.log('=================ponerUgl===================');
                if (Ugl != undefined) {


                        return Ugl[0].C_UGL + " - " + Ugl[0].D_UGL
                }
                else return uglRec
        }
        else return uglRec
}

async function GuardarLog(base, nElemento, accion) {

        if (base == "informes") {
                const usuario = await Usuario.findOne({ legajo: nElemento['legajo'] })
                const informe = await Informe.findOne({ auditorias: nElemento['auditorias'] })
                const auditoria = await Auditoria.findOne({ _id: nElemento['auditorias'] })
                const loginfo = await new LogInforme({
                        usuarios: usuario['_id'],
                        informes: informe._id,
                        accion: accion,
                        estado: auditoria.estado,
                        prestador: auditoria.prestadores.D_PRESTADOR,
                        N_CUIT_CUIL: auditoria.prestadores.N_CUIT_CUIL,
                        fechaPlan: auditoria.fechaReal,
                        fechalog: new Date(),

                })
                loginfo.save()
                // console.log('==========******************========');
                // console.log("usuario",usuario)
                // console.log('====================================');
                // console.log('====================================');
                // console.log("informe",informe)
                // console.log('====================================');
                // console.log('====================================');
                // console.log("auditoria",auditoria);
                // console.log('==========*******************========');

        }

        if (base == "auditorias") {


        }

}





router.post('/dash/:base', verifyToken, async (req, res) => {

        const base = req.params.base
        const nElemento = req.body
        const opciones = JSON.parse(nElemento.opc)

        // const resultado = await colecYesque[base].aggregate([
        //         { $match : opciones.match },
        //         // { $group: opciones.group }
        //       ], function(err, contacts) {
        //       });

        const resultado = await colecYesque[base].find(opciones.match, function (err, contacts) {
        })


        console.log('====================================');
        console.log('====================================');
        console.log(base);
        console.log('====================================');
        console.log(nElemento, " aaaaaaaa ", opciones.match, " aaaaaaaa ", opciones);
        console.log('====================================');
        console.log(resultado);
        console.log('====================================');
        let columnas = opciones['select'].split(' ')
        let aux = resultado.filter(a => a.activo == true)
        reduccionColumnas = aux.map(as => {
                let auxx = {}
                columnas.forEach((f, i) => auxx[f] = as[f])
                return auxx

        })
        console.log('*****************************************');
        console.log(reduccionColumnas, columnas)



        console.log('*****************************************');
        console.log('====================================');

        res.status(200).json(reduccionColumnas)

        // const resultado = colecYesque[base].aggregate([
        //         { $match : { AgencyTranslation: /^BROADCASTING/ } },
        //         { $group: { "_id": { code: "$Code", name: "$Name" } } }
        //       ], function(err, contacts) {
        //       });




})




router.post('/cpas',verifyToken, async (req, res) => {




})







module.exports = router;


// router.get('/rpas/:token', async (req, res) => {})