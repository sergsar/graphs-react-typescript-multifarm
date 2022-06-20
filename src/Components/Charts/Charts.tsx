import React, { FC } from 'react';
import {ChartsItem} from "../../types";
import Chart from "../Chart/Chart";
import styled from "@emotion/styled";


interface Props {
    item: ChartsItem,
}

const direction = window.innerWidth > window.innerHeight ? 'row' : 'column';

const ChartsContent = styled.div`
  display: flex;
  flex-direction: ${direction};
  margin: auto;
`;

const Charts: FC<Props> = ({
    item,
}) => {
    console.log('charts item: ', item)
    return (
        <ChartsContent>
            <Chart chart={item.apr}/>
            <Chart chart={item.tvl}/>
        </ChartsContent>
    );
};

export default Charts;
