/**
 * 接口
 * 部署后，往/server发的请求，会转发到9011上
 */
export const API_HOST =
  process.env.NODE_ENV === "development"
    ? `//${window.location.hostname}:9011`
    : `//${window.location.hostname}/server`;
