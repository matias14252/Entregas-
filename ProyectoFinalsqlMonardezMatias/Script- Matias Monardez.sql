DROP SCHEMA IF EXISTS canino;
CREATE DATABASE canino;

USE canino;


CREATE TABLE IF NOT EXISTS tipos (
    id_tipo INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(32) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS metodos_pago (
    id_pago INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    metodo_pago VARCHAR(32) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS personas (
    id_persona INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(32) NOT NULL,
    apellido VARCHAR(32) NOT NULL,
    dni INT NOT NULL,
    email VARCHAR(32),
    fecha_nacimiento DATE
);

CREATE TABLE IF NOT EXISTS productos (
    id_producto INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(64) NOT NULL,
    id_tipo INT NOT NULL,
    precio DECIMAL(7, 2) NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES tipos(id_tipo)
);

CREATE TABLE IF NOT EXISTS ventas (
    id_ventas INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_personas INT NOT NULL,
    id_pago INT NOT NULL,
    fecha_venta DATETIME NOT NULL,
    FOREIGN KEY (id_pago) REFERENCES metodos_pago(id_pago),
     FOREIGN KEY (id_personas) REFERENCES personas(id_persona)
);

CREATE TABLE IF NOT EXISTS vendedores (
    id_vendedor INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    id_persona INT NOT NULL,
    legajo INT NOT NULL UNIQUE,
    horario VARCHAR(16) DEFAULT 'tarde',
    FOREIGN KEY (id_persona) REFERENCES personas(id_persona)
);

CREATE TABLE IF NOT EXISTS delete_vendedores (
    id_delete_vendedor INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    id_persona INT NOT NULL,
    nombre_persona VARCHAR(32) NOT NULL,
    apellido_persona VARCHAR(32) NOT NULL,
    nombre_user VARCHAR(32) NOT NULL,
    fecha DATE,
    hora TIME
);



CREATE TABLE IF NOT EXISTS precios (
    id_precio INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    nombre_producto VARCHAR(64) NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE IF NOT EXISTS producto_venta (
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES ventas(id_ventas),
     FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE IF NOT EXISTS proveedores (
    id_proveedores INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(32),
    direccion VARCHAR(100)
);




-- vista que muestra de 5 productos mas vendidos.
CREATE OR REPLACE VIEW productos_mas_vendidos AS 
	(SELECT nombre, COUNT(nombre)
    FROM productos p JOIN producto_venta pv ON (p.id_producto = pv.id_producto)
    GROUP BY nombre ORDER BY COUNT(nombre) DESC
    LIMIT 5);
    

    
    
    
    -- Vista que muestra nombre y apellido, e email de aquellos 5 personas que compraron más productos.
    
CREATE OR REPLACE VIEW cinco_personas_mas_compras AS
SELECT 
    p.nombre, 
    p.apellido, 
    p.email,
    COUNT(v.id_ventas) AS total_compras
FROM 
    ventas v 
JOIN 
    personas p ON v.id_personas = p.id_persona 
GROUP BY 
    p.id_persona
ORDER BY 
    total_compras DESC
LIMIT 5;



-- Vista que muestra la cantidad de productos vendidos por mes, en un año específico, en este caso el año 2021.

CREATE OR REPLACE VIEW cantidad_productos_vendidos_por_mes_2021 AS
SELECT 
    MONTH(v.fecha_venta) AS Mes, 
    COUNT(pv.id_producto) AS CantidadVendida
FROM 
    ventas v
JOIN 
    producto_venta pv ON v.id_ventas = pv.id_venta
WHERE 
    YEAR(v.fecha_venta) = 2021
GROUP BY 
    MONTH(v.fecha_venta)
ORDER BY 
    Mes;
    
   
    
    
DELIMITER $$

DROP FUNCTION IF EXISTS `ventas_por_año`$$
CREATE FUNCTION `ventas_por_año`(vendedor INT, año INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE cant_ventas INT;

    -- Contar las ventas del vendedor en el año especificado
    SELECT COUNT(v.id_ventas) INTO cant_ventas
    FROM ventas v
    JOIN vendedores ve ON v.id_personas = ve.id_vendedor  
    WHERE ve.id_vendedor = vendedor AND YEAR(v.fecha_venta) = año;

    RETURN cant_ventas;
END$$



-- Stored Procedures

DELIMITER $$

DROP PROCEDURE IF EXISTS `ingresar_nuevo_vendedor`$$
CREATE PROCEDURE `ingresar_nuevo_vendedor`(
    IN nombre_param VARCHAR(32), 
    IN apellido_param VARCHAR(32), 
    IN dni_param INT, 
    IN email_param VARCHAR(32), 
    IN fecha_nacimiento_param DATE, 
    IN legajo_param INT, 
    IN horario_param VARCHAR(16)
)
BEGIN
    DECLARE id_ultima_persona INT;
    DECLARE email_new VARCHAR(32);
    DECLARE fecha_nacimiento_new DATE;
    DECLARE horario_new VARCHAR(16);

    IF (nombre_param <> '') AND (apellido_param <> '') THEN
        -- Manejo del email
        IF email_param = '' THEN
            SET email_new = NULL;
        ELSE
            SET email_new = email_param;
        END IF;

        -- Manejo de la fecha de nacimiento
        IF fecha_nacimiento_param IS NULL THEN
            SET fecha_nacimiento_new = NULL;
        ELSE
            SET fecha_nacimiento_new = fecha_nacimiento_param;
        END IF;

        -- Manejo del horario
        IF horario_param = '' OR horario_param <> 'mañana' THEN
            SET horario_new = 'tarde';
        ELSE
            SET horario_new = horario_param;
        END IF;

        -- Insertar en la tabla personas
        INSERT INTO personas (id_persona, nombre, apellido, dni, email, fecha_nacimiento) VALUES
            (NULL, nombre_param, apellido_param, dni_param, email_new, fecha_nacimiento_new);
        SET id_ultima_persona = LAST_INSERT_ID();

        -- Insertar en la tabla vendedores
        INSERT INTO vendedores (id_vendedor, id_persona, legajo, horario) VALUES
            (NULL, id_ultima_persona, legajo_param, horario_new);
    END IF;
END$$

DELIMITER ;


CALL ingresar_nuevo_vendedor(
    'Juan', 
    'Pérez', 
    12345678, 
    'juan.perez@example.com', 
    NULL,               
    1001, 
    'mañana'
);

-- Triggers

DELIMITER $$
-- Trigger que registra aquellos vendedores que fueron eliminados y quedan almacenados en la tabla delete_vendedores.
DROP TRIGGER IF EXISTS `tr_delete_vendedores`$$
CREATE TRIGGER `tr_delete_vendedores` AFTER DELETE ON `vendedores` FOR EACH ROW
BEGIN
	DECLARE nomb_persona VARCHAR(32);
    DECLARE ape_persona VARCHAR(32);
    DECLARE nomb_user VARCHAR(16);
    
    SET nomb_persona = (SELECT nombre FROM personas as p WHERE OLD.id_persona = p.id_persona);
    SET ape_persona = (SELECT apellido FROM personas as p WHERE OLD.id_persona = p.id_persona);
    SET nomb_user = (SELECT USER()); 
    
	INSERT INTO `delete_vendedores` (id_persona, nombre_persona, apellido_persona, nombre_user, fecha, hora) 
    VALUES (OLD.id_persona, nomb_persona, ape_persona, nomb_user, CURRENT_DATE(), CURRENT_TIME());
END$$
DELIMITER ;



select * from delete_vendedores;

DELETE FROM vendedores
WHERE id_vendedor = 2;



-- Consultas.
select * from productos;
select * from personas;
select * from producto_venta;
select * from metodos_pago;
select * from vendedores;
select * from ventas;
select * from proveedores;


 select * from productos_mas_vendidos;
 select * from cinco_personas_mas_compras;
  select * from cantidad_productos_vendidos_por_mes_2021;
  
  SELECT ventas_por_año(1, 2021) AS total_ventas;
