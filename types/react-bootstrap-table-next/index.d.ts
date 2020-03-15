// Type definitions for react-bootstrap-table-next 4.0
// Project: https://github.com/react-bootstrap-table/react-bootstrap-table2#readme
// Definitions by: Wlad Meixner <https://github.com/gosticks>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.8.3

// documentation taken from https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/table-props.html

import { CSSProperties, ReactElement, SyntheticEvent, Component } from 'react';

export enum RowSelectionType {
    ROW_SELECT_SINGLE = 'radio',
    ROW_SELECT_MULTIPLE = 'checkbox',
    ROW_SELECT_DISABLED = 'ROW_SELECT_DISABLED',
}

export enum TableCheckboxStatus {
    CHECKBOX_STATUS_CHECKED = 'checked',
    CHECKBOX_STATUS_INDETERMINATE = 'indeterminate',
    CHECKBOX_STATUS_UNCHECKED = 'unchecked',
}

export enum FilterPosition {
    FILTERS_POSITION_INLINE = 'inline',
    FILTERS_POSITION_TOP = 'top',
    FILTERS_POSITION_BOTTOM = 'bottom',
}

/**
 * Table change event types
 */
export enum TableChangeType {
    filter = 'filter',
    pagination = 'pagination',
    sort = 'sort',
    cellEdit = 'cellEdit',
}

export enum CellAlignment {
    left = 'left',
    center = 'center',
    right = 'right',
    start = 'start',
    end = 'end',
}

/**
 * Filter comparators used for table filters
 */
declare enum FilterComparator {
    LIKE = 'LIKE',
    EQ = '=',
    NE = '!=',
    GT = '>',
    GE = '>=',
    LT = '<',
    LE = '<=',
}

/**
 * Sort Order values. 'asc' = ascending, 'desc' = descending.
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Used to specify the text alignment for a column.
 */
export type DataAlignType = 'left' | 'center' | 'right' | 'start' | 'end';

export type ColumnSortFunc<T, E extends keyof T = any> = (
    a: T[E],
    b: T[E],
    order: 'asc' | 'desc',
    dataField: string,
    rowA: T,
    rowB: T,
) => number;

export type TableChangeState<T> = {
    page: number;
    sizePerPage: number;
    sortField: string;
    sortOrder: 'asc' | 'desc';
    filters: { [key: string]: { filterVal: any; filterType: 'TEXT'; comparator: any } };
    data: T[];
    cellEdit: {
        rowId: string;
        dataField: string;
        newValue: any;
    };
};

export type HeaderFormatter<T> = (
    column: ColumnDescription<T>,
    colIndex: number,
    components: {
        sortElement: JSX.Element;
        filterElement: JSX.Element;
    },
) => JSX.Element | string | number | React.ReactText;

export type ColumnFormatter<R, E = any, C = any> = (
    cell: C,
    row: R,
    rowIndex: number,
    formatExtraData: E,
) => JSX.Element | string | boolean | React.ReactText;

export type ColumnDescription<T = any, E = any> = (
    | { isDummyField: true; dataField?: string; formatter?: ColumnFormatter<T, E, never> }
    | { dataField: T[keyof T] | string }
) & {
    formatter?: ColumnFormatter<T, E, any>;
    hidden?: boolean;
    /**
     * Column header field
     */
    text: string;
    sort?: boolean;
    sortFunc?: ColumnSortFunc<T>;
    searchable?: boolean;
    align?: CellAlignment;
    headerStyle?: React.CSSProperties | (() => React.CSSProperties);

    tooltipDataField?: string;
    editable?: boolean | ((cell: any, row: T, rowIndex: number, colIndex: number) => boolean);
    editor?: { type: string; options?: [{ value: string; label: string }] };
    filter?: boolean | TableColumnFilterProps;
    filterValue?: (cell: T[keyof T], row: T) => string;
    headerAlign?: CellAlignment;
    headerFormatter?: HeaderFormatter<T>;
    formatExtraData?: {
        tooltipFormatter?: (row: T) => JSX.Element;
    } & E;
    width?: number;
    footer?:
        | boolean
        | number
        | string
        | ((columnData: any, column: ColumnDescription<T, E>, columnIndex: number) => string);
    footerFormatter?: (column: ColumnDescription<T, E>, columnIndex: number) => void;
    footerClasses?: string | ((column: ColumnDescription<T, E>, columnIndex: number) => string);
    footerStyle?: React.CSSProperties;
    footerTitle?: boolean;
    footerEvents?: { onClick: (e: any, column: ColumnDescription<T, E>, columnIndex: number) => void };
    footerAlign?: CellAlignment | ((column: ColumnDescription<T, E>, colIndex: number) => CellAlignment);
};

