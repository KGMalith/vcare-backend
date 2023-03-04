module.exports = {


  friendlyName: 'Upload employee image',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits) {

    this.req.file('files').upload({
      adapter: require('skipper-s3'),
      key: sails.config.custom.s3_key,
      secret: sails.config.custom.s3_secret,
      bucket: sails.config.custom.s3_bucket,
      dirname: sails.config.custom.employee_images_dir,
    }, (err, filesUploaded) => {
      if (err) {return res.serverError(err);}
      return exits.success({
        status:true,
        fileinfo: filesUploaded
      });
    });
  }


};
