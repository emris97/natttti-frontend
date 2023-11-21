import type { Chart } from 'chart.js';
import { CanvasHelper } from '$shared/lib/CanvasHelper';
import type { ChartColors as Colors } from '$shared/types/chart';

export class ChartColors {
	chart;
	canvas;
	ctx;

	constructor(chart: Chart) {
		this.chart = chart;
		this.canvas = chart.canvas;
		this.ctx = chart.ctx;
	}

	static getGradient(options: {
		ctx: CanvasRenderingContext2D;
		color: Colors;
		theme?: 'light';
		gradientPosition: Parameters<(typeof CanvasHelper)['createGradient']>[0]['gradientPosition'];
	}) {
		const color = ChartColors.getGradientColor(options.color);
		return CanvasHelper.createGradient({
			ctx: options.ctx,
			colors: [
				{
					rgb: color,
					alpha: options.theme === 'light' ? 0.5 : 1
				},
				{
					rgb: color,
					alpha: 0
				}
			],
			gradientPosition: options.gradientPosition
		});
	}

	static getGradientColor(color: Colors) {
		switch (color) {
			// case 'yellow': return '255, 247, 204'
			case 'green':
				return '113, 224, 202';
			case 'blue':
				return '60, 107, 200';
			// case 'red': return '214, 115, 103'
			// case 'aubergine': return '233, 228, 255'
		}
	}

	static getColor(color: Colors) {
		switch (color) {
			// case 'red': return '203, 79, 64'
			case 'green':
				return '42, 192, 162';
			case 'blue':
				return '46, 85, 163';
			// case 'aubergine': return '91, 76, 159'
			// case 'yellow': return '255, 209, 48'
		}
	}
}
