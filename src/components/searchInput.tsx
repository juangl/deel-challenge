import React from "react";
import { ListItem } from "../hooks/useAsyncList";
import { AutocompleteItem } from "./autocompleteItem";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	data: ListItem[];
	onValueChange: (value: string) => void;
	value: string;
}
/**
 * Reusable search input component with autocomplete box
 */
export function SearchInput(props: SearchInputProps) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [isInputFocused, setIsInputFocused] = React.useState(false);
	const [isAutocompleteListDismissed, setIsAutocompleteListDismissed] =
		React.useState(false);

	const { data, onValueChange, ...rest } = props;
	const shouldShowList =
		!isAutocompleteListDismissed && isInputFocused && props.data.length > 0;
	return (
		<div className="relative block">
			<input
				{...rest}
				value={props.value}
				onFocus={() => {
					setIsInputFocused(true);
					setIsAutocompleteListDismissed(false);
				}}
				onBlur={() => setIsInputFocused(false)}
				ref={inputRef}
				className="w-full text-sm p-2 ring-1 ring-slate-900/10 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 caret-pink-500"
				onChange={(e) => {
					setIsAutocompleteListDismissed(false);
					onValueChange(e.target.value);
				}}
			/>
			{shouldShowList && (
				<div className="absolute mt-2 bg-gray-100 rounded p-1 max-h-52 overflow-y-auto w-full drop-shadow-md">
					<ul>
						{props.data.map((item) => (
							<AutocompleteItem
								item={item}
								searchValue={props.value}
								className="truncate flex-1 p-1 cursor-pointer hover:bg-gray-300"
								key={item.key}
								onMouseDown={(e) => {
									e.preventDefault();
								}}
								onClick={(e) => {
									e.preventDefault();
									onValueChange(item.value);
									setIsAutocompleteListDismissed(true);
								}}
							/>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
