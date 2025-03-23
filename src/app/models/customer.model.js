require('dotenv').config();
const axios = require('axios');

const CLIENT_APP_ID = process.env.MONGODB_CLIENT_APP_ID; 
const API_KEY = process.env.MONGODB_API_KEY;

let requestData = {
  "collection": "employees",
  "database": "PHONES_STORE_MANAGER_NODEJS",
  "dataSource": "Cluster0",
};

const CustomerModel = {
     // Get all employee
  getCustomers: async () => {
    try {
      // API 
      const apiUrl = `https://data.mongodb-api.com/app/${CLIENT_APP_ID}/endpoint/data/v1/action/find`;  

      // Add filter
      requestData.filter = {}

      const config = {
        method: 'post',
        url: apiUrl,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': API_KEY,
        },
        data: JSON.stringify(requestData)
      };

      // get data from api
      const response = await axios(config);
        return (response.data.documents);
      
    } catch (error) {
      throw error;
    }
  },
  // Create customer
  createCustomer: async (customer) => {
    try {
      // API 
      const apiUrl = `https://data.mongodb-api.com/app/${CLIENT_APP_ID}/endpoint/data/v1/action/insertOne`;

      const {
        customer_name,
        customer_phone,
        customer_email,
        created_at
        
        } = customer
      
      requestData.document= {
        customer_name,
        customer_phone,
        customer_email,
        created_at
      }

      const config = {
        method: 'post',
        url: apiUrl,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': API_KEY,
        },
        data: JSON.stringify(requestData)
      };

      // get data from api
      const response = await axios(config);
        return (response.data);

    } catch (error) {
      throw error;
    }
  }
}

module.exports = CustomerModel;
