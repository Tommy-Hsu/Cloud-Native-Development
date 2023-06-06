import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 10000,
  duration: '10s',
};
export default function () {
  http.get('http://172.23.0.9:3000');
  sleep(1);
}