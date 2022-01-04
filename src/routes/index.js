const express = require('express');
const router = express.Router();
const Task = require('../model/task');
const provedor = require('../model/provedor');
const { Users, userModel } = require('../model/usuarios');
const materiales = require('../model/materiales');
const departamentos = require('../model/departamentos');
const operaciones = require('../model/operaciones');
const productos = require('../model/productos');
const defectos = require('../model/defectos');
const modelos = require('../model/modelos');
const piezas = require('../model/piezas');
const { inspeccion_de_rec } = require('../model/inspeccion_de_rec');
const { altaPNC, altaPNC_collection } = require('../model/AltaPnc');
const inspeccion = require('../model/inspeccion_final');
const bajaPNC = require('../model/BajaPnc');
const def_proceso = require('../model/defecto_proceso');
const { inspeccionProceso, inspeccionProc_collection } = require('../model/inspeccionProceso');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { SECRET_TOKEN } = require('../config/config');
const { Mongoose } = require('mongoose');
const { Router } = require('express');

router.get('/', (req, res) => {
    res.render('SignIn');
});

router.get('/inicio/:id', async(req, res) => {
    var idUsuario = req.params.id;
    const usu = await userModel.find({ _id: idUsuario });
    res.render('Inicio', { usu });
});

router.get('/reporteOperaciones/:fechaInicio/:fechaFin/:planta/', async(req, res) => {;
    let fechaInicio = req.params.fechaInicio;
    let fechaFin = req.params.fechaFin;
    let planta = req.params.planta
    var monthArray = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

    var reportes = await inspeccionProceso.find({
        "fecha": {
            $gte: fechaInicio,
            $lte: fechaFin
        },
        planta: planta,
    }).sort({ "fecha": 1 });


    function groupBy(objectArray, property) {
        return objectArray.reduce(function(acc, obj) {
            let key = obj[property]
            if (!acc[key]) {
                acc[key] = []
            }
            acc[key].push(obj)
            return acc
        }, {})
    }

    var arr = []
    for (var i = 0; i < reportes.length; i++) {
        arr = arr.concat(reportes[i].reporte)
    }
    const output = arr.reduce((accumulator, cur) => {
        let fecha = cur.fecha;
        let operacion = cur.operacion
        let found = accumulator.find(elem => elem.fecha == fecha && elem.operacion == operacion)
        if (found) {
            found.inspeccion = found.inspeccion.concat(cur.inspeccion);
        } else accumulator.push(cur);
        return accumulator;
    }, []);

    const output2 = arr.reduce((accumulator, cur) => {
        let operacion = cur.operacion
        let found = accumulator.find(elem => elem.operacion == operacion)
        if (found) {
            found.defectos = found.defectos.concat(cur.defectos);
        } else accumulator.push(cur);
        return accumulator;
    }, []);

    reportes = []
    for (var i = 0; i < output.length; i++) {
        var inspeccion = {}
        var resultado = {}
        resultado.operacion = output[i].operacion
        var mes = output[i].fecha.substring(5, 7)
        var dia = output[i].fecha.substring(8, 10)

        resultado.fecha = monthArray[mes - 1] + " " + dia
        output[i].inspeccion.forEach(function(x) { inspeccion[x] = (inspeccion[x] || 0) + 1; });
        if (inspeccion.Rechazado == null)
            inspeccion.Rechazado = 0
        if (inspeccion.Aceptado == null)
            inspeccion.Aceptado = 0
        resultado.inspeccion = inspeccion
        reportes.push(resultado)
    }

    reporteDef = []
    for (var i = 0; i < output2.length; i++) {
        var defectos = {}
        var resultado = {}
        output2[i].defectos.forEach(function(x) { defectos[x] = (defectos[x] || 0) + 1; });
        resultado.defectos = defectos
        resultado.operacion = output2[i].operacion
        reporteDef.push(resultado)
    }

    var defectos = []
    for (var i = 0; i < reporteDef.length; i++) {
        var def = Object.getOwnPropertyNames(reporteDef[i].defectos);
        var cantidad = []
        var resultado = {}
        for (var x = 0; x < def.length; x++) {
            cantidad.push(reporteDef[i].defectos[def[x]])
        }
        resultado.operacion = reporteDef[i].operacion
        resultado.defectos = def
        resultado.cantidad = cantidad
        defectos.push(resultado)
    }
    //Agrupamos objetos por operacion
    let groupedPeople = groupBy(reportes, 'operacion')
    let groupedDef = groupBy(defectos, 'operacion')

    var operaciones = Object.getOwnPropertyNames(groupedPeople);
    reportes = groupedPeople
    var response = { reportes, operaciones, groupedDef };
    return res.status(200).json(response);
});

