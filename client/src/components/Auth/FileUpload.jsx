import React from 'react';

function FileUpload() {
	const submitAvatar = (event) => {
		event.preventDefault();

		const avatarForm = event.target;
		fetch(`${process.env.REACT_APP_SERVER_HOST}/auth/signup`, {
			method: 'POST',
			body: new FormData(avatarForm)
		});
	};

	return (
		<div>
			<form method="POST" encType="multipart/form-data" name="addAvatar" onSubmit={submitAvatar}>
				<input className="sign-up__avatar-input" name="avatar_url" type="file" />
				<button className="sign-up__button-wrapper-registration" type="submit">
					Загрузить файл
				</button>
			</form>
		</div>
	);
}

export default FileUpload;
