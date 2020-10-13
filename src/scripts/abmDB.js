const Usuario = require('../models/Usuario');

const bcrypt = require("bcryptjs");


exports.encriptarContrasenias = async () => {

    try {
        
        // const usuariosDB = await Usuario.find()
        // console.log('====================================');
        // let aux = await Promise.all (usuariosDB.map( async (unUsuariosDB) => {
        //     let passCrypt= await Usuario.encryptPassword(unUsuariosDB.contrasenia)
        //     await Usuario.findOneAndUpdate({
        //         _id: unUsuariosDB._id
        //     },{
        //         $set: {contrasenia: passCrypt}
        //     })
        // }))
        // const pass = await Usuario.encryptPassword('123456Aa')
        // console.log(aux);
        // console.log('comparePassword',await Usuario.comparePassword('123456Aa',pass));
        // console.log('====================================');
    } catch (error) {
        console.log('===================error=================');
        console.log(error);
        console.log('===============error=====================');
    }

};

exports.verBcrypt = async () => {
    try {
        
    } catch (error) {
        console.log('===================error=================');
        console.log(error);
        console.log('==============error======================');
    }
}
// module.exports = encriptarContrasenias