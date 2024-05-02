INSERT INTO users (email, phone, city, municipality, street, number, password, name, last_name, enabled, created_at)
VALUES
('dulce.lorenzo@gmail.com', '5512345678', 'Estado de México', 'Atizapán de Zaragoza', 'La Cruz', 123, 'contrasena1', 'Dulce', 'Lorenzo', true, '2024-01-07'),
('ana.gomez@yahoo.com', '5523456789', 'Guadalajara', 'Zapopan', 'Juárez', 456, 'contrasena2', 'Ana', 'Gómez', true, '2024-01-07'),
('daniel.lorenzo@hotmail.com', '5534567890', 'Estado de México', 'Atizapán de Zaragoza', 'La Cruz', 789, 'contrasena3', 'Daniel', 'Lorenzo', true, '2024-01-07'),
('maria.hernandez@gmail.com', '5545678901', 'Puebla', 'Puebla', '5 de Mayo', 1011, 'contrasena4', 'María', 'Hernández', true, '2024-01-07'),
('jose.martinez@yahoo.com', '5556789012', 'Guadalajara', 'Guadalajara', 'Juárez', 1213, 'contrasena5', 'José', 'Martínez', true, '2024-01-07'),
('laura.rodriguez@hotmail.com', '5567890123', 'Ciudad de México', 'Coyoacán', 'Insurgentes', 1415, 'contrasena6', 'Laura', 'Rodríguez', true, '2024-01-07'),
('fernando.diaz@gmail.com', '5578901234', 'Monterrey', 'Monterrey', 'Colón', 1617, 'contrasena7', 'Fernando', 'Díaz', true, '2024-01-07'),
('monica.vega@yahoo.com', '5589012345', 'Puebla', 'San Andrés Cholula', 'Revillagigedo', 1819, 'contrasena8', 'Mónica', 'Vega', true, '2024-01-07'),
('eduardo.mendoza@hotmail.com', '5590123456', 'Ciudad de México', 'Iztapalapa', 'Madero', 2021, 'contrasena9', 'Eduardo', 'Mendoza', true, '2024-01-07'),
('silvia.romero@gmail.com', '5511122233', 'Guadalajara', 'Tlaquepaque', 'Independencia', 2223, 'contrasena10', 'Silvia', 'Romero', true, '2024-01-07'),
('raul.garcia@yahoo.com', '5522233344', 'Monterrey', 'San Nicolás', 'Cuauhtémoc', 2425, 'contrasena11', 'Raúl', 'García', true, '2024-01-07'),
('elena.sanchez@hotmail.com', '5533344455', 'Ciudad de México', 'Gustavo A. Madero', 'Morelos', 2627, 'contrasena12', 'Elena', 'Sánchez', true, '2024-01-07'),
('javier.ortiz@gmail.com', '5544455566', 'Puebla', 'Atlixco', 'Patria', 2829, 'contrasena13', 'Javier', 'Ortiz', true, '2024-01-07'),
('patricia.nava@yahoo.com', '5555566677', 'Guadalajara', 'Zapopan', 'Obregón', 3031, 'contrasena14', 'Patricia', 'Nava', true, '2024-01-07'),
('victor.salas@hotmail.com', '5566677788', 'Monterrey', 'San Pedro', 'Chapultepec', 3233, 'contrasena15', 'Víctor', 'Salas', true, '2024-01-07'),
('natalia.delgado@gmail.com', '5577788899', 'Ciudad de México', 'Benito Juárez', 'Universidad', 3435, 'contrasena16', 'Natalia', 'Delgado', true, '2024-01-07'),
('antonio.rosales@yahoo.com', '5588899000', 'Puebla', 'Puebla', 'Juárez', 3637, 'contrasena17', 'Antonio', 'Rosales', true, '2024-01-07'),
('gabriela.estrada@hotmail.com', '5590000111', 'Monterrey', 'San Nicolás', 'Colón', 3839, 'contrasena18', 'Gabriela', 'Estrada', true, '2024-01-07'),
('manuel.guzman@gmail.com', '5510345678', 'Ciudad de México', 'Coyoacán', 'Hidalgo', 4041, 'contrasena19', 'Manuel', 'Guzmán', true, '2024-01-07'),
('rosa.molina@yahoo.com', '5523406789', 'Guadalajara', 'Guadalajara', 'Independencia', 4243, 'contrasena20', 'Rosa', 'Molina', true, '2024-01-07');

INSERT INTO pets (name, last_name, sex, birthdate, specie, race, color, weight, size, on_register, user_id) 
VALUES 
('Harry', 'Lore', 'Macho', '2015-05-15', 'Perro', 'Bichón Boloñés', 'Blanco', 6, 'Mediano', '2024-01-26', 3),
('Hachi', 'Lore', 'Macho', '2018-05-15', 'Perro', 'Husky Siberiano', 'Blanco', 14, 'Grande', '2024-01-27', 3),
('Kira', 'Lore', 'Hembra', '2020-05-15', 'Cat', 'Raza Bonita', 'Blanca', 4.5, 'Mediano', '2024-03-26', 3),
('Nube', 'Lore', 'Hembra', '2020-05-15', 'Cat', 'Raza Tonta', 'Blanca', 3.5, 'Mediano', '2024-03-26', 1),
('Luna', 'Lore', 'Hembra', '2020-05-15', 'Cat', 'Tuxedo', 'Blanco y negro', 3.7, 'Mediano', '2024-03-26', 3),
('Luz', 'Lore', 'Hembra', '2022-05-15', 'Cat', 'Doméstico Europeo', 'Café', 3.9, 'Pequeña', '2024-03-26', 3);


INSERT INTO bills (bill_user_id, concept, invoice_number, created_at, expiration_date, total, payment_method, payment_status, discount)
VALUES
(3, 'Consulta veterinaria', 'INV2024001', '2024-03-26', '2024-04-26', 50.00, 'Tarjeta de crédito', 'Pendiente', '0%');
(3, 'Baño a mascota', 'INV2024001', '2024-03-26', '2024-04-26', 180.00, 'Efectivo', 'Finalizado', '10%');
