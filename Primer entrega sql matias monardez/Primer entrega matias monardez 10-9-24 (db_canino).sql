DROP SCHEMA IF EXISTS canino;
create database  canino;

Use canino ; 

CREATE TABLE IF NOT EXISTS productos (
	id_producto INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(64) NOT NULL,
    id_tipo INT NOT NULL,
    precio DECIMAL (7, 2) NOT NULL,
    FOREIGN KEY(id_tipo) REFERENCES tipos(id_tipo)
);
CREATE TABLE if not exists  tipos (
	id_tipo INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(32) NOT NULL UNIQUE
);
create table ventas (
id_ventas int not null auto_increment primary key , 
id_cliente int not null , 
id_pago int not null , 
fecha_venta datetime not null,
    FOREIGN KEY(id_pago) REFERENCES metodos_pago(id_pago)
);

CREATE TABLE  personas (
	id_persona INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(32) NOT NULL,
    apellido VARCHAR(32) NOT NULL,
    dni INT NOT NULL,
    email VARCHAR(32),
    fecha_nacimiento DATE
);

CREATE TABLE IF NOT EXISTS metodos_pago (
	id_pago INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    metodo_pago VARCHAR(32) NOT NULL UNIQUE
);

create table proveedores (
id_proveedores int primary key auto_increment , 
nombre varchar (32),
direccion varchar (100)
);

CREATE TABLE IF NOT EXISTS clientes (
	id_cliente INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    id_persona INT NOT NULL,
    newsletter BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY(id_persona) REFERENCES personas(id_persona)
);

CREATE TABLE IF NOT EXISTS precios (
	id_precio INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    nombre_producto  VARCHAR(64) NOT NULL
    
);

CREATE TABLE IF NOT EXISTS producto_venta (
	id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    FOREIGN KEY(id_venta) REFERENCES ventas(id_ventas),
    FOREIGN KEY(id_producto) REFERENCES productos(id_producto)
);

-- vista que muestra de 5 productos mas vendidos.
CREATE OR REPLACE VIEW productos_mas_vendidos AS 
	(SELECT nombre, COUNT(nombre)
    FROM productos p JOIN producto_venta pv ON (p.id_producto = pv.id_producto)
    GROUP BY nombre ORDER BY COUNT(nombre) DESC
    LIMIT 5);


-- Vista que muestra nombre y apellido, e email de aquellos 5 clientes que compraron más productos.
CREATE OR REPLACE VIEW clientes_mas_compras AS
	(SELECT CONCAT(nombre," ", apellido) AS NombreYApellido, email, COUNT(c.id_cliente) AS ComprasRealizadas
	FROM ventas v JOIN clientes c ON (v.id_cliente = c.id_cliente) JOIN personas p ON (p.id_persona = c.id_cliente)
	GROUP BY c.id_cliente ORDER BY COUNT(c.id_cliente) DESC
    LIMIT 5);
-- Vista que muestra la cantidad de productos vendidos por mes, en un año específico, en este caso el año 2024.
CREATE OR REPLACE VIEW productos_vendidos_mes AS
    (SELECT COUNT(pv.id_venta) AS ProductosVendidos, MONTH(v.fecha_venta) AS Mes, YEAR(v.fecha_venta) AS Anio
    FROM producto_venta pv JOIN ventas v ON (pv.id_venta = v.id_ventas)
    WHERE YEAR(v.fecha_venta) = 2021
    GROUP BY MONTH(v.fecha_venta) ORDER BY MONTH(v.fecha_venta));