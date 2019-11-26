'use strict';
const AWS = require("aws-sdk");

AWS.config.update({
  region: "ap-southeast-1",
});
const docClient = new AWS.DynamoDB.DocumentClient()
module.exports.hello = async event => {
  const userID='User#01';
    var params = {
        TableName: 'test_drl',
        KeyConditionExpression: 'SK = :hkey',
        ExpressionAttributeValues: {
            ':hkey': `HK1-2016-2017`,
        },
        Select: 'COUNT',
        IndexName:'GSI1'
    };
  const data = await docClient.query(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        data
      },
      null,
      2
    ),
  };
};
