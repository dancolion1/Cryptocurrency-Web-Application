import React, {useLayoutEffect,useState} from "react";

import {
    LineChart,
    Line,
    xAxis,
    YAxis,
    Tooltip,
    CarterianGrid,
    Legend,
    ResponsiveContainer,
} from "recharts";
import {useContext} from "react";
import { CryptoContext } from "./../context/CryptoContext";

function CustomTooltip({ payload,label,active,currency="usd"}) {
    if (active&& payload && payload.length > 0) {
        return(
            <div className="custom-tooltip">
                <p className="label text-sm text-cyan">{`${label} : ${new Intl.NumberFormat(
                  "en-IN",
                  {
                    style: "currency",
                    currency: currency,
                    minimumFractionDigits: 5,
                  }  
                ).format(payload[0].value)}`}</p>
            </div>
        );
    }

    return null;
}

const ChartComponent = ({data, currency,type}) => {
    return(
        <ResponsiveContainer height={90%}>
            <LineChart width={400} height={400} data={data}>
                <Line
                type="monotone"
                dataKey={type}
                stroke="#14ffec"
                strokeWidth={"1px"}
                />
                <CarterianGrid stroke ="#323232" />
                <xAxis dataKey="date" hide/>
                <YAxis
           
        </ResponsiveContainer>
    )
}