import React, { useState, useEffect } from 'react';
import { useFormField } from '../init';

interface IAppProps extends React.HTMLAttributes<HTMLDivElement> {}
const App = ({}: IAppProps) => {
	const [rawText, setRawText] = useState('');
	// const []

	// for debug
	useEffect(() => {
		fetch('test_data/fbf.txt')
			.then((response) => response.text())
			.then(setRawText);
	}, []);

	const onRawChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
		setRawText(event.target.value);

	return (
		<div className="container">
			<div className="row">
				<div className="col">
					<h3 className="text-center">
						Додайте html-код в текстову область та оберіть дію
					</h3>
					<textarea
						className="form-control"
						rows={10}
						placeholder="html-код елементу, що містить записи про друзів (підписників)"
						autoComplete="off"
						value={rawText}
						onChange={onRawChange}
					></textarea>
				</div>
			</div>
		</div>
	);
};

export default App;
