module.exports = {


  friendlyName: 'Send email',


  description: '',


  inputs: {
    receiver_email:{
      type:'string',
      required:true
    },
    receiver_name:{
      type:'string',
      required:true
    },
    template_id:{
      type:'number',
      required:true
    },
    params:{
      type:'ref'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {
    var SibApiV3Sdk = require('sib-api-v3-sdk');
    var defaultClient = SibApiV3Sdk.ApiClient.instance;

    // Configure API key authorization: api-key
    var apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = sails.config.custom.sendinblueSecret;

    try {
      var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
      var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

      sendSmtpEmail = {
        to: [{
          email: inputs.receiver_email,
          name: inputs.receiver_name
        }],
        templateId: inputs.template_id,
        params: {
          ...inputs.params
        }
      };

      await apiInstance.sendTransacEmail(sendSmtpEmail);

      return exits.success({
        status:true
      });

    } catch (error) {
      return exits.success({
        status:false,
        message:error
      });
    }
  }

};

