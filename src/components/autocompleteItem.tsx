import { ListItem } from "../hooks/useAsyncList";

interface AutocompleteItemProps
	extends Omit<React.InputHTMLAttributes<HTMLLIElement>, "value" | "children"> {
	item: ListItem;
	searchValue: string;
}

export function AutocompleteItem(props: AutocompleteItemProps) {
	const matchIndex = props.item.value
		.toLocaleLowerCase()
		.indexOf(props.searchValue.toLocaleLowerCase());

	const beforeMatch = props.item.value.substring(0, matchIndex);
	const match = props.item.value.substring(
		matchIndex,
		matchIndex + props.searchValue.length,
	);
	const afterMatch = props.item.value.substring(
		matchIndex + props.searchValue.length,
	);
	return (
		<li
			className="truncate flex-1 p-1 cursor-pointer hover:bg-gray-300"
			{...props}
		>
			{beforeMatch}
			<span className="bg-yellow-100">{match}</span>
			{afterMatch}
		</li>
	);
}
