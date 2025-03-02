import type {FC} from 'react';
import React, {useState, useMemo, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import {Button, Container, Typography} from '@mui/material';
import type {SessionMetadata} from '../https/types';
import {Chart, registerables} from 'chart.js';
import {HoverButton} from './HoverButton';
Chart.register(...registerables);

export const ChartWithDateFilter: FC<ChartWithDateFilterProps> = ({data}) => {
    const [range, setRange] = useState(7);
    const dateData: Record<string, number> = {};
    const [sortedData, setSortedData] = useState<Record<string, number>>();

    // Filter data based on selected range
    const filteredData = useMemo(() => {
        const now = new Date();
        const cutoff = new Date();
        cutoff.setDate(now.getDate() - range);
        console.log(`cutoff is now ${cutoff}`);

        return data.filter((d) => {
            const result = new Date(d.stopTimestamp!) >= cutoff;
            return result;
        });
    }, [range]);

    useEffect(() => {
        console.log('getting new sorted data');
        filteredData.forEach((d) => {
            const date = d.stopTimestamp!.slice(0, 10);
            Object.hasOwnProperty.call(dateData, date) ? dateData[date] += 1 : dateData[date] = 1;
        });

        const result = Object.keys(dateData)
            .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
            .reduce((acc: Record<string, number>, key: string) => {
                acc[key] = dateData[key];
                return acc;
            }, {});
        setSortedData(result);
    }, [filteredData]);

    const chartData = {
        datasets: [
            {
                label          : 'Dates',
                data           : sortedData,
                backgroundColor: 'orange',
                tension        : 0.3,
                fill           : true,
            },
        ],
    };

    return (
        <Container>
            <HoverButton buttonProps={{onClick: () => setRange(3)}} text={'Last 3 Days'} />
            <HoverButton buttonProps={{onClick: () => setRange(7)}} text={'Last 7 Days'} />
            <HoverButton buttonProps={{onClick: () => setRange(10)}} text={'Last 10 Days'} />
            <Bar
                data={chartData}
                options={{
                    scales: {
                        y: {
                            grid: {
                                color: '#FFFFFF',
                            },
                            ticks: {
                                color: 'white',
                            },
                        },
                        x: {
                            grid: {
                                color: '#FFFFFF',
                            },
                            ticks: {
                                color: 'white',
                            },
                        },
                    },
                }}
            />
        </Container>
    );
};

interface ChartWithDateFilterProps {
    data: SessionMetadata[]
}
