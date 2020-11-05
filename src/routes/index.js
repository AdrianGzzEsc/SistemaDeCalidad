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
const defectoOperaciones = require('../model/defectoOperaciones');
const inspeccion_de_rec = require('../model/inspeccion_de_rec');
const piezaModelos = require('../model/piezaModelos');
const altaPNC = require('../model/AltaPnc');
const escuadradora = require('../model/escuadradora');
const enchapadora = require('../model/enchapadora');
const taladro = require('../model/taladro');
const sacabocados = require('../model/sacabocados');
const armado1 = require('../model/armado1');
const armado2 = require('../model/armado2');
const armado3 = require('../model/armado3');
const acabados = require('../model/acabados');
const inspeccion = require('../model/inspeccion_final');
const bajaPNC = require('../model/BajaPnc');
const def_proceso = require('../model/defecto_proceso');
const inspeccionProceso = require('../model/inspeccionProceso');
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

router.get('/inicio/', (req, res) => {
    res.render('Inicio');
});

router.get('/super/', (req, res) => {
    res.render('Super');
});

router.get('/registrar/', (req, res) => {
    res.render('registrar');
});
router.get('/graficas/', (req, res) => {
    res.render('Graficas');
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

router.get('/agregarProveedor/', async(req, res) => {;
    const tasks = await provedor.find();
    res.render('AgregarProveedors', { tasks });
});

router.get('/agregarProducto/', async(req, res) => {;
    const tasks = await productos.find();
    res.render('AgregarProducto', { tasks });
});

router.get('/agregarDepartamento/', async(req, res) => {;
    const tasks = await departamentos.find();
    res.render('AgregarDepartamento', { tasks });
});

router.get('/agregarUsuario/', async(req, res) => {;
    const tasks = await userModel.find();
    res.render('AgregarUsuario', { tasks });
});


router.get('/agregarDefecto/', async(req, res) => {;
    const tasks = await defectos.find();
    res.render('AgregarDefecto', { tasks });
});

router.get('/agregarMaterial/', async(req, res) => {;
    const tasks = await materiales.find();
    res.render('AgregarMaterial', { tasks });
});

router.get('/agregarModelo/', async(req, res) => {;
    const tasks = await modelos.find();
    res.render('AgregarModelo', { tasks });
});

router.get('/agregarPieza/', async(req, res) => {;
    const tasks = await piezas.find();
    res.render('AgregarPieza', { tasks });
});

router.get('/agregarDefectoOperacion/', async(req, res) => {;
    const tasks = await defectoOperaciones.find();
    const mod = await operaciones.find();
    const def = await defectos.find();
    res.render('AgregarDefectoOperacion', { tasks, mod, def });
});

router.get('/agregarPiezaModelo/', async(req, res) => {;
    const tasks = await piezaModelos.find();
    const mod = await modelos.find();
    const def = await piezas.find();
    res.render('AgregarPiezaModelo', { tasks, mod, def });
});


router.get('/defectosProceso/', async(req, res) => {
    const dep = await departamentos.find();
    const ope = await operaciones.find();
    const prod = await productos.find();
    const def = await defectos.find();
    res.render('DefectosEnProceso', { dep, ope, prod, def });
});

router.get('/inspeccionFinal/', async(req, res) => {
    const prod = await productos.find();
    res.render('InspeccionFinal', { prod });
});

router.get('/inspeccionProceso/', async(req, res) => {
    const ins = await inspeccionProceso.find();
    res.render('InspeccionProceso', { ins });
});

router.get('/escuadradora/', async(req, res) => {
    const ins = await escuadradora.find();
    const defOp = await defectoOperaciones.find({ operacion: "Escuadradora" });
    const mod = await modelos.find();
    const pieza = await piezas.find();

    res.render('Escuadradora', { ins, defOp, mod, pieza });
});

router.get('/enchapadora/', async(req, res) => {
    const ins = await enchapadora.find();
    const defOp = await defectoOperaciones.find({ operacion: "Enchapadora" });
    const mod = await modelos.find();
    const pieza = await piezas.find();

    res.render('Enchapadora', { ins, defOp, mod, pieza });
});

router.get('/taladro/', async(req, res) => {
    const ins = await taladro.find();
    const defOp = await defectoOperaciones.find({ operacion: "Taladro" });
    const mod = await modelos.find();
    const pieza = await piezas.find();

    res.render('Taladro', { ins, defOp, mod, pieza });
});

router.get('/sacabocados/', async(req, res) => {
    const ins = await sacabocados.find();
    const defOp = await defectoOperaciones.find({ operacion: "Sacabocados" });
    const mod = await modelos.find();
    const pieza = await piezas.find();

    res.render('Sacabocados', { ins, defOp, mod, pieza });
});

router.get('/armado1/', async(req, res) => {
    const ins = await armado1.find();
    const defOp = await defectoOperaciones.find({ operacion: "Armado1" });
    const mod = await modelos.find();
    const pieza = await piezas.find();
    res.render('Armado1', { ins, defOp, mod, pieza });
});

router.get('/armado2/', async(req, res) => {
    const ins = await armado1.find();
    const defOp = await defectoOperaciones.find({ operacion: "Armado2" });
    const mod = await modelos.find();
    const pieza = await piezas.find();
    res.render('Armado2', { ins, defOp, mod, pieza });
});

router.get('/armado3/', async(req, res) => {
    const ins = await armado1.find();
    const defOp = await defectoOperaciones.find({ operacion: "Armado3" });
    const mod = await modelos.find();
    const pieza = await piezas.find();
    res.render('Armado3', { ins, defOp, mod, pieza });
});

router.get('/acabados/', async(req, res) => {
    const ins = await armado1.find();
    const defOp = await defectoOperaciones.find({ operacion: "Acabados" });
    const mod = await modelos.find();
    const pieza = await piezas.find();
    res.render('Acabados', { ins, defOp, mod, pieza });
});

router.get('/altaPNC/', async(req, res) => {
    const mod = await modelos.find();
    const def = await defectos.find();
    const oper = await operaciones.find();
    const defOp = await defectoOperaciones.find();

    res.render('AltaPNC', { mod, def, oper, defOp });
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
    let { fName, lName, email, password, superuser } = req.body;

    if (!fName || !lName || !email || !password) {
        res.statusMessage = "Hay uno o más campos faltantes";
        return res.status(406).end();
    }

    let flag = false;

    Users.getUserByEmail(email)
        .then(user => {
            if (user) {
                flag = true;
                throw new Error("El usuario ya existe.");
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
                    superuser
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
                                superuser: user.superuser
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

// Ruta que nos permita agregar nuevas tareas que vienen desde un metodo post
router.post('/add', async(req, res) => {
    const task = new provedor(req.body);
    await task.save();
    res.redirect('/agregarProveedor/');
});

router.post('/addDefecto', async(req, res) => {
    const defecto = new defectos(req.body);
    await defecto.save();
    res.redirect('/agregarDefecto/');
});

router.post('/addMaterial', async(req, res) => {
    const material = new materiales(req.body);
    await material.save();
    res.redirect('/agregarMaterial/');
});

router.post('/addUsuario', async(req, res) => {
    const usuario = new usuarios(req.body);
    await usuario.save();
    res.redirect('/agregarUsuario/');
});

router.post('/addModelo', async(req, res) => {
    const modelo = new modelos(req.body);
    await modelo.save();
    res.redirect('/agregarModelo/');
});

router.post('/addPieza', async(req, res) => {
    const pieza = new piezas(req.body);
    await pieza.save();
    res.redirect('/agregarPieza/');
});

router.post('/addProducto', async(req, res) => {
    const producto = new productos(req.body);
    await producto.save();
    res.redirect('/agregarProducto/');
});

router.post('/addDepartamento', async(req, res) => {
    const departamento = new departamentos(req.body);
    await departamento.save();
    res.redirect('/agregarDepartamento/');
});

router.post('/addDefectoOperacion', async(req, res) => {
    const defectoOp = new defectoOperaciones(req.body);
    await defectoOp.save();
    res.redirect('/agregarDefectoOperacion/');
});

router.post('/addRecepcion', async(req, res) => {
    const recepcion = new inspeccion_de_rec(req.body);
    await recepcion.save();
    res.redirect('/inicio/');
});

router.post('/addAltaPnc', async(req, res) => {
    const altaPnc = new altaPNC(req.body);
    await altaPnc.save();
    res.redirect('/inicio/');
});

router.post('/addInspeccionProceso', async(req, res) => {
    const defecto = new inspeccionProceso(req.body);
    const escuad = new escuadradora(req.body);
    const enchap = new enchapadora(req.body);
    const tal = new taladro(req.body);
    const sac = new sacabocados(req.body);
    const ar1 = new armado1(req.body);
    const ar2 = new armado2(req.body);
    const ar3 = new armado3(req.body);
    const aca = new acabados(req.body);

    await defecto.save();
    await escuad.save();
    await enchap.save();
    await tal.save();
    await sac.save();
    await ar1.save();
    await ar2.save();
    await ar3.save();
    await aca.save();

    res.redirect('/escuadradora/');
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

router.post('/addEscuadradora/:id', async(req, res) => {
    var id = req.params.id
    await escuadradora.update({ folio: id }, req.body);
    res.redirect('/enchapadora/');
});

router.post('/addTaladro/:id', async(req, res) => {
    var id = req.params.id
    await taladro.update({ folio: id }, req.body);
    res.redirect('/sacabocados/');
});

router.post('/addSacabocados/:id', async(req, res) => {
    var id = req.params.id
    await sacabocados.update({ folio: id }, req.body);
    res.redirect('/armado1/');
});

router.post('/addEnchapadora/:id', async(req, res) => {
    var id = req.params.id
    await enchapadora.update({ folio: id }, req.body);
    res.redirect('/taladro/');
});

router.post('/addArmado1/:id', async(req, res) => {
    var id = req.params.id
    await armado1.update({ folio: id }, req.body);
    res.redirect('/armado2/');
});

router.post('/addArmado2/:id', async(req, res) => {
    var id = req.params.id
    await armado2.update({ folio: id }, req.body);
    res.redirect('/armado3/');
});

router.post('/addArmado3/:id', async(req, res) => {
    var id = req.params.id
    await armado3.update({ folio: id }, req.body);
    res.redirect('/acabados/');
});

router.post('/addAcabados/:id', async(req, res) => {
    var id = req.params.id
    await acabados.update({ folio: id }, req.body);
    res.redirect('/inicio/');
});

router.post('/addPiezaModelo', async(req, res) => {
    const defecto = new piezaModelos(req.body);
    await defecto.save();
    res.redirect('/agregarPiezaModelo/');
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

// Ruta para editar los datos
router.get('/edit/:id', async(req, res) => {
    const task = await Task.findById(req.params.id);
    res.render('Ajustes', { task });
});

// Ruta para actualizar los datos
router.post('/edit/:id', async(req, res) => {
    var id = req.params.id;
    await Task.update({ _id: id }, req.body);
    res.redirect('/');
});

// Esta ruta permita modificar el estatus de una tarea por medio de su propiedad status.
router.get('/turn/:id', async(req, res, next) => {
    let { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
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
    res.redirect('/agregarUsuario/');
});

router.get('/deleteDefecto/:id', async(req, res) => {
    var id = req.params.id;
    await defectos.remove({ _id: id });
    res.redirect('/agregarDefecto/');
});

router.get('/deleteMaterial/:id', async(req, res) => {
    var id = req.params.id;
    await materiales.remove({ _id: id });
    res.redirect('/agregarMaterial/');
});

router.get('/deleteProducto/:id', async(req, res) => {
    var id = req.params.id;
    await productos.remove({ _id: id });
    res.redirect('/agregarProducto/');
});

router.get('/deleteDepartamento/:id', async(req, res) => {
    var id = req.params.id;
    await departamentos.remove({ _id: id });
    res.redirect('/agregarDepartamento/');
});

router.get('/deleteMaterial/:id', async(req, res) => {
    var id = req.params.id;
    await materiales.remove({ _id: id });
    res.redirect('/agregarMaterial/');
});

router.get('/deleteModelo/:id', async(req, res) => {
    var id = req.params.id;
    await modelos.remove({ _id: id });
    res.redirect('/agregarModelo/');
});

router.get('/deletePieza/:id', async(req, res) => {
    var id = req.params.id;
    await piezas.remove({ _id: id });
    res.redirect('/agregarPieza/');
});

router.get('/deleteDefectoOperacion/:id', async(req, res) => {
    var id = req.params.id;
    await defectoOperaciones.remove({ _id: id });
    res.redirect('/agregarDefectoOperacion/');
});

router.get('/deletePiezaModelo/:id', async(req, res) => {
    var id = req.params.id;
    await piezaModelos.remove({ _id: id });
    res.redirect('/agregarPiezaModelo/');
});

router.get('/deleteAltaPnc/:id', async(req, res) => {
    var id = req.params.id;
    await altaPNC.remove({ folio: id });
    res.redirect('/addBajaPnc');
});

router.get('/enviarvariable/:id', async(req, res) => {
    var id = req.params.id;
    const mod = await modelos.find();
    const def = await defectos.find();
    const oper = await operaciones.find();
    const acabados = await defectoOperaciones.find({ operacion: id });
    res.render('AltaPNC copy', { acabados, mod, def, oper });
});

/*
router.get('/enviarvariable', async(req, res) => {
    var id2 = req.header.
    var id = req.params.id;
    const mod = await modelos.find();
    const def = await defectos.find();
    const oper = await operaciones.find();
    const acabados = await defectoOperaciones.find({ operacion: id });
    res.render('AltaPNC copy', { acabados, mod, def, oper });
})
*/

router.get('/enviarFolio/:id', async(req, res) => {
    var id = req.params.id;
    const altpnc2 = await altaPNC.find({ folio: id });
    const altpnc = await altaPNC.find();

    res.render('BajaPNC copy', { altpnc2, altpnc });
});

module.exports = router;