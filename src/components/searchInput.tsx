import React from "react";
import { ListItem } from "../hooks/useAsyncList";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	data: ListItem[];
	onValueChange: (value: string) => void;
}
/**
 * Reusable search input component with autocomplete box
 */
export function SearchInput(props: SearchInputProps) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [isInputFocused, setIsInputFocused] = React.useState(false);
	const [isAutocompleteListDismissed, setIsAutocompleteListDismissed] =
		React.useState(false);
	console.log(props.data);

	const { data, onValueChange, ...rest } = props;
	const shouldShowList =
		!isAutocompleteListDismissed && isInputFocused && props.data.length > 0;
	return (
		<div className="relative block">
			<input
				{...rest}
				onFocus={() => {
					setIsInputFocused(true);
					setIsAutocompleteListDismissed(false);
				}}
				onBlur={() => setIsInputFocused(false)}
				ref={inputRef}
				className="w-full text-sm p-2 w-80 ring-1 ring-slate-900/10 shadow-sm rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 caret-pink-500"
				onChange={(e) => {
					setIsAutocompleteListDismissed(false);
					onValueChange(e.target.value);
				}}
			/>
			{shouldShowList && (
				<div className="absolute mt-2 bg-gray-100 rounded p-1 max-h-52 overflow-y-auto w-full drop-shadow-md">
					<ul>
						{props.data.map((item) => (
							<li
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
							>
								{item.value}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
