import { useDispatch } from "react-redux";
import { copyActions } from "../../store/copy-slice";
import { useSelector } from "react-redux";
import Inputs from "../Inputs/Inputs";

import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./EditInputCard.module.css";

const EditInputCard = () => {
	const copys = useSelector((state) => state.copy.copys);
	const dispatch = useDispatch();

	const formSubmitHandler = (event) => {
		event.preventDefault();
		dispatch(copyActions.updateTextarea());
	};

	const addInputHandler = () => {
		dispatch(copyActions.addNewCopy());
	};

	const defaultHandler = (event) => event.preventDefault();

	if (copys.length === 0) return null;

	return (
		<Card>
			<form className={classes.inputForm} onSubmit={defaultHandler}>
				<h2>Edit Inputs Here:</h2>
				<Inputs />
				<div className={classes["edit-btn"]}>
					<Button onClick={addInputHandler}>+</Button>
					<Button onClick={formSubmitHandler}>Submit Copy</Button>
				</div>
			</form>
		</Card>
	);
};

export default EditInputCard;
