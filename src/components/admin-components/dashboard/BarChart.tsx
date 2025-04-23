import { BALANCED_COLORS } from '@/utils/constant';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

type Props = {
    data: number[];
    labels: string[];
};

const formatNumberShort = (value: number): string => {
    const format = (val: number, suffix: string) =>
        Number.isInteger(val) ? `${val} ${suffix}` : `${val.toFixed(1)} ${suffix}`;

    if (value >= 1_000_000_000) return format(value / 1_000_000_000, 'B');
    if (value >= 1_000_000) return format(value / 1_000_000, 'M');
    if (value >= 1_000) return format(value / 1_000, 'K');
    return value.toString();
};

export default function BarChart({ data, labels }: Props) {
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Revenue',
                data,
                backgroundColor: BALANCED_COLORS.slice(0, labels.length),
                barThickness: 20,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value: string | number) {
                        return formatNumberShort(Number(value));
                    },
                    color: '#6B7280', // optional: gray-500
                },
                beginAtZero: true,
            },
            x: {
                categoryPercentage: 0.6,  // default is 0.8
                barPercentage: 0.7,       // default is 0.9
                ticks: {
                    color: '#6B7280',
                },
            },
        },
    };

    return (
        <div className='min-h-[250px] h-[350px] md:h-[300px] w-full flex items-center justify-center'>
            <Bar data={chartData} options={options} />
        </div>
    );
}
