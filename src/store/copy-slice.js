import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	copys: [],
	textarea:
		'<!-- HERO -->\n\n{{ $PreheadCopy := "PreheadCopy" }}\n{{ $HeadlineCopy := "HeadlineCopy" }}\n{{ $HeadlineSize := "45px" }}\n{{ $SubheadCopy := "SubheadCopy" }}\n{{ $Timer := "" }}\n{{ $TimerWidth := "180" }}\n{{ $HeroCTACopy := "HeroCTACopy" }}\n{{ $HeroCTAWidth := "280" }}',
	error: "",
};

const copySlice = createSlice({
	name: "copy",
	initialState,
	reducers: {
		// Stores text objects from textarea
		createCopy(state, action) {
			const textObj = action.payload.split("\n").map((text) => {
				const newText = text.replace(/\s+/g, " ").trim();
				const inputObj = { text: "", quote: false, extraVar: "" };
				let value = "";
				let sentence = "";

				if (newText.includes("{{")) {
					if (newText.includes(':= "')) {
						inputObj.quote = true;
						sentence = newText.split(':= "')[1].split('" }}')[0];
					}

					if (newText.includes("printf")) {
						sentence = newText.split('printf "')[1].split(" }}")[0];
						inputObj.extraVar = sentence.slice(sentence.lastIndexOf('" '));
						sentence = sentence.slice(0, sentence.lastIndexOf('" '));
					}

					const textArr = newText.split(" ");
					const name = textArr[1].slice(1);

					value = sentence ? sentence : textArr[3].includes('""') ? "" : textArr[3];

					const textObj = { name, value };

					return { ...inputObj, text: textObj };
				} else {
					return { ...inputObj, text: { name: "HOLDER", value: newText } };
				}
			});
			state.copys = textObj;
		},

		// Changes the value from the input into the specific text object
		changeCopyText(state, action) {
			const { name, value, index } = action.payload;
			state.copys[index].text[name] = value;
		},

		// Deletes one of the text objects at the index
		removeCopy(state, action) {
			const index = action.payload;
			state.copys.splice(index, 1);
		},

		// Adds an empty text object at the end of the array
		addNewCopy(state) {
			state.copys.push({ text: { name: "", value: "" }, quote: true, extraVar: "" });
		},

		// Submits inputs into the textarea
		updateTextarea(state) {
			const updatedCopy = state.copys
				.map((copy) => {
					const name = copy.text.name;
					let value = copy.text.value.trim();
					if (copy.quote) {
						value = `"${value}"`;
					}
					if (copy.extraVar) {
						value = `printf "${value
							.split(" ")
							.map((word) => {
								if (word.indexOf("%") > -1 || word.indexOf("$") > -1) {
									// for <br> cases
									if (word.includes(">")) {
										word = word.slice(0, word.indexOf(">") + 1) + "%s";
									} else {
										word = "%s";
									}
								}
								return word;
							})
							.join(" ")}${copy.extraVar}`;
					}
					if (name !== "HOLDER") {
						return `{{ $${name} := ${value} }}`;
					}
					return value;
				})
				.filter((copy) => copy !== '{{ $ := "" }}');
			state.textarea = updatedCopy.join("\n");
		},

		foundError(state, action) {
			state.error = action.payload;
		},
	},
});

export const copyActions = copySlice.actions;

export default copySlice;
