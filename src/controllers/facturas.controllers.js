import {pool} from "../db.js"

export const getFacturas = async (req, res) => {

try {
    const [rows] = await pool.query("SELECT * FROM factura limit 15 ")
    res.json(rows)
}catch (error){
    return res.status(500).json({
        "message" : "Ups ! Algo anda mal"
    })
}
}

export const getFactura = async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM factura where id_factura = ?", [req.params.id] )
    
    if(rows.length <= 0) return res.status(404).json({
        "message": "Factura no encontrada"
    })
    res.json(rows[0])
}

export const createFacturas = async (req, res) => {

   const  {id_cliente, id_ciudad, id_producto, annio, mes, vlraiva, iva, vlrtotal } = req.body

   const [rows] = await pool.query('INSERT INTO factura (id_cliente, id_ciudad, id_producto, annio, mes, vlraiva, iva, vlrtotal) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ',[id_cliente, id_ciudad, id_producto, annio, mes, vlraiva, iva, vlrtotal])
   res.send({
    id: rows.insertId,
    id_cliente, 
    id_ciudad, 
    id_producto, 
    annio, 
    mes, 
    vlraiva, 
    iva, 
    vlrtotal
   })
}

export const deleteFacturas = async (req, res) => {
    const [result] = await pool.query("DELETE FROM factura WHERE id_factura = ?", [req.params.id])
   
    if (result.affectedRows <= 0) return res.status(404).json({
        "message": "Factura no Encontrada"
    })

    res.sendStatus(204)
}

export const updateFacturas = async (req, res) => {
    const {id} = req.params
    const {id_cliente, id_ciudad, id_producto, annio, mes, vlraiva, iva, vlrtotal,} = req.body

    const [result] = await pool.query('UPDATE factura SET id_cliente = IFNULL(?, id_cliente), id_ciudad = IFNULL(?, id_ciudad), id_producto = IFNULL(?, id_producto), annio = IFNULL(?, annio), mes = IFNULL(?, mes), vlraiva = IFNULL(?,vlraiva), iva = IFNULL(?,iva), vlrtotal = IFNULL(?,vlrtotal)  WHERE id_factura = ?', [id_cliente, id_ciudad, id_producto, annio, mes, vlraiva, iva, vlrtotal, id])
    
    if (result.affectedRows === 0) return res.status(404).json({
        "message": "Factura no Encontrada"
    })

    const [rows] = await pool.query('SELECT * FROM factura WHERE id_factura = ?', [id])
    
    res.json(rows)
}

