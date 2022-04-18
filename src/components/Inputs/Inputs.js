import { useDispatch, useSelector } from "react-redux";
import { copyActions } from "../../store/copy-slice";
import Button from "../UI/Button";

import classes from "./Inputs.module.css";

const Inputs = () => {
	const copys = useSelector((state) => state.copy.copys);
	const dispatch = useDispatch();

	const changeInputHandler = (index, event) => {
		const { name, value } = event.target;
		dispatch(copyActions.changeCopyText({ name, value, index }));
	};

	const removeInputHandler = (index) => dispatch(copyActions.removeCopy(index));

	return (
		<>
			{copys.map((obj, index) => {
				return obj.text.name !== "HOLDER" ? (
					<div className={classes.variables} key={index}>
						<input
							type="text"
							name="name"
							value={obj.text.name}
							placeholder="Variable Name"
							onChange={changeInputHandler.bind(null, index)}
						/>
						<input
							type="text"
							name="value"
							value={obj.text.value}
							placeholder="Value"
							onChange={changeInputHandler.bind(null, index)}
						/>
						<Button onClick={removeInputHandler.bind(null, index)}>-</Button>
					</div>
				) : null;
			})}
		</>
	);
};

export default Inputs;
