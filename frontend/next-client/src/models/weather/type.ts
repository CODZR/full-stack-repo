export interface WeatherHourly {
	id: number;
	location: string; // 请求经纬度
	description: string; // 预报描述
	firstHourDatetime: string; // 48h第一个h的时间
	precipitationValueIn48h: string; // 48h降水量数据
	precipitationProbabilityIn48h: string; // 48h降水概率数据
	temperatureIn48h: string; // 48h地表2米气温
	apparentTemperatureIn48h: string; // 48h体感温度
	windSpeedIn48h: string; // 48h地表10米风速
	windDirectionIn48h: string; // 48h地表10米风向
	humidityIn48h: string; // 48h地表2米相对湿度
	cloudrateIn48h: string; // 48h云量
	skyconIn48h: string; // 48h天气现象
	pressureIn48h: string; // 48h地面气压
	visibilityIn48h: string; // 48h地表水平能见度
	dswrfIn48h: string; // 48h向下短波辐射通量
	aqiIn48h: string; // 48h国标AQI
	pm25In48h: string; // 48h PM2.5浓度
	primary: number; // 主要预报
	forecastKeypoint: string; // 预报关键点
	createdAt: string;
}

export interface WeatherMinutely {
	id: number;
	location: string; // 请求经纬度
	precipitationIn2h: string[]; // 未来2小时每分钟的雷达降水强度
	precipitation: string[]; // 未来1小时每分钟的雷达降水强度
	probability: string; // 未来两小时每半小时的降水概率
	description: string; // 预报描述
	primary: number; // 主要预报
	forecastKeypoint: string; // 预报关键点
	createdAt: string;
}
