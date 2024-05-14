export const setInfoRegister = (data: any) => {
	try {
		localStorage.setItem('infoRegister', data);
		return true;
	} catch (error) {
		return false;
	}
};
