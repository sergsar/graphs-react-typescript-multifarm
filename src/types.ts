

export type ResponseData = { data: ResponseDataItem[] };

export type ResponseDataItem = {
    assetId: string;
    selected_farm: SelectedFarm[];
};

export type SelectedFarm = {
    tvlStakedHistory: TvlStakedHistoryItem[];
}

export type TvlStakedHistoryItem = {
    date: string,
    value: number,
}

export type ChartItem = {
    type: 'apr'|'tvl';
    name: string;
    values: ChartValue[];
}

export type ChartsItem = {
    assetId: string;
    apr: ChartItem;
    tvl: ChartItem;
}

export type ChartValue = {
    date: string,
    value: number,
}
