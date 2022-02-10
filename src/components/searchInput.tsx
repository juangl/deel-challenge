import React from "react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	data: [];
}

export function SearchInput(props: SearchInputProps) {
	console.log(props.data);
	return <input {...props} />;
}
