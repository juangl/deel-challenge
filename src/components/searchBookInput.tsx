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
				}/search.json?limit=20&fields=title,key&title=${searchValue}`,
				{
					signal,
				},
			);

			return (await response.json()).docs.map(
				(doc: { title: string; key: string }) => ({
					value: doc.title,
					key: doc.key,
				}),
			);
		},
	});

	return (
		<SearchInput
			data={list.data}
			value={list.searchValue}
			onValueChange={(value) => {
				list.setSearchValue(value);
			}}
		/>
	);
}
