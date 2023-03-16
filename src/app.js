import express from "express"
import indexRoutes from "./routes/index.routes.js"
import facturaRouters from "./routes/factura.js"
//import {PORT} from "./config.js"

const app  = express()

app.use(express.json())

app.use(indexRoutes)
app.use('/api', facturaRouters)

app.use((req, res, nexxt) => {
    res.status(404).json({
        "message": "Pagina no Encontrada"
    })
})

export default app;