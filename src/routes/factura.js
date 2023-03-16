import {Router} from "express"
import {createFacturas, deleteFacturas, getFacturas, getFactura, updateFacturas} from "../controllers/facturas.controllers.js"

const router = Router()

router.get('/facturas', getFacturas)

router.get('/facturas/:id', getFactura)

router.post('/facturas', createFacturas)

router.patch('/facturas/:id', updateFacturas)

router.delete('/facturas/:id', deleteFacturas)

export default router