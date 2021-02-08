import * as dotenv from 'dotenv';

dotenv.config();

export const ACCESS = {
  ORIGIN: (process.env.ACCESS_ORIGIN || '').split('|'),
};

export const WX = {
  APPID: process.env.WX_APPID,
  SECRET: process.env.WX_SECRET,
};
export const JWT = {
  SECRET: process.env.JWT_SECRET,
  CHAPTOR: process.env.JWT_CHAPTOR || 'chaptor',
};

export const REDIS = {};

export const MYSQL = {
  TYPE: (process.env.MYSQL_TYPE as any) || 'mysql',
  HOST: process.env.MYSQL_HOST || 'localhost',
  PORT: +(process.env.MYSQL_PORT || '3306'),
  USERNAME: process.env.MYSQL_USERNAME,
  PASSWORD: process.env.MYSQL_PASSWORD,
  DATABASE: process.env.MYSQL_DATABASE,
};

console.log('init env:', {
  ACCESS,
  WX,
  JWT,
  REDIS,
  MYSQL,
});