/**
 * Generic row event handler
 */
export type RowEventHandler<T> = (e: SyntheticEvent, row: T, rowIndex: number) => void;

/**
 * Row level event handlers
 */
export type RowEventHandlerProps<T> = Partial<{
    onClick: RowEventHandler<T>;
    onDoubleClick: RowEventHandler<T>;
    onMouseEnter: RowEventHandler<T>;
    onMouseLeave: RowEventHandler<T>;
    onContextMenu: RowEventHandler<T>;
}>;

/**
 * Table change callback method
 */
export type TableChangeHandler<T> = (type: TableChangeType, newState: TableChangeState<T>) => void;

/**
 * All possible pagination options handled by the pagination plugin
 *
 * Consult [documentation](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/pagination-props.html)
 */
export type PaginationOptions = Partial<{
    custom: boolean;
    /**
     * Specify the current page. It's necessary when remote is enabled
     */
    page: number;
    /**
     * Specify the size per page. It's necessary when remote is enabled
     */
    sizePerPage: number;
    /**
     * Total data size. It's necessary when remote is enabled
     */
    totalSize: number;
    /**
     * first page will be 0, default is 1
     **/
    pageStartIndex: number;
    /**
     * the pagination bar size, default is 5
     **/
    paginationSize: number;
    /**
     * display pagination information
     **/
    showTotal: boolean;
    /**
     * A numeric array is also available: [5, 10]. the purpose of above example is custom the text
     **/
    sizePerPageList: number[] | { text: string; value: number }[];
    /**
     * hide the going to first and last page button
     **/
    withFirstAndLast: boolean;
    /**
     * always show the next and previous page button
     **/
    alwaysShowAllBtns: boolean;
    /**
     * the text of first page button
     **/
    firstPageText: string;
    /**
     * the text of previous page button
     **/
    prePageText: string;
    /**
     * the text of next page button
     **/
    nextPageText: string;
    /**
     * the text of last page button
     **/
    lastPageText: string;
    /**
     * the title of next page button
     **/
    nextPageTitle: string;
    /**
     * the title of previous page button
     **/
    prePageTitle: string;
    /**
     * the title of first page button
     **/
    firstPageTitle: string;
    /**
     * the title of last page button
     **/
    lastPageTitle: string;
    /**
     * hide the size per page dropdown
     **/
    hideSizePerPage: boolean;
    /**
     * hide pagination bar when only one page, default is false
     **/
    hidePageListOnlyOnePage: boolean;
    /**
     * callback function when page was changing
     **/
    onPageChange: (page: number, sizePerPage: number) => void;
    /**
     * callback function when page size was changing
     **/
    onSizePerPageChange: (page: number, sizePerPage: number) => void;
    /**
     * custom the pagination total
     **/
    paginationTotalRenderer: (from: number, to: number, size: number) => JSX.Element;
}>;

export interface SelectRowProps<T> {
    mode: RowSelectionType;
    clickToSelect?: boolean;
    clickToExpand?: boolean;
    clickToEdit?: boolean;
    hideSelectAll?: boolean;
    onSelect?: (row: T, isSelected: boolean, rowIndex: number, e: SyntheticEvent) => void | boolean;
    /**
     * This callback function will be called when select/unselect all and it only work when you configure selectRow.mode as checkbox.
     */
    onSelectAll?: (isSelect: boolean, rows: T[], e: React.SyntheticEvent) => void | number[];
    style?: ((row: T, rowIndex: number) => CSSProperties | undefined) | CSSProperties;
    classes?: ((row: T, rowIndex: number) => string | undefined) | string;
    nonSelectable?: number[];
    nonSelectableStyle?: ((row: T, rowIndex: number) => CSSProperties | undefined) | CSSProperties;
    nonSelectableClasses?: ((row: T, rowIndex: number) => string | undefined) | string;
    bgColor?: string;
    hideSelectColumn?: boolean;
    selectionRenderer?: ReactElement<{ mode: string; checked: boolean; disabled: boolean }>;
    selectionHeaderRenderer?: ReactElement<{ mode: string; checked: boolean; indeterminate: boolean }>;
    headerColumnStyle?: ((status: TableCheckboxStatus) => CSSProperties | undefined) | CSSProperties;
    selectColumnStyle?:
        | ((props: {
              checked: boolean;
              disabled: boolean;
              rowIndex: number;
              rowKey: string;
          }) => CSSProperties | undefined)
        | CSSProperties;
    selectColumnPosition?: 'left' | 'right';
}

