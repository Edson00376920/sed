const pool = require('../lib/database');

async function authenticate(req, res, next) {
    const sessionId = req.headers.cookie?.split('sessionId=')[1];

    if (!sessionId) {
        return res.writeHead(401, { 'Content-Type': 'application/json' })
            .end(JSON.stringify({ msg: 'No autenticado' }));  
    }

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE session_id = ?', [sessionId]);
        const user = rows[0];

        if (!user) {
            return res.writeHead(403, { 'Content-Type': 'application/json' })
                .end(JSON.stringify({ msg: 'Sesión inválida o expirada' }));  
        }

        req.user = user; 
        next(); 
    } catch (error) {
        console.error(error);
        return res.writeHead(500, { 'Content-Type': 'application/json' })
            .end(JSON.stringify({ msg: 'Error en el servidor' }));  
    }
}

function authorize(roles = []) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.writeHead(403, { 'Content-Type': 'application/json' })
                .end(JSON.stringify({ msg: 'No autorizado' }));  
        }
        next(); 
    };
}

module.exports = { authenticate, authorize };
