//Todas tienen que pasar por la validacion del JWT

const { Router } = require("express");
const { check } = require("express-validator");
const { getEventos, crearEvento , actualizarEvento, eliminarEvento} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();
router.use(validarJWT);
//Obtener Eventos
router.get('/',  getEventos);


//Crear un nuevo Evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de Inicio es obligatoria').custom(isDate),
        check('end','Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],

    crearEvento
);

//Actualizar un Evento
router.put('/:id', actualizarEvento);

//Borrar un Evento
router.delete('/:id', eliminarEvento);

module.exports = router; 