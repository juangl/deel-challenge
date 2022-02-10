import { ListItem } from "../hooks/useAsyncList";

interface AutocompleteItemProps
	extends Omit<React.InputHTMLAttributes<HTMLLIElement>, "value" | "children"> {
	item: ListItem;
	searchValue: string;
}

export function AutocompleteItem(props: AutocompleteItemProps) {
	const { item, searchValue, ...rest } = props;

	const matchIndex = item.value
		.toLocaleLowerCase()
		.indexOf(searchValue.toLocaleLowerCase());

	const beforeMatch = item.value.substring(0, matchIndex);
	const match = item.value.substring(
		matchIndex,
		matchIndex + searchValue.length,
	);
	const afterMatch = item.value.substring(matchIndex + searchValue.length);
	return (
		<li
			className="truncate flex-1 p-1 cursor-pointer hover:bg-gray-300"
			{...rest}
		>
			{beforeMatch}
			<span className="bg-yellow-100">{match}</span>
			{afterMatch}
		</li>
	);
}
