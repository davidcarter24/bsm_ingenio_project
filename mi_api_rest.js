const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const config = {
    server: 'davidcito.database.windows.net', // Nombre del servidor SQL Server
    database: 'ingenio', // Nombre de la base de datos
    user: 'david', // Usuario de SQL Server
    password: 'Tambo1234@@', // Contraseña del usuario de SQL Server
    options: {
        trustServerCertificate: true // Deshabilitar la validación del certificado SSL si es necesario
    }
};

// Ruta para obtener datos desde la base de datos
app.get('/getData', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Conexión establecida correctamente');

        const result = await sql.query(`
            SELECT 
                idTicket, 
                idParcela, 
                idQuema, 
                idFletero, 
                pesoEntrada, 
                pesoSalida, 
                pesoNeto, 
                CONVERT(VARCHAR(16), fecha, 120) AS fecha 
            FROM dbo.PesoEntradaSalida order by fecha DESC
        `);

        console.log(result.recordset); // Muestra los resultados de la consulta en la consola

        res.json(result.recordset); // Devuelve los resultados como JSON
    } catch (error) {
        console.error('Error al consultar la base de datos:', error.message);
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    } finally {
        sql.close();
    }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Cachaza

app.get('/getDataCachaza', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Conexión establecida correctamente');

        const result = await sql.query(`
            SELECT 
                idTicket, 
                pesoEntrada, 
                pesoSalida, 
                CONVERT(VARCHAR(16), fecha, 120) AS fecha 
            FROM dbo.Cachaza order by fecha DESC
        `);

        console.log(result.recordset); // Muestra los resultados de la consulta en la consola

        res.json(result.recordset); // Devuelve los resultados como JSON
    } catch (error) {
        console.error('Error al consultar la base de datos:', error.message);
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    } finally {
        sql.close();
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/getDataBagazo', async (req, res) => {
    try {
        await sql.connect(config);
        console.log('Conexión establecida correctamente');

        const result = await sql.query(`
            SELECT 
                idTicket, 
                pesoEntrada, 
                pesoSalida, 
                CONVERT(VARCHAR(16), fecha, 120) AS fecha 
            FROM dbo.Bagazo order by fecha DESC
        `);

        console.log(result.recordset); // Muestra los resultados de la consulta en la consola

        res.json(result.recordset); // Devuelve los resultados como JSON
    } catch (error) {
        console.error('Error al consultar la base de datos:', error.message);
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    } finally {
        sql.close();
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/getDataPesoEntradaSalida/:id', async (req, res) => {
    const idTicket = req.params.id;
    
    try {
        await sql.connect(config);
        console.log('Conexión establecida correctamente');

        const result = await sql.query(`
            SELECT 
                idTicket, 
                idParcela, 
                idQuema, 
                idFletero, 
                pesoEntrada, 
                pesoSalida, 
                pesoNeto, 
                CONVERT(VARCHAR(16), fecha, 120) AS fecha 
            FROM dbo.PesoEntradaSalida 
            WHERE idTicket = ${idTicket}
        `);

        console.log(result.recordset); // Muestra los resultados de la consulta en la consola

        res.json(result.recordset); // Devuelve los resultados como JSON
    } catch (error) {
        console.error('Error al consultar la base de datos:', error.message);
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    } finally {
        sql.close();
    }
});


const port = 3001; // Puerto en el que tu servidor Node.js escucha las solicitudes

app.listen(port, () => {
    console.log(`API server started on port ${port}`);
});
