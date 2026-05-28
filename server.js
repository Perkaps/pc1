const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.post('/api/estudiante', (req, res) => {
    try {
        const estudiante = req.body;

        if (!estudiante.notas || !Array.isArray(estudiante.notas)) {
            return res.status(400).json({ error: 'El campo "notas" es requerido y debe ser un arreglo' });
        }

        const notas = estudiante.notas;

        const sumaNotas = notas.reduce((acc, nota) => acc + nota, 0);

        const promedio = sumaNotas / notas.length;

        const estadoAcademico = promedio >= 13 ? 'Aprobado' : 'Desaprobado';

        let observacion = '';
        if (promedio >= 17) {
            observacion = 'Excelente';
        } else if (promedio >= 13 && promedio <= 16.99) {
            observacion = 'Regular';
        } else {
            observacion = 'En riesgo';
        }

        const respuesta = {
            ...estudiante,               
            sumaNotas: sumaNotas,
            promedio: parseFloat(promedio.toFixed(2)),
            estadoAcademico: estadoAcademico,
            observacion: observacion
        };

        res.status(200).json(respuesta);

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Endpoint: POST http://localhost:${PORT}/api/estudiante`);
});
