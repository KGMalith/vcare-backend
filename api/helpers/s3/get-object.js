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
    AWS.config.update({
      accessKeyId:sails.config.custom.s3_key,
      secretAccessKey:sails.config.custom.s3_secret
    });
    var s3 = new AWS.S3();
    const signed_url_expire_seconds = inputs.is_expire? 60 * 10: null;

    try {
      let respond = await getSignedUrl();
      return exits.success({status:true,data:respond});
    } catch (error) {
      console.log(error);
      return exits.success({status:false,message:'URL generation error!'});
    }

    async function getSignedUrl(){
      return new Promise((resolve,reject) => {
        let params = { Bucket: inputs.bucket, Key: inputs.file_name,Expires:signed_url_expire_seconds };
        s3.getSignedUrl('getObject', params, (err, url) => {
          if (err) {reject(err);}
          resolve(url);
        });
      });
    }
  }
};

