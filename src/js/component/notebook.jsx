import React, { useEffect, useState } from "react";

//create your first component

const Note = () => {
	// La constante task almacena la info en la array
	const [task, setTask] = useState([]);
	// La constante text muestra la  info por pantalla
	const [text, setText] = useState("");

	const handleChange = (event) => {
		event.preventDefault();
		console.log(event.target.value);
		setText(event.target.value);
	};
	// const Delete the list of task
	const Delete = (item) =>
		setTask(task.filter((deleteMe) => item != deleteMe));
	//const Save Task
	const Save = () => {
		setTask([...task, { label: text, done: false }]);
		// ESTE FETCH RETORNA EL API CON LAS TAREAS ALMACENADAS  DESPUES DE ACTUALIZAR LA PAG.
		fetch("https://assets.breatheco.de/apis/fake/todos/user/rodricasares", {
			method: "PUT",
			body: JSON.stringify([...task, { label: text, done: false }]),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	///
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/rodricasares")
			.then((resp) => resp.json())
			.then((result) => {
				setTask(result);
			});
	}, []);

	return (
		<div className="container my-5">
			<div className="row">
				<h1 className="row m-3">
					Todo List with React, Fetch and Bootstrap
				</h1>
				<div className="input-group mb-3">
					<img
						src="https://storage.googleapis.com/4geeks-academy-website/blog/2016/04/logo1-01-02.png"
						class="img-thumbnail"
						alt="Bootstrap"
						width="300"
						height="100"
					/>
					<input
						className="form-control"
						placeholder="Writte your task here"
						aria-label="Re"
						type="text"
						onChange={handleChange}
					/>
					<button
						type="button"
						class="btn btn-outline-success"
						onClick={Save}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-pencil-fill"
							viewBox="0 0 16 16">
							<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
						</svg>
					</button>
				</div>
			</div>
			<div className="container mb-3">
				<div className="row align-items-center">
					<div className="col border border-2 rounded-bottom ">
						<ul className="list-group list-group-flush mb-3">
							{task.map((value, index) => (
								<li
									className="list-group-item pb-3"
									key={index}>
									{value.label}
									<button
										type="button"
										className="btn btn-outline-danger float-end"
										onClick={() => Delete(value)}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-trash-fill"
											viewBox="0 0 16 16">
											<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
										</svg>
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Note;