router.post('/editarModelo/:id', async(req, res) => {
    var id = req.params.id
    const usu = await userModel.find({ _id: id });
    let { nombre, piezas, planta } = req.body
    await modelos.updateOne({ nombre: nombre, planta: usu[0].planta }, { $set: { piezas: piezas } });
    return res.status(200).json("Exito");
});

router.post('/editarOperacion/:id', async(req, res) => {
    var id = req.params.id
    const usu = await userModel.find({ _id: id });
    let { nombre, defectos, planta } = req.body
    await operaciones.updateOne({ nombre: nombre, planta: usu[0].planta }, { $set: { defectos: defectos } });
    return res.status(200).json("Exito");
});

router.get('/graficas/:id', async(req, res) => {
    var idUsuario = req.params.id;
    const usu = await userModel.find({ _id: idUsuario });
    res.render('Graficas', { usu });
});

router.get('/super/:id', async(req, res) => {
    var idUsuario = req.params.id;
    const usu = await userModel.find({ _id: idUsuario });
    res.render('Super', { usu });
});

router.get('/prueba/', (req, res) => {
    res.render('prueba');
});

router.get('/registrar/', (req, res) => {
    res.render('registrar');
});

router.get('/recepcion/', async(req, res) => {;
    const prov = await provedor.find();
    const mat = await materiales.find();
    res.render('Recepcion', { prov, mat });
});


router.get('/index/', async(req, res) => {
    const tasks = await Task.find();
    res.render('index', { tasks });
});

router.get('/agregarProveedor/:id', async(req, res) => {;
    var idUsuario = req.params.id;
    const usu = await userModel.find({ _id: idUsuario });
    const tasks = await provedor.find();
    res.render('AgregarProveedors', { tasks, usu });
});

router.get('/agregarUsuario/:id', async(req, res) => {;
    var idUsuario = req.params.id;
    const usu = await userModel.find({ _id: idUsuario });
    const tasks = await userModel.find();
    res.render('AgregarUsuario', { tasks, usu });
});


router.get('/agregarDefecto/:id', async(req, res) => {;
    const tasks = await defectos.find();
    var idUsuario = req.params.id;
    const usu = await userModel.find({ _id: idUsuario });
    res.render('AgregarDefecto', { tasks, usu });
});

router.get('/agregarProducto/:id', async(req, res) => {;
    const tasks = await productos.find();
    var idUsuario = req.params.id;
    const usu = await userModel.find({ _id: idUsuario });
    res.render('AgregarProducto', { tasks, usu });
});

router.get('/agregarDepartamento/:id', async(req, res) => {;
    const tasks = await departamentos.find();
    var idUsuario = req.params.id;
    const usu = await userModel.find({ _id: idUsuario });
    res.render('AgregarDepartamento', { tasks, usu });
});

router.get('/agregarMaterial/:id', async(req, res) => {;
    var idUsuario = req.params.id;
    const usu = await userModel.find({ _id: idUsuario });
    const tasks = await materiales.find();
    res.render('AgregarMaterial', { tasks, usu });
});

