import { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import StatsCategory from '../../domain/stats_category';

interface StoreCategoriesChartProps {
  statsCategories: StatsCategory[];
}

export default function StoreCategoriesChart({
  statsCategories,
}: StoreCategoriesChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (!context) {
      return;
    }

    const labels = statsCategories.map((stat) => stat.category);
    const datasets = statsCategories.map((stat) => stat.numberOfProducts);

    // eslint-disable-next-line no-new
    new Chart(context, {
      data: {
        labels,
        datasets: [{ data: datasets, hoverBackgroundColor: '#f00' }],
      },
      type: 'polarArea',
    });
  }, []);

  return <canvas ref={canvasRef} />;
}
