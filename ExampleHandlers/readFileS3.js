const AWS = require('aws-sdk');
AWS.config.update({ region: 'ap-southeast-1' });
const s3 = new AWS.S3();

module.exports.readS3 = (event, context, callback) => {
    const bucketName = "test-dyna"; //bucket đã được cấp quyền
    const keyName= "test.txt";      //key của file trong bucket (thường là tên file)

    readFile(bucketName, keyName, readFileContent, onError);
};

function readFile(bucketName, filename, onFileContent, onError) {
    const params = { Bucket: bucketName, Key: filename };
    s3.getObject(params, function (err, data) {
        if (!err)
            onFileContent(filename, data.Body.toString());
        else
            console.log(err);
    });
}

function readFileContent(filename, content) {
    console.log(filename, content);
}

function onError(err) {
    console.log('error: ' + err);
}         