router.get('/agregarModelo/:id', async(req, res) => {;
    var idUsuario = req.params.id;
    const usu = await userModel.find({ _id: idUsuario });
    const tasks = await modelos.find();
    const uni = await piezas.find()
    res.render('AgregarModelo', { tasks, usu, uni });
});

router.get('/agregarOperacion/:id', async(req, res) => {;
    var idUsuario = req.params.id;
    const usu = await userModel.find({ _id: idUsuario });
    const tasks = await operaciones.find();
    const uni = await defectos.find()
    res.render('AgregarOperacion', { tasks, usu, uni });
});

router.get('/agregarPieza/:id', async(req, res) => {;
    var idUsuario = req.params.id;
    const usu = await userModel.find({ _id: idUsuario });
    const tasks = await piezas.find();
    res.render('AgregarPieza', { tasks, usu });
});


router.get('/inspeccionFinal/', async(req, res) => {
    const prod = await productos.find();
    res.render('InspeccionFinal', { prod });
});

router.get('/inspeccionProceso/:id', async(req, res) => {
    idUsuario = req.params.id;
    const usu = await userModel.find({ _id: idUsuario });
    const operacion = await operaciones.find({ planta: usu[0].planta });
    const mod = await modelos.find({ planta: usu[0].planta });

    res.render('InspeccionProceso', { usu, operacion, mod });
});


router.get('/altaPNC/', async(req, res) => {
    const mod = await modelos.find();
    const oper = await operaciones.find();

    res.render('AltaPNC', { mod, oper });
});

router.get('/ajustes/', (req, res) => {
    res.render('Ajustes');
});

router.get('/bajaPNC/', async(req, res) => {
    const altpnc = await altaPNC.find();
    res.render('BajaPNC', { altpnc });
});

//Ruta para registrar
router.post('/registrar', jsonParser, function(req, res) {
    let { fName, lName, email, password, superuser, planta } = req.body;

    if (!fName || !lName || !email || !password) {
        res.statusMessage = "Hay uno o más campos faltantes";
        return res.status(406).end();
    }

    var flag = false;

    Users.getUserByEmail(email)
        .then(user => {
            if (user) {
                flag = true;
                res.statusMessage = "El usuario ya existe";
                return res.status(406).end();
            } else {
                console.log("Usuario nuevo.");
            }
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end();
        })

    if (!flag) {
        bcrypt.hash(password, 10)
            .then(hashedPassword => {
                let newUser = {
                    fName,
                    lName,
                    password: hashedPassword,
                    email,
                    superuser,
                    planta
                };

                Users
                    .createUser(newUser)
                    .then(result => {
                        return res.status(201).json(result);
                    })
                    .catch(err => {
                        res.statusMessage = err.message;
                        return res.status(400).end();
                    });
            })
            .catch(err => {
                res.statusMessage = err.message;
                return res.status(400).end();
            });
    } else {
        res.statusMessage = "El usuario ya existe.";
        return res.status(406).end();
    }
});

// Ruta para validar usuarios
router.post('/SignIn', jsonParser, function(req, res) {
    let { email, password } = req.body;

    if (!email || !password) {
        res.statusMessage = "Hay uno o más campos faltantes.";
        return res.status(406).end();
    }

    Users
        .getUserByEmail(email)
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password)
                    .then(result => {
                        if (result) {
                            let userData = {
                                fName: user.fName,
                                lName: user.lName,
                                superuser: user.superuser,
                                id: user._id
                            };

                            jsonwebtoken.sign(userData, SECRET_TOKEN, { expiresIn: '120m' }, (err, token) => {
                                if (err) {
                                    res.statusMessage = "Something went wrong with generating the token.";
                                    return res.status(400).end();
                                }
                                return res.status(200).json({ token });
                            });

                        } else {
                            throw new Error("Credenciales inválidas.");
                        }
                    })
                    .catch(err => {
                        res.statusMessage = err.message;
                        return res.status(400).end();
                    });
            } else {
                throw new Error("Credenciales inválidas.");
            }
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end();
        });
});

