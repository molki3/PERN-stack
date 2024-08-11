import { pool } from "../db.js";

export const getTasks = async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM task;');

    try {
        if(rows.length === 0) return res.status(404).json({message: 'Task not found'});
        return res.json(rows);
    } catch (error) {
        // Error Middleware
        next(error);
    }
}

export const getTask = async (req, res) => {
    const {id} = req.params;

    try {
        const {rows} = await pool.query(`SELECT * FROM task WHERE id='${id}';`);
        return res.json(rows[0]);
    } catch (error) {
        // Error Middleware
        next(error);
    }
}

export const createTask = async (req, res) => {
    const {title, description} = req.body

    try {
        const {rows, rowCount} = await pool.query(`INSERT INTO task (title, description) VALUES ('${title}', '${description}') RETURNING *`);

        if(rowCount === 0) return res.status(404).json({message: 'Error'}); 
        return res.json(rows[0]);
    } catch (error) {
        // Error Middleware
        next(error);
    }
}

export const deleteTask = async (req, res) => {
    const {id} = req.params;

    try {
        const {rows, rowCount} = await pool.query(`DELETE FROM task WHERE id='${id}' RETURNING *;`);

        if(rowCount === 0) return res.status(404).json({message: 'Task not found'}); 
        return res.json(rows);
    } catch (error) {
        // Error Middleware
        next(error);
    }   
}

export const updateTask = async (req, res) => {
    const {id} = req.params;
    const {title, description} = req.body;

    try {
        const {rowCount, rows} = await pool.query(`UPDATE task SET title='${title}', description='${description}' WHERE id='${id}' RETURNING *;`);

        if(rowCount === 0) return res.status(404).json({message: 'Task not found'});
        return res.json(rows[0]);
    } catch (error) {
        // Error Middleware
        next(error);
    }
}