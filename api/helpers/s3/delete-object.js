module.exports = {


  friendlyName: 'Delete object',


  description: '',


  inputs: {
    bucket:{
      type:'string',
      required:true
    },
    dir:{
      type:'string',
      required:true
    },
    file_name:{
      type:'string',
      required:true
    },
  },


  exits: {

    success: {
      outputFriendlyName: 'Object',
    },

  },


  fn: async function (inputs,exits) {

    const AWS = require('aws-sdk');
    var s3 = new AWS.S3();

    AWS.config.update({
      accessKeyId:sails.config.custom.s3_key,
      secretAccessKey:sails.config.custom.s3_secret
    });

    const params = {
      Bucket:inputs.bucket,
      Key:inputs.dir+'/'+inputs.file_name
    };

    try {
      await s3.headObject(params).promise();
      try {
        await s3.deleteObject(params).promise();
        return exits.success({
          status:true,
        });
      } catch (error) {
        return exits.success({
          status:false,
          message:'File could not delete'
        });
      }
    } catch (error) {
      return exits.success({
        status:false,
        message:'File not found'
      });
    }
  }
};