router.get('/user/validate-user', (req, res) => {
    const { sessiontoken } = req.headers;

    jsonwebtoken.verify(sessiontoken, SECRET_TOKEN, (err, decoded) => {
        if (err) {
            res.statusMessage = "Session expired";
            return res.status(400).end();
        }

        return res.status(200).json(decoded);
    });
});

//Ruta para mostrar usuario por correo
router.get('/user/get-user-byemail/:id', (req, res) => {
    let userEmail = req.params.id;
    Users
        .getUserByEmail(userEmail)
        .then(result => {
            if (!result) {
                res.statusMessage = `No existe el usuario con el correo ${userEmail}`;
                return res.status(404).end();
            } else {
                return res.status(200).json(result);
            }
        })
})

// Ruta para mostrar usuarios
router.get('/user/get-users', (req, res) => {
    Users
        .getUsers()
        .then(result => {
            if (!result) {
                res.statusMessage = `No existen usuarios.`;
                return res.status(404).end();
            } else
                return res.status(200).json(result);
        })
});

//Ruta para borrar usuario
router.delete('/user/delete-user/:id', (req, res) => {
        let userID = req.params.id
        Users
            .eraseUser(userID)
            .then(result => {
                return res.status(404).json(result)
            })
            .catch(err => {
                return err
            })

    }),

    //Ruta para actualizar usuarios
    router.patch('/users/update/:id', jsonParser, (req, res) => {
        console.log("Patch a profile");
        console.log(req.params);

        let idP = req.params.id;
        let idB = req.body.email;

        if (!idB) {
            res.statusMessage = "The 'id' in the body is missing.";
            return res.status(406).end();
        }

        if (idB != idP) {
            res.statusMessage = "The 'id' in the body should be the same as in the parameters.";
            return res.status(409).end();
        }

        Users
            .updateUser(req.body)
            .then(result => {
                return res.status(202).json(result);
            })
            .catch(err => {
                return err;
            })
    })

router.get('/restablecerContra/:id', async(req, res) => {;
    idUsuario = req.params.id;
    res.render('CambioContraseña', { idUsuario });
});

router.post('/restablecerContra/', async(req, res) => {
    let { id, password, } = req.body;
    if (!password) {
        res.statusMessage = "Hay uno o más campos faltantes";
        return res.status(406).end();
    }
    bcrypt.hash(password, 10)
        .then(hashedPassword => {
            hello(hashedPassword)
        })
        .catch(err => {
            res.statusMessage = err.message;
            return res.status(400).end();
        });
    async function hello(hashedPassword) {
        await userModel.updateOne({ _id: id }, { $set: { password: hashedPassword } });
    };
    return res.status(200).json("Hola");

});

// Ruta que nos permita agregar nuevas tareas que vienen desde un metodo post
router.post('/add', async(req, res) => {
    const task = new provedor(req.body);
    await task.save();
    res.redirect('back');
});

router.post('/addDefecto', async(req, res) => {
    const defecto = new defectos(req.body);
    await defecto.save();
    res.redirect('back');
});

router.post('/addMaterial', async(req, res) => {
    const material = new materiales(req.body);
    await material.save();
    res.redirect('back');
});

router.post('/addUsuario', async(req, res) => {
    const usuario = new usuarios(req.body);
    await usuario.save();
    res.redirect('back');
});

router.post('/addModelo/:id', async(req, res) => {
    const modelo = new modelos(req.body);
    await modelo.save();
    res.redirect('back');
});

router.post('/addOperacion/:id', async(req, res) => {
    const operacion = new operaciones(req.body);
    await operacion.save();
    res.redirect('back');
});

