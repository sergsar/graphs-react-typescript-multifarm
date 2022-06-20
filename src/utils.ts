import {ChartValue, ResponseDataItem, TvlStakedHistoryItem} from "./types";
import {format, isValid} from 'date-fns'
import millify from "millify";

export function getTvl(data: ResponseDataItem): ChartValue[] {
    return data.selected_farm[0].tvlStakedHistory.map((item: TvlStakedHistoryItem) => ({
        date: convertDate(item.date),
        value: item.value,
    }));
}

export function getApr(data: ResponseDataItem): ChartValue[] {
    return getTvl(data).map((item: ChartValue, index: number) => ({
        ...item,
        value: 5 * index,
    }));
}

export function parseValueByType(value: number, type: 'tvl'|'apr') {
    if (type === 'tvl') {
        return millify(value);
    }
    if (type === 'apr') {
        return `${value}%`;
    }
    return value;
}

function convertDate(value: string): string {
    const date = new Date(value);
    if (!isValid(date)) {
        return value;
    }

    return format(date, 'MMM dd');
}
