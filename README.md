# To-Do List App

## Mejoras implementadas - Parte 1
- Contador de tareas pendientes
- Filtro para ver **todas, completadas o pendientes**
- Opción para **editar tareas**
## mejoras Implementadas - parte 2
- Cración de custom hook llamado **useLocalStorage** que:
    1. Al iniciar, el hook intenta leer la clave pasada (`key`) desde `localStorage`
    2. Si no hay nada guardado, usa el `initialValue`
    3. Cada vez que el estado cambia, el hook lo guarda en `localStorage` con `JSON.stringify`
