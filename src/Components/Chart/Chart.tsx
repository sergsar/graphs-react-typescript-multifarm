import React, {CSSProperties, FC, useEffect, useRef, useState} from 'react';
import {ChartItem, ChartValue} from "../../types";
import styled from "@emotion/styled";
import { Line } from "react-chartjs-2";
import {parseValueByType} from "../../utils";

interface ChartProps {
    chart: ChartItem
}

const backgroundColor = 'rgb(45, 51, 85)';

const ChartWrapper = styled.div`
  max-width: 700px;
  margin: 25px;

  border-radius: 10px;
  overflow: hidden;
  background-color: ${backgroundColor};
`;

const getOptions = (chart?: ChartItem) => ({
    spanGaps: 1000 * 60 * 60 * 24 * 2,
    plugins: {
        title: {
            display: true,
            text: chart?.name ? `Asset ${chart?.name}` : '',
            color: 'white',
        },
        legend: {
            display: false,
        },
    },
    maintainAspectRatio: false,
    elements: {
        point: {
            radius: 0
        }
    },
    scales: {
        xAxes: {
            grid: {
                color: 'rgba(120, 126, 171, 0.1)'
            },
            ticks: {
                autoSkip: true,
                maxRotation: 0,
                minRotation: 0,
                maxTicksLimit: 10,
                color: 'white',
            }
        },
        yAxes: {
            grid: {
                color: 'rgba(120, 126, 171, 0.1)'
            },
            ticks: {
                callback: chart ? (value: any) => parseValueByType(value, chart.type) : null,
                color: 'white',
            },
        },
    },
});

const chartStyle: CSSProperties = {
    width: "100vw",
    height: "50vh",
    margin: "25px",
    backgroundColor: backgroundColor,
};

const Chart: FC<ChartProps> = ({
    chart
}) => {
    const chartRef = useRef(null);
    const [data, setData] = useState<any>({labels: [], datasets: []});
    const [options, setOptions] = useState<any>(getOptions());

    useEffect(() => {
        console.log('chart ref: ', chartRef);
        if (!chartRef?.current) {
            return;
        }
        const ctx = (chartRef.current as any)?.ctx;
        console.log('context: ', ctx);

        const data = generateChartData();

        const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradient.addColorStop(0, 'rgba(55,87,129, 0.1)');
        gradient.addColorStop(1, 'rgba(55,87,129, 1)');

        data.datasets.forEach((dataset: any) => dataset.backgroundColor = gradient);

        // optionsInitial.scales.yAxes.ticks.callback = (value) => parseValueByType(value, chart.type);
        setOptions(getOptions(chart));
        setData(data);

    }, [chartRef]);

    const generateChartData = () => {

        const data: number[] = [];
        const labels: string[] = [];

        chart.values.forEach((value) => {
            data.push(value.value);
            labels.push(value.date);
        });
        return {
            labels,
            datasets: [
                {
                    data,
                    borderWidth: 2,
                    backgroundColor: 'black',
                    borderColor: 'rgba(55,87,129, 1)',
                    fill: 'start',
                    cubicInterpolationMode: 'monotone'
                },
            ],
        };
    };
    return (
        <ChartWrapper>
            <Line style={chartStyle} options={options} data={data} ref={chartRef}/>
        </ChartWrapper>
    );
};

export default Chart;
