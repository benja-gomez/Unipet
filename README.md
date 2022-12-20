# Aplicacion Unipet

Codigo fuente de UniPet, una aplicacion dedicada a ayudar a animales y duenos de mascotas en casos de extravio, encuentro o adopcion.
Dentro de sus funciones principales se destacan:

- Publicar avisos 
- Chat interno
- Administracion de publicaciones
- Blog
- Bot de notificaciones

Otros aspectos destacados:

- Arquitectura modular; los servicios se pueden separar en varios microservicios evitando ser monolitico.
- Sin Vendor Lock In; las librerias y componentes utilizados son de codigo abierto y ampliamente intercambiables, no estas limitado a ocupar la misma base de datos o puedes cambiar Minio por AWS S3




## Requisitos

Docker y Docker Compose instalado

## Inicio

Primero debe configurar las variables del entorno y dejarlos en la ruta raiz como ```.env``` puede referirse al ```.env.example``` para crear ese archivo,
posteriormente debe arrancar la aplicacion con:

```
docker-compose up

# O en versiones mas recientes
docker compose up
```

Con esto deberia dejar los siguentes servicios expuestos:
| Servicio | URL | Descripcion |
|---|---|---|
|PostgreSQL|    http://localhost:5432| Base de datos|
|Adminer|       http://localhost:8080| Panel web DB|
|Minio Server|  http://localhost:9000| Object Storage (imagenes)|
|Minio Panel|   http://localhost:9080| Panel Object Storage|
|Aplicacion    |http://localhost:3000| Aplicacion principal |

Esto permite configurar un reverse proxy con Nginx o Traefik de forma facil, la pagina principal esta disponible en la url ```http://localhost:3000```
