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

	const Delete = (item) => {
		setTask(task.filter((deleteMe) => item != deleteMe));
		fetch("https://assets.breatheco.de/apis/fake/todos/user/rodricasares", {
			method: "PUT",
			body: JSON.stringify(task.filter((deleteMe) => item != deleteMe)),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};
	//const Save Task
	const Save = () => {
		if (
			!task.map((item) => item.label).includes(text) &&
			text.trim() != ""
		) {
			setTask([...task, { label: text, done: false }]);
			//  Retorna la API con las tareas almacenadas  despues de actualizar la pagina
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/rodricasares",
				{
					method: "PUT",
					body: JSON.stringify([
						...task,
						{ label: text, done: false },
					]),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			setText("");
		}
	};

	const createUser = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/rodricasares", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	///
	useEffect((e) => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/rodricasares")
			.then((resp) => resp.json())
			.then((result) => {
				setTask(result);
			})
			.catch((error) => {
				createUser();
				console.log(error);
			});
	}, []);

	return (
		<div className="container my-5">
			<div className="row">
				<div className="d-flex justify-content-between p-2">
					<h1 className="text-dark ms-4">
						Todo List with React, Fetch and Bootstrap
					</h1>
					<h5 className="text-white p-3">
						Total Tasks: {task.length}
					</h5>
				</div>
				<div className="input-group mb-3">
					<img
						src="https://storage.googleapis.com/4geeks-academy-website/blog/2016/04/logo1-01-02.png"
						className="img-thumbnail"
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
						value={text}
						onKeyDown={(e) => {
							{
								e.key === "Enter" ? Save(e) : "";
							}
						}}
					/>
					<button
						type="button"
						className="btn btn-outline-success"
						onClick={Save}
						value={text}>
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
						<ul className="list-group list-group-flush my-3">
							{task.length > 0 &&
								task.map((value, index) => (
									<li
										className="list-group-item mb-3"
										key={index}>
										<h6 className="text-primary">
											New task: {index + 1}
										</h6>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-journal-code me-2"
											viewBox="0 0 16 16">
											<path
												fillRule="evenodd"
												d="M8.646 5.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 8 8.646 6.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 8l1.647-1.646a.5.5 0 0 0 0-.708z"
											/>
											<path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
											<path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
										</svg>
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
							{task.length === 0 ? (
								<div
									className="alert alert-success mt-3"
									role="alert">
									Great Job !!! You can go at home !!!
								</div>
							) : (
								<div
									className="alert alert-danger mt-3"
									role="alert">
									You have job hard... take your time.
								</div>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Note;
