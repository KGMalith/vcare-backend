module.exports = {


  friendlyName: 'Create employee',


  description: '',


  inputs: {
    user_id:{
      type:'number',
      allowNull:true
    },
    is_user_account_exists:{
      type:'boolean',
      required:true
    },
    first_name:{
      type:'string',
      required:true
    },
    last_name:{
      type:'string',
      required:true
    },
    email:{
      type:'string',
      required:true
    },
    nic:{
      type:'string',
      required:true
    },
    hired_date:{
      type:'string',
      required:true
    },
    end_date:{
      type:'string',
    },
    birthday:{
      type:'string',
      required:true
    },
    personal_mobile:{
      type:'string',
      allowNull:true
    },
    bank:{
      type:'string',
      allowNull:true
    },
    bank_branch:{
      type:'string',
      allowNull:true
    },
    bank_account_no:{
      type:'string',
      allowNull:true
    },
    bank_account_name:{
      type:'string',
      allowNull:true
    },
    home_address:{
      type:'string',
      required:true
    },
    employment_type:{
      type:'string',
      required:true
    },
    designation:{
      type:'string',
      allowNull:true
    }
  },


  exits: {
    notFound: {
      responseType: 'notFound'
    },
    handleError:{
      responseType: 'handleError'
    }
  },


  fn: async function (inputs,exits) {
    //check employee exists for user
    let is_exists = await Employee.findOne({user_id:inputs.user_id});

    if(is_exists){
      return exits.handleError({
        status:false,
        message:'Employee profile already exists for selected user'
      });
    }

    //check nic taken
    let is_nic_exists = await Employee.findOne({nic:inputs.nic});

    if(is_nic_exists){
      return exits.handleError({
        status:false,
        message:'Employee nic already taken'
      });
    }

    //check email taken
    let is_email_exists = await Employee.findOne({email:inputs.email});

    if(is_email_exists){
      return exits.handleError({
        status:false,
        message:'Employee email already taken'
      });
    }

    //generate employee code
    let employee_code = await sails.helpers.other.generateId('EMP');

    let hired_d = sails.moment.utc(inputs.hired_date).format('YYYY-MM-DD HH:mm:ss');
    let end_d = null;
    if(inputs.end_date){
      end_d = sails.moment.utc(inputs.end_date).format('YYYY-MM-DD HH:mm:ss');
    }
    let birth_d = sails.moment.utc(inputs.birthday).format('YYYY-MM-DD HH:mm:ss');

    //create employee
    await Employee.create({
      emp_code:employee_code,
      user_id:inputs.user_id,
      is_user_account_exists:inputs.is_user_account_exists?sails.config.custom.user_account_available:sails.config.custom.user_account_not_available,
      first_name:inputs.first_name,
      last_name:inputs.last_name,
      email:inputs.email,
      nic:inputs.nic,
      hired_date:hired_d,
      end_date:end_d,
      birthday:birth_d,
      personal_mobile:inputs.personal_mobile,
      bank:inputs.bank,
      bank_branch:inputs.bank_branch,
      bank_account_no:inputs.bank_account_no,
      bank_account_name:inputs.bank_account_name,
      home_address:inputs.home_address,
      employment_type:inputs.employment_type,
      designation:inputs.designation,
    });

    // All done.
    return exits.success({
      status:true,
      show_message: true,
      message:'Employee created successfully!'
    });

  }
};
