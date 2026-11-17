# Alcance inicial del HelpDesk Sicurezza

## Usuarios

- **Administrador:** Edgar. Es el único usuario que depura y cierra tickets.
- **Técnicos:** dos usuarios. Usan el sistema principalmente desde celular.

## Flujo de los tickets

1. El cliente modifica el archivo Excel compartido en Google Drive.
2. El sistema detecta los cambios y crea registros en la bandeja **Pendientes por depurar**.
3. El administrador revisa cada pendiente y completa o corrige: sistema, prioridad, descripción, técnico asignado y fecha límite.
4. Al aprobarlo, el ticket aparece al técnico asignado y se notifica al grupo interno de Sicurezza.
5. El técnico llega a la sucursal. Al entrar al radio configurado de la sucursal, el sistema le solicita registrar su llegada.
6. El técnico captura evidencia de llegada. Puede adjuntar fotografías o audio.
7. El sistema envía al grupo de WhatsApp del cliente el registro de llegada.
8. El técnico documenta el trabajo realizado con fotografías o audio cuando sea necesario.
9. Cuando el técnico abandona el radio de la sucursal sin registrar salida, el sistema le solicita hacerlo.
10. El técnico registra su salida y se notifica al grupo de WhatsApp del cliente.
11. El ticket queda listo para revisión. Solo el administrador puede cerrarlo.

## Reglas de diseño

- La interfaz del técnico debe tener pocos pasos, botones grandes y uso prioritario desde celular.
- El técnico no crea, depura, reasigna ni cierra tickets.
- La confirmación por GPS usa la ubicación de cada sucursal y un radio configurable, inicialmente de 100 metros.
- El archivo del cliente se conserva como fuente externa. La aplicación mantiene su propia bitácora de sincronización, tickets y evidencias.
- Antes de actualizar el archivo, la integración compara cambios para evitar sobrescribir una edición reciente del cliente.

## Integraciones previstas

- **Google Drive / Excel:** servicio del servidor con OAuth para revisar y actualizar el archivo autorizado.
- **Ubicación:** permiso explícito de ubicación en el teléfono. Las alertas al entrar o salir de una sucursal requieren una aplicación web instalable o una aplicación móvil, según las restricciones de cada teléfono.
- **WhatsApp:** mensajes para el grupo interno al aprobar un ticket y para el grupo del cliente al registrar llegada y salida. La implementación debe validar la disponibilidad de la API de grupos de WhatsApp Business para la cuenta que se use.
- **Evidencias:** almacenamiento privado para fotografías y audios, vinculados al ticket, técnico, tipo de evidencia y hora de captura.

