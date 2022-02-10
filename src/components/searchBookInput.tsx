import { useAsyncList } from "../hooks/useAsyncList";
import { SearchInput } from "./searchInput";

export function SearchBookInput() {
	const list = useAsyncList({
		load: async ({ searchValue, signal }) => {
			// the search should have at least 2 characters
			if (searchValue.length < 3) {
				return [];
			}
			const response = await fetch(
				`${
					import.meta.env.VITE_APP_OPEN_LIBRARY_API_BASE_URL
				}/search.json?fields=title&title=${searchValue}`,
				{
					signal,
				},
			);

			return (await response.json()).docs;
		},
	});

	return (
		<SearchInput
			data={list.data}
			value={list.searchValue}
			onChange={(e) => {
				list.setSearchValue(e.target.value);
			}}
		/>
	);
}
