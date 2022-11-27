

export type ResponseData = { data: ResponseDataItem[] };

export type ResponseDataItem = {
    assetId: string;
    gaugeData: GaugeData;
};

export type GaugeData = {
    tvlStakedHistorical: TvlStakedHistoryItem[];
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