router.post('/addPieza', async(req, res) => {
    const pieza = new piezas(req.body);
    await pieza.save();
    res.redirect('back');
});

router.post('/addProducto', async(req, res) => {
    const producto = new productos(req.body);
    await producto.save();
    res.redirect('back');
});

router.post('/addDepartamento', async(req, res) => {
    const departamento = new departamentos(req.body);
    await departamento.save();
    res.redirect('back');
});



router.post('/addRecepcion/', jsonParser, function(req, res) {
    /*const recepcion = new inspeccion_de_rec(req.body);
    await recepcion.save();
    res.redirect('/inicio/');*/
    let { folio, fecha, inspector, entrada, OC, Doc_Pro, Proveedor, Material, Cantidad, Unidad, Inspeccion } = req.body;

    /*if( !folio || !fecha || !inspector || !entrada || !OC || !Doc_Pro || !Proveedor || !Material || !Cantidad || !Unidad || !Inspeccion ) {
        res.statusMessage = "Hay uno o varios campos faltantes.";
        return res.status( 406 ).end();
    }*/

    if (!folio || !fecha || !inspector || !entrada || !OC || !Doc_Pro || !Proveedor || !Material || !Cantidad || !Unidad || !Inspeccion) {
        res.statusMessage = "Falta uno o más campos por llenar.";
        return res.status(406).end();
    }

    if (isNaN(folio)) {
        res.statusMessage = "El 'folio' debe ser un numero.";
        return res.status(406).end();
    }

    if (isNaN(entrada)) {
        res.statusMessage = "La 'entrada' debe ser un numero.";
        return res.status(406).end();
    }

    if (isNaN(OC)) {
        res.statusMessage = "El 'OC' debe ser un numero.";
        return res.status(406).end();
    }

    if (isNaN(Doc_Pro)) {
        res.statusMessage = "El 'Doc_Pro' debe ser un numero.";
        return res.status(406).end();
    }

    if (isNaN(Cantidad)) {
        res.statusMessage = "La 'Cantidad' debe ser un numero.";
        return res.status(406).end();
    }

    let newInsp = {
        folio,
        fecha,
        inspector,
        entrada,
        OC,
        Doc_Pro,
        Proveedor,
        Material,
        Cantidad,
        Unidad,
        Inspeccion
    }

    inspeccion_de_rec
        .createInsp(newInsp)
        .then(result => {
            if (result.errmsg)
                return res.status(400).end();
            return res.status(201).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the Database.";
            return res.status(500).end();
        })
});

router.post('/addAltaPnc/', async(req, res) => {
    /*const altaPnc = new altaPNC(req.body);
    await altaPnc.save();
    res.redirect('/inicio/');*/
    let { folio, Fecha, Orden, Proceso, Modelo, Defectos, Cantidad, Comentarios, Retrabajo, inspector } = req.body;

    if (!folio || !Fecha || !Orden || !Proceso || !Modelo || !Defectos || !Cantidad || !Retrabajo || !inspector) {
        res.statusMessage = "Falta de llenar uno o más campos.";
        return res.status(406).end();
    }

    if (isNaN(Cantidad)) {
        res.statusMessage = "La 'Cantidad' debe ser un numero.";
        return res.status(406).end();
    }

    let newAlta = {
        folio,
        Fecha,
        Orden,
        Proceso,
        Modelo,
        Defectos,
        Cantidad,
        Comentarios,
        Retrabajo,
        inspector
    }

    altaPNC_collection
        .createAlta(newAlta)
        .then(result => {
            if (result.errmsg)
                return res.status(400).end();
            return res.status(201).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the Database.";
            return res.status(500).end();
        })
});

function checkArray(my_arr) {
    for (var i = 0; i < my_arr.length; i++) {
        if (my_arr[i] === "")
            return false;
    }
    return true;
}

