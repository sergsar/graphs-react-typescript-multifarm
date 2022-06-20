import React, {FC, useEffect, useState} from 'react';
import './App.css';
import { Global, css } from "@emotion/react";
import {ChartsItem, ResponseData, ResponseDataItem} from "./types";
import Charts from './Components/Charts/Charts';
import {getApr, getTvl} from "./utils";
import Chart from "chart.js/auto";
import {CategoryScale, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const App: FC = () => {
    const [data, setData] = useState<ResponseData | undefined>(undefined);
    const [charts, setCharts] = useState<ChartsItem[]>([]);

    const fetchData = async () => {
        const result = await fetch("https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000");
        const data: ResponseData = await result.json();

        setData(data);
        console.log('data: ', data);

        const filteredItems = data.data.filter((item: ResponseDataItem, index: number) => index === Math.floor(data.data.length / 2));
        console.log('filteredItems: ', filteredItems);
        const charts: ChartsItem[] = filteredItems.map((item: ResponseDataItem) => {
            return {
                assetId: item.assetId,
                apr: { type: 'apr', name: 'APR', values: getApr(item) },
                tvl: { type: 'tvl', name: 'TVL', values: getTvl(item) },
            }
        });
        setCharts(charts);
        console.log('charts: ', charts);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
          <Global
              styles={css`
              body {
                background-color: #232842;
                color: #7d7d7d;
              }
            `}
          />
        {data ? (
           <>
               {charts.map((item: ChartsItem) =>
                        <Charts key={item.assetId} item={item} />
                )}
           </>
        ) : (
            "Loading..."
        )}
        </div>
    );
}

export default App;
