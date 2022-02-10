import { SearchBookInput } from "./components/searchBookInput";
import { SearchInput } from "./components/searchInput";

function App() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="bg-white p-6 rounded-lg">
				<h1 className="mb-4">Search in our book Database!</h1>
				<SearchBookInput />
			</div>
		</div>
	);
}

export default App;
