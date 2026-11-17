# HelpDesk Sicurezza

Aplicación web para concentrar el soporte técnico de las sucursales Calzzapato, Kelder, CalzzaSport, Urbanna y marcas relacionadas.

Esta primera versión ofrece una interfaz operativa para consultar incidencias, crear tickets y visualizar el estado de sincronización con el archivo del cliente.

## Alcance inicial

- Tablero con incidencias abiertas, críticas, atendidas y sucursales monitoreadas.
- Registro de tickets por sucursal, sistema y prioridad.
- Filtros por sistema, prioridad y texto.
- Seguimiento de estado y responsable.
- Bitácora local de sincronización para separar la interfaz de la futura conexión con Google Drive.

## Sincronización con el archivo del cliente

El archivo del cliente está almacenado en Google Drive como `.xlsx`. La integración definitiva se implementará en un servicio de servidor con OAuth de Google y conservará una base de datos propia para el historial de tickets, técnicos, evidencias y control de conflictos.

No deben guardarse llaves de Google, tokens ni archivos de credenciales en este repositorio.

## Ejecutar localmente

Es una aplicación estática sin dependencias. Abre `index.html` con un servidor local, por ejemplo:

```powershell
python -m http.server 4173
```

Después visita `http://localhost:4173`.

## Siguiente entrega

La definición funcional acordada está en [`docs/alcance-inicial.md`](docs/alcance-inicial.md).

1. Bandeja de pendientes por depurar y asignación de técnicos.
2. Vista móvil de técnico: llegada, salida y evidencias.
3. API y base de datos de tickets, sucursales y bitácora.
4. Conexión OAuth a Google Drive para leer y actualizar el archivo autorizado.
5. Registro de cambios, detección de conflictos y notificaciones por WhatsApp.

