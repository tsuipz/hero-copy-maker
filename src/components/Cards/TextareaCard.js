import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { copyActions } from "../../store/copy-slice";

import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./TextareaCard.module.css";

const TextareaCard = () => {
	const textCopyRef = useRef();
	const textarea = useSelector((state) => state.copy.textarea);
	const errorStore = useSelector((state) => state.copy.error);
	const dispatch = useDispatch();

	useEffect(() => {
		textCopyRef.current.value = textarea;
	}, [textarea]);

	const addTextHandler = () => {
		const enteredText = textCopyRef.current.value.trim();
		if (enteredText.trim().length === 0) {
			return dispatch(copyActions.foundError("Please enter text into the text area!"));
		}
		dispatch(copyActions.foundError(null));
		dispatch(copyActions.createCopy(enteredText));
	};

	const copyHandler = () => navigator.clipboard.writeText(textCopyRef.current.value);

	return (
		<Card className={classes.hero}>
			<h1>Hero Copy Builder</h1>
			<label htmlFor="textarea">Insert the Golang HTML Copy you wish to convert</label>
			<textarea name="textarea" id="textarea" cols="40" rows="10" ref={textCopyRef}></textarea>
			<div className={classes["btn-create"]}>
				<Button onClick={copyHandler}>Copy</Button>
				<Button onClick={addTextHandler}>Create Inputs!</Button>
			</div>
			{errorStore && <p>{errorStore}</p>}
		</Card>
	);
};

export default TextareaCard;
