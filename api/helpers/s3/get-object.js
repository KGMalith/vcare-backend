module.exports = {


  friendlyName: 'Get object',


  description: '',


  inputs: {
    bucket:{
      type:'string',
      required:true
    },
    file_name:{
      type:'string',
      required:true
    },
    is_expire:{
      type:'ref',
      required:true
    }
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
    const signed_url_expire_seconds = inputs.is_expire? 60 * 10: null;

    try {
      const url = await s3.getSignedUrl('getObject',{
        Bucket: inputs.bucket,
        Key: inputs.file_name,
        Expires:signed_url_expire_seconds
      });
      return exits.success({status:true,data:url});
    } catch (error) {
      console.log(error)
      return exits.success({status:false,message:'URL generation error!'});
    }
  }
};

