import React from "react";

export interface ListItem {
	key: string;
	value: string;

}
const initialState = {
	searchValue: "",
	isLoading: false,
	isError: false,
	error: null as string | null,
	data: [] as ListItem[],
};

type AsyncListState = typeof initialState;
type AsyncListAction =
	| {
			type: "FETCH_START";
	  }
	| { type: "FETCH_SUCCESS"; data: any }
	| { type: "FETCH_FAILURE"; error: string }
	| { type: "SET_SEARCH_VALUE"; searchValue: string };

function asyncListReducer(state: AsyncListState, action: AsyncListAction) {
	switch (action.type) {
		case "FETCH_START":
			return {
				...state,
				isLoading: true,
				isError: false,
				error: null,
			};
		case "FETCH_SUCCESS":
			return {
				...state,
				isLoading: false,
				isError: false,
				error: null,
				data: action.data,
			};
		case "FETCH_FAILURE":
			return {
				...state,
				isLoading: false,
				isError: true,
				error: action.error,
			};
		case "SET_SEARCH_VALUE":
			return {
				...state,
				searchValue: action.searchValue,
			};
	}
}

interface UseAsyncListParams {
	load: (params: { searchValue: string; signal: AbortSignal }) => Promise<[]>;
}

/**
 * reusable hook for fetching lists from an API 
 */
export function useAsyncList(params: UseAsyncListParams) {
	const [state, dispatch] = React.useReducer(asyncListReducer, initialState);

	React.useEffect(() => {
		const abortController = new AbortController();
		const fetchData = async () => {
			dispatch({ type: "FETCH_START" });
			try {
				const data = await params.load({
					searchValue: state.searchValue,
					signal: abortController.signal,
				});

				dispatch({ type: "FETCH_SUCCESS", data });
			} catch (e) {
				dispatch({ type: "FETCH_FAILURE", error: (e as Error).message });
			}
		};

		fetchData();

		return () => {
			abortController.abort();
		};
	}, [state.searchValue]);

	const setSearchValue = React.useCallback((value: string) => {
		dispatch({ type: "SET_SEARCH_VALUE", searchValue: value });
	}, []);

	return {
		...state,
		setSearchValue,
	};
}