function checkArrayObj(my_arr) {
    for (var i = 0; i < my_arr.length; i++) {
        if (my_arr[i].pieza === "")
            return false;
        else {
            for (var j = 0; j < my_arr[i].inspeccion.length; j++) {
                if (my_arr[i].inspeccion[j] === "")
                    return false;
            }
        }
        return true;
    }
}

router.post('/addInspeccionProceso/', async(req, res) => {
    let { nombre, fecha, fechaHora, planta, hora, folio, reporte } = req.body;


    if (!folio || !fecha || !checkArrayObj(reporte) || !hora) {
        res.statusMessage = "Falta de llenar uno o más campos.";
        return res.status(406).end();
    }

    let newInsp = {
        nombre,
        fecha,
        fechaHora,
        planta,
        hora,
        folio,
        reporte
    }

    inspeccionProc_collection
        .createInspeccion(newInsp)
        .then(result => {
            if (result.errmsg)
                return res.status(400).end();
            return res.status(201).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the Database.";
            return res.status(500).end();
        })
});

router.post('/addBajaPnc/:id', async(req, res) => {
    const bajaPnc = new bajaPNC(req.body);
    var id = req.params.id;
    await altaPNC.remove({ folio: id });
    await bajaPnc.save();
    res.redirect('/inicio/');
});

router.post('/addFinal', async(req, res) => {
    const ins = new inspeccion(req.body);
    await ins.save();
    res.redirect('/inicio/');
});


router.post('/insFinal/', async(req, res) => {
    const ins = new inspeccion(req.body);
    await ins.save();
    res.redirect('/inicio/');

});

router.post('/defProceso/', async(req, res) => {
    const def_p = new def_proceso(req.body);
    await def_p.save();
    res.redirect('/inicio/');

});


// Ruta que nos permita eliminar tareas

router.get('/delete/:id', async(req, res) => {
    var id = req.params.id;
    await provedor.remove({ _id: id });
    res.redirect('/agregarProveedor/');
});


router.get('/deleteUsuario/:id', async(req, res) => {
    var id = req.params.id;
    await userModel.remove({ _id: id });
    res.redirect('back');
});

router.get('/deleteDefecto/:id', async(req, res) => {
    var id = req.params.id;
    await defectos.remove({ _id: id });
    res.redirect('back');
});

router.get('/deleteMaterial/:id', async(req, res) => {
    var id = req.params.id;
    await materiales.remove({ _id: id });
    res.redirect('back');
});

router.get('/deleteModelo/:id', async(req, res) => {
    var id = req.params.id;
    await modelos.remove({ _id: id });
    res.redirect('back');
});

router.get('/deleteOperacion/:id', async(req, res) => {
    var id = req.params.id;
    await operaciones.remove({ _id: id });
    res.redirect('back');
});

router.get('/deletePieza/:id', async(req, res) => {
    var id = req.params.id;
    await piezas.remove({ _id: id });
    res.redirect('back');
});


router.get('/deleteProducto/:id', async(req, res) => {
    var id = req.params.id;
    await productos.remove({ _id: id });
    res.redirect('back');
});

router.get('/deleteDepartamento/:id', async(req, res) => {
    var id = req.params.id;
    await departamentos.remove({ _id: id });
    res.redirect('back');
});

router.get('/deleteAltaPnc/:id', async(req, res) => {
    var id = req.params.id;
    await altaPNC.remove({ folio: id });
    res.redirect('back');
});

router.get('/enviarvariable/:id', async(req, res) => {
    var id = req.params.id;
    const mod = await modelos.find();
    const def = await defectos.find();
    const oper = await operaciones.find();
    res.render('AltaPNC copy', { mod, def, oper });
});


router.get('/enviarFolio/:id', async(req, res) => {
    var id = req.params.id;
    const altpnc2 = await altaPNC.find({ folio: id });
    const altpnc = await altaPNC.find();

    res.render('BajaPNC copy', { altpnc2, altpnc });
});

module.exports = router;