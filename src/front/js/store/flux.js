const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
	
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			getAllUsers: async () => {
				try {
						// Realiza la solicitud al backend para obtener los usuarios
						const resp = await fetch('https://stunning-train-x556jv5xgprx266p-3001.app.github.dev/users/all', {
								method: "GET",
								
						});
						if (!resp.ok) {
								throw new Error("There was an error fetching the users");
						}

						// Convierte la respuesta a formato JSON
						const data = await resp.json();

						// Actualiza el estado del store con los usuarios obtenidos
						setStore({ users: data });

						// Retorna los usuarios para su uso si es necesario
						return data;
				} catch (error) {
						console.log("Error loading users from backend 1111", error);
				}
		},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
