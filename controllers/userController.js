import noteModel from "../models/userModel.js";

const getNotes = async (req, res) => {
    try {
        const notas = await noteModel.getAll();
        res.status(200).json({ success: true, data: notas });
    } catch (error) {
        console.error("Error al obtener notas:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const createNote = async (req, res) => {
    try {
        const titulo = req.body.titulo || req.body.title;
        const contenido = req.body.contenido || req.body.content;
        const categoria = req.body.categoria || req.body.category;

        if (!titulo || !contenido) {
            return res.status(400).json({ success: false, message: "Título y contenido son requeridos" });
        }

        const result = await noteModel.create(titulo, contenido, categoria);
        res.status(201).json({ success: true, message: "Nota creada exitosamente", id: result.insertId });
    } catch (error) {
        console.error("Error al crear la nota:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const titulo = req.body.titulo || req.body.title;
        const contenido = req.body.contenido || req.body.content;
        const categoria = req.body.categoria || req.body.category;

        if (!titulo || !contenido) {
            return res.status(400).json({ success: false, message: "Título y contenido son requeridos" });
        }

        const updatedNote = await noteModel.update(id, titulo, contenido, categoria);

        if (!updatedNote) {
            return res.status(404).json({ success: false, message: "Nota no encontrada" });
        }

        res.status(200).json({ success: true, message: "Nota actualizada exitosamente", data: updatedNote });
    } catch (error) {
        console.error("Error al actualizar la nota:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await noteModel.remove(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Nota no encontrada" });
        }
        res.status(200).json({ success: true, message: "Nota eliminada" });
    } catch (error) {
        console.error("Error al eliminar la nota:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export default { getNotes, createNote, updateNote, deleteNote };