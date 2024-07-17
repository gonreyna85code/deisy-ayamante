import React from 'react';


const BookAdmin = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí agregar lógica para subir el archivo y guardar la información en la DB
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Configurar Libros</h2>
            <div>
                <label htmlFor="title">Título del libro:</label>
                <input type="text" id="title" name="title" required />
            </div>
            <div>
                <label htmlFor="subtitle">Subtítulo del libro:</label>
                <input type="text" id="subtitle" name="subtitle" />
            </div>
            <div>
                <label htmlFor="language">Idioma:</label>
                <select id="language" name="language" required>
                    <option value="en">Inglés</option>
                    <option value="es">Español</option>
                </select>
            </div>
            <div>
                <label htmlFor="file">Subir PDF:</label>
                <input type="file" id="file" name="file" accept="application/pdf" required />
            </div>
            <button className='button' type="submit">Guardar</button>
        </form>
    )
}

export default BookAdmin;