export interface BootstrapTableProps<T extends object = any> {
    /**
     * Tells react-bootstrap-table2 which column is unique.
     */
    keyField: string;
    /**
     *  Provides data for your table. It accepts a single Array object.
     */
    data: T[];
    columns: Array<ColumnDescription<T>>;
    bootstrap4?: boolean;
    remote?: boolean | Partial<{ pagination: boolean; filter: boolean; sort: boolean; cellEdit: boolean }>;
    noDataIndication?: () => JSX.Element | JSX.Element;
    striped?: boolean;
    bordered?: boolean;
    hover?: boolean;
    tabIndexCell?: boolean;
    id?: string;
    classes?: string;
    headerClasses?: string;
    bodyClasses?: string;
    wrapperClasses?: string;
    headerWrapperClasses?: string;
    condensed?: boolean;
    /**
     * Same as HTML caption tag, you can set it as String or a React JSX.
     */
    caption?: JSX.Element | string;
    pagination?: { options?: PaginationOptions };
    filter?: unknown;
    cellEdit?: any;
    selectRow?: SelectRowProps<T>;
    expandRow?: ExpandRowProps<T>;
    parentClassName?: string | ((isExpand: boolean, row: T, rowIndex: number) => string);
    rowStyle?: ((row: T, rowIndex: number) => CSSProperties) | CSSProperties;
    rowEvents?: RowEventHandlerProps<T>;
    rowClasses?: ((row: T, rowIndex: number) => string) | string;
    filtersClasses?: string;
    filterPosition?: FilterPosition;
    footerClasses?: string;
    defaultSorted?: [{ dataField: string; order: SortOrder }];
    sort?: {
        dataField?: string;
        order: SortOrder;
        sortFunc?: any;
        sortCaret?: any;
    };
    defaultSortDirection?: SortOrder;
    overlay?: any;
    onTableChange?: TableChangeHandler<T>;
    onSort?: any;
    onFilter?: any;
    onExternalFilter?: any;
    /**
     * This callback function will be called only when data size change by search/filter etc.
     */
    onDataSizeChange?: (props: { dataSize: number }) => void;
    search?: SearchProps<T>;
}

declare class BootstrapTable<T extends object = any> extends Component<BootstrapTableProps<T>> {}
export default BootstrapTable;

/**
 * Search props
 *
 * Consult [documentation](https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/search-props.html)
 */
export interface SearchProps<T> {
    searchText?: string;
    defaultSearch?: string;
    /* custom search method, return true if matched and false if not */
    onColumnMatch?: (searchProps: { searchText: string; value: any; column: any; row: T }) => boolean;
}

export interface ExpandColumnRendererProps {
    expanded: boolean;
    rowKey: string;
    expandable: boolean;
}

export interface ExpandHeaderColumnRenderer {
    isAnyExpands: boolean;
}

export interface ExpandRowProps<T> {
    renderer: (row: T, rowIndex: number) => JSX.Element;
    expanded?: Array<number>;
    onExpand?: (row: T, isExpand: boolean, rowIndex: number, e: SyntheticEvent) => void;
    onExpandAll: (isExpandAll: boolean, results: Array<number>, e: SyntheticEvent) => void;
    nonExpandable: Array<number>;
    showExpandColumn?: boolean;
    onlyOneExpanding?: boolean;
    expandByColumnOnly?: boolean;
    expandColumnRenderer: ReactElement<ExpandColumnRendererProps>;
    expandHeaderColumnRenderer: ReactElement<ExpandHeaderColumnRenderer>;
    expandColumnPosition: 'left' | 'right';
    className: string | ((isExpand: boolean, row: T, rowIndex: number) => string);
}

export type TableColumnFilterProps<FT = any, T extends object = any> = Partial<{
    id: string;
    /**
     *  custom the input placeholder
     */
    placeholder: string;
    /**
     *  custom classname on input
     */
    className: string;
    /**
     *  default filtering value
     */
    defaultValue: any;

    /**
     *  your custom styles on input
     */
    style: React.CSSProperties;
    /**
     *  how long will trigger filtering after user typing, default is 500 ms
     */
    delay: number;
    /*
     * export filter function to allow users to access filter method externally.
     */
    getFilter: (filter: FT) => void;

    /**
     * Register a listener which will be called when column filter being triggered. If you return an array value, react-bootstrap-table2 will adopt this value as the final filtered result.
     */
    onFilter: (filterValue: FT) => void | Array<T>;
}>;
