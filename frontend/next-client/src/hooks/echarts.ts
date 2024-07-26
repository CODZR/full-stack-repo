import { useEffect } from 'react';
import * as echarts from 'echarts/core';

import { useOnceEffect } from './useHooks';

export const useChart = (chartRef, options, rendererType = 'svg' as const) => {
	let myChart = null;

	const renderChart = () => {
		const chart = echarts.getInstanceByDom(chartRef.current);
		if (chart) {
			myChart = chart;
		} else {
			myChart = echarts.init(chartRef.current, null, { renderer: rendererType });
		}
		myChart.setOption(options);
	};

	useEffect(() => {
		renderChart();
		// eslint-disable-next-line @wogns3623/better-exhaustive-deps/exhaustive-deps
	}, [options]);

	useOnceEffect(() => {
		return () => {
			myChart && myChart.dispose();
		};
	});

	return;
};
