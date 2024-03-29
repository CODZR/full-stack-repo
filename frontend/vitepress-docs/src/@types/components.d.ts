type BaseValue = string | string[] | number | number[] | boolean;
type RawValue = string | number;
type SelectValue = string | string[] | number | number[];

interface DropdownItem {
	key: RawValue;
	type?: string;
	label?: string;
	selectLabel?: string;
	render?: () => JSX.Element;
	click?: (value?: SelectValue | any) => void;
	checked?: boolean;
	multiple?: boolean;
}
