export const setInfoRegister = (data: any) => {
	try {
		localStorage.setItem('infoRegister', data);
		return true;
	} catch (error) {
		return false;
	}
};

export const getInfoRegister = () => {
	try {
		const dataString = localStorage.getItem('infoRegister');
		if (dataString) {
			const data = JSON.parse(dataString);
			return data[0];
		}
	} catch (error) {
		return false;
	}
};
