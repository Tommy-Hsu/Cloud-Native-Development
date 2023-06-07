const request = require('supertest');
const mongoose = require('mongoose');
const appServer = require('./app');
const Group = require('./models/groups.model');


beforeAll(async () => {
    let db = await mongoose.connect(process.env.MONGODB_URL);
});
  
afterAll(async () => {
    await mongoose.connection.close();
    await appServer.close();
});

describe('GET /all-events', () => {
    test('should return all events', async () => {
        const response = await request(appServer).get('/all-events');
        console.log(response.body);
        expect(response.status).toBe(200);
   });
  
    test('should handle error if query fails', async () => {
        const errorMessage = 'Database error';
        const spy = jest.spyOn(Group, 'find').mockRejectedValue(errorMessage);
  
        const response = await request(appServer).get('/all-events');
        expect(response.status).toBe(400);
        expect(response.body).toEqual('Error: ' + errorMessage);
        spy.mockRestore();
    });
});

describe('GET /event-search', () => {

    test('should handle error if query fails', async () => {
        const errorMessage = 'does not exist';
        const spy = jest.spyOn(Group, 'find').mockRejectedValue(errorMessage);
        const response = await request(appServer).get('/event-search')
        .query({ type: 'Type 1', title: 'Event', category: 'Category 1' });
        expect(response.status).toBe(400);
        expect(response.body).toEqual('Error: ' + errorMessage);
        spy.mockRestore();
    });

    test('should find event exit', async () => {
        const response = await request(appServer).get('/event-search')
        .query({ type: 0, title: 'Test-Group-title'});
        console.log(response.body);
        expect(response.status).toBe(200);
    });

    test('no matter what groups', async () => {
        const response = await request(appServer).get('/event-search')
        console.log(response.body);
        expect(response.status).toBe(200);
    });
 });

 // 應該將 get event-search error 改為一班搜尋
 // 應該將 get event-search 202 應該測試先放入資料 再去刪除
