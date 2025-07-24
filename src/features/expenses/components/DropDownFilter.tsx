import React from "react";
import './DropDownFilter.css';

interface DropdownFilterProps {
    year: string | number;
    month: string | number;
    onYearChange: (year: number) => void;
    onMonthChange: (month: number) => void;
    years: Array<string | number>;
    months: string[];
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
    year,
    month,
    onYearChange,
    onMonthChange,
    years,
    months,
}) => {
    return (
        <div className="dropDownContainer">
            <label>
                Year:&nbsp;
                <select value={year} onChange={e => onYearChange(Number(e.target.value))}>
                    {years.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </label>
            &nbsp;&nbsp;
            <label>
                Month:&nbsp;
                <select value={month} onChange={e => onMonthChange(Number(e.target.value))}>
                    {months.map((m, idx) => (
                        <option key={m} value={idx}>{m}</option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default DropdownFilter;