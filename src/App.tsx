import { useState, useEffect } from 'react'
import type { Task } from './types'

function App(){
	const [input, setInput] = useState('')
	const [tasks, setTasks] = useState<Task[]>(() => {
		const raw = localStorage.getItem('todo-list');
		return raw ? JSON.parse(raw) : [];
	});


	// NUEVO: guardar cada vez que cambian
	useEffect(() => {
		localStorage.setItem('todo-list', JSON.stringify(tasks));
	}, [tasks]);

	//filtrar tareas
	const [filter, setFilter] = useState<'todas' | 'pendientes' | 'completadas'>('todas');
	const visible = tasks.filter(t =>
		filter === 'todas' ? true :
		filter === 'pendientes' ? !t.done :
		t.done
	);

	function addTask (){
		const inputFree = input.trim();
		if ( inputFree === '') return;
		const newTask: Task = {
			id: Date.now(),
			text: inputFree,
			done: false
		}
		setTasks([newTask, ...tasks])
		setInput('')
	}

	const toggleTask = (id: number) => {
		setTasks(tasks.map( t => 
				t.id === id ? {...t, done: !t.done} : t
			)
		)
	}

	const removeTask = (id: number) => {
		setTasks(
			tasks.filter(task => task.id !== id)
		)
	}

	//editar tarea
	function editTask(id: number) {
		const t = tasks.find(x => x.id === id);
		if (!t) return;
		const nuevo = prompt("Editar tarea:", t.text);
		if (nuevo && nuevo.trim()) {
			setTasks(tasks.map(x => (x.id === id ? { ...x, text: nuevo.trim() } : x)));
		}
	}

	return (
		<div>
			<h1> Todo List </h1>

			<p>Pendientes: <b>{tasks.filter(t => !t.done).length}</b></p>
			<div style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
				<button onClick={() => setFilter('todas')} disabled={filter === 'todas'}>Todas</button>
				<button onClick={() => setFilter('pendientes')} disabled={filter === 'pendientes'}>Pendientes</button>
				<button onClick={() => setFilter('completadas')} disabled={filter === 'completadas'}>Completadas</button>
			</div>

			<br/>
			<div>
				<input
					 type="text"
					 placeholder="Nueva tarea..."
					 value={input}
					 onChange={e => setInput(e.target.value)}
				/>
				<button onClick={addTask}> Agregar Tareita </button>
			</div>
			<div>
				<ul className="lista-tareas">
					{tasks.length === 0 && (
						<li> No hay Tareas aún. </li>
					)}
					{tasks.map(task => (
						<li 
							key={task.id}
							className="linea-tarea"
						>
							 <span 
							 	className={task.done ? 'done' : ''}
							 	onClick={ () => toggleTask(task.id) }
							 	title="Marcar como completada"> 
							 	{task.text} 
							 </span>
							 <button onClick={() => editTask(task.id)}>Editar</button>
							 <button
							 	onClick={ () => removeTask(task.id) }
							  	title="Eliminar Tarea"
							 >
							 	x
							 </button>
						</li>
					))}
				</ul>
			</div>

		</div>
	)
}

export default App;