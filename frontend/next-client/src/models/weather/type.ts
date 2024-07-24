export interface WeatherHourly {
	id: number;
	location: string; // 请求经纬度
	description: string; // 预报描述
	precipitation_value_24h: string; // 24h降水量数据
	precipitation_probability_24h: string; // 24h降水概率数据
	temperature_24h: string; // 24h地表2米气温
	apparent_temperature_24h: string; // 24h体感温度
	wind_speed_24h: string; // 24h地表10米风速
	wind_direction_24h: string; // 24h地表10米风向
	humidity_24h: string; // 24h地表2米相对湿度
	cloudrate_24h: string; // 24h云量
	skycon_24h: string; // 24h天气现象
	pressure_24h: string; // 24h地面气压
	visibility_24h: string; // 24h地表水平能见度
	dswrf_24h: string; // 24h向下短波辐射通量
	aqi_24h: string; // 24h国标AQI
	pm25_24h: string; // 24h PM2.5浓度
	primary: number; // 主要预报
	forecast_keypoint: string; // 预报关键点
	created_at: string;
}

export interface WeatherMinutely {
	id: number;
	location: string; // 请求经纬度
	precipitation_2h: string; // 未来2小时每分钟的雷达降水强度
	precipitation: string; // 未来1小时每分钟的雷达降水强度
	probability: string; // 未来两小时每半小时的降水概率
	description: string; // 预报描述
	primary: number; // 主要预报
	forecast_keypoint: string; // 预报关键点
	created_at: string;
}
