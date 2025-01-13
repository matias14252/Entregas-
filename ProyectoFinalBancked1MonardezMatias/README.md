# Proyecto Backend E-commerce

Esta aplicación se desarrolló para aprobar el curso de Desarrollo Backend de Coderhouse. Permite registrar usuarios, iniciar sesión y cuenta con un sistema de carrito de compras en línea que permite a los usuarios agregar productos a su carrito, gestionar su carrito y finalizar compras.

## Índice

- [Descripción](#descripción)
- [Características](#características)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Instalación](#instalación)
- [Uso](#uso)
- [Contacto](#contacto)

## Descripción

Este proyecto consta de una aplicación web desarrollada con Node.js, Express.js y MongoDB para el backend, y HTML, CSS y JavaScript para el frontend (vistas generadas en Handlebars). Cabe aclarar que se trata de un frontend muy simple ya que el objetivo del curso era centrarse en el backend. Utiliza Passport.js para la autenticación de usuarios y Mongoose para la interacción con la base de datos MongoDB. La aplicación proporciona una interfaz para que los usuarios puedan registrar una cuenta, iniciar sesión, navegar por los productos disponibles, agregar productos a su carrito, gestionar su carrito y finalizar la compra.

## Características

- Registro de usuarios
- Inicio de sesión
- Visualización de productos
- Agregar productos al carrito
- Eliminar productos del carrito
- Vaciar el carrito
- Finalizar compra

## Capturas de Pantalla

![image](https://github.com/smatulionis/Proyecto-Final-E-commerce-Coderhouse/assets/86858500/ead9a26b-677f-4fc7-ac31-f8d63243795a)

![image](https://github.com/smatulionis/Proyecto-Final-E-commerce-Coderhouse/assets/86858500/69e9efba-0cb2-40be-8128-da65bc5865b0)

![image](https://github.com/smatulionis/Proyecto-Final-E-commerce-Coderhouse/assets/86858500/1266c719-86e7-4432-9ceb-d327c3f922d6)

![image](https://github.com/smatulionis/Proyecto-Final-E-commerce-Coderhouse/assets/86858500/5e102620-53b7-43b7-833a-165f477c624b)

![image](https://github.com/smatulionis/Proyecto-Final-E-commerce-Coderhouse/assets/86858500/4812383c-e52d-46a1-897e-4aa3d0cbe121)

## Instalación

1. Clona este repositorio en tu máquina local.
2. Abre una terminal y navega hasta el directorio del proyecto.
3. Ejecuta `npm install` para instalar las dependencias del proyecto.
4. Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias (por ejemplo, la URL de la base de datos MongoDB y la clave secreta JWT; pueden contactarse conmigo para que les brinde la información correspondiente).
5. Ejecuta `npm run dev` para iniciar el servidor.
6. Abre un navegador web y accede a `http://localhost:8080/home`.

## Uso

1. Explora los productos disponibles en la página de inicio.
2. Haz clic en el botón "Agregar al carrito" para agregar un producto a tu carrito. En este punto, si ya tienes una cuenta deberás iniciar sesión; caso contrario deberás registrar una nueva cuenta.
3. Ve a la página de carrito para ver los productos agregados, eliminar productos o finalizar la compra.

## Contacto

Si tienes alguna pregunta, sugerencia o comentario sobre este proyecto, puedes contactarme por correo electrónico a [smatulionis@live.com.ar](mailto:smatulionis@live.com.ar) o a través de mi perfil de Linkedin en [Sebastián Ezequiel Matulionis](https://www.linkedin.com/in/smatulionisdesarrollosoftware/).
