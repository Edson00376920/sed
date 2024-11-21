const pool = require('../lib/database.js');

class UserController {
    // Obtener datos de un usuario
    async getAllUsers(req, res) {
        if (req.user.role !== 'superadmin') {
            
            if (!res.headersSent) {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ msg: 'No autorizado' }));
            }
            return;  
        }
    
        try {
            const [rows] = await pool.query('SELECT * FROM users');
            if (!res.headersSent) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ data: rows }));
            }
        } catch (error) {
            console.error(error);

            if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ msg: 'Error en el servidor' }));
            }
        }
    }

 
    // Eliminar un usuario
async deleteUser(req, res) {

    if (req.user.role !== 'superadmin') {
        if (!res.headersSent) {
            res.writeHead(403, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'No autorizado' }));
        }
        return;  
    }

    const { username } = req.params;

    
    if (req.user.username === username) {
        if (!res.headersSent) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'No puedes eliminar tu propio usuario' }));
        }
        return;  
    }

    try {
        const [result] = await pool.execute('DELETE FROM users WHERE username = ?', [username]);

        if (result.affectedRows === 0) {
            if (!res.headersSent) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Usuario no encontrado' }));
            }
            return;  
        }

        if (!res.headersSent) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Usuario eliminado correctamente' }));
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        if (!res.headersSent) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error al eliminar usuario' }));
        }
    }
}
}

const userController = new UserController();
module.exports = { userController };
