import Handsontable from 'handsontable';
import { ODD_ROW_CLASS, SELECTED_CLASS } from '../constants/TableConstants';

const headerAlignments = new Map([
	['9', 'htCenter'],
	['10', 'htRight'],
	['12', 'htCenter'],
]);

type AddClassesToRows = (
	TD: HTMLTableCellElement,
	row: number,
	column: number,
	prop: number | string,
	value: any,
	cellProperties: Handsontable.CellProperties,
) => void;

export const addClassesToRows: AddClassesToRows = (TD, row, column, prop, value, cellProperties) => {
	if (column !== 0) {
		return;
	}

	const { parentElement } = TD;

	if (parentElement === null) {
		return;
	}

	if (cellProperties.instance.getDataAtRowProp(row, '0')) {
		Handsontable.dom.addClass(parentElement, SELECTED_CLASS);
	} else {
		Handsontable.dom.removeClass(parentElement, SELECTED_CLASS);
	}

	if (row % 2 === 0) {
		Handsontable.dom.addClass(parentElement, ODD_ROW_CLASS);
	} else {
		Handsontable.dom.removeClass(parentElement, ODD_ROW_CLASS);
	}
};

export function alignHeaders(this: Handsontable, column: number, TH: HTMLTableCellElement) {
	if (column < 0) {
		return;
	}

	if (TH.firstChild) {
		const alignmentClass = this.isRtl() ? 'htRight' : 'htLeft';

		if (headerAlignments.has(column.toString())) {
			Handsontable.dom.removeClass(TH.firstChild as HTMLElement, alignmentClass);
			Handsontable.dom.addClass(TH.firstChild as HTMLElement, headerAlignments.get(column.toString()) as string);
		} else {
			Handsontable.dom.addClass(TH.firstChild as HTMLElement, alignmentClass);
		}
	}
}
