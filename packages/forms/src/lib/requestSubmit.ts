export const requestSubmit = (form: HTMLFormElement) => {
	if (!form) {
		return;
	}
	if (typeof form.requestSubmit === 'function') {
		form.requestSubmit();
	} else {
		const submitter = document.createElement('input');
		submitter.type = 'submit';
		submitter.hidden = true;
		form.appendChild(submitter);
		submitter.click();
		form.removeChild(submitter);
	}
};
