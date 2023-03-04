module.exports = {


  friendlyName: 'Edit employee',


  description: '',


  inputs: {
    id:{
      type:'number',
      required:true
    },
    user_id:{
      type:'number',
      required:true
    },
    is_user_account_exists:{
      type:'ref',
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
      type:'ref',
      required:true
    },
    end_date:{
      type:'ref',
    },
    birthday:{
      type:'ref',
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
    otherError:{
      responseType: 'HandleError'
    }
  },


  fn: async function (inputs,exits) {

    //check id is valid
    let employee_obj = await Employee.findOne({id:inputs.id});

    if(!employee_obj){
      return exits.notFound({
        status:false,
        message:'Invalid employee id'
      });
    }

    //check employee exists for user
    let is_exists = await Employee.findOne({user_id:inputs.user_id,id:{'!=':inputs.id}});

    if(is_exists){
      return exits.otherError({
        status:false,
        message:'Employee profile already exists for selected user'
      });
    }

    //check nic taken
    let is_nic_exists = await Employee.findOne({nic:inputs.nic,id:{'!=':inputs.id}});

    if(is_nic_exists){
      return exits.otherError({
        status:false,
        message:'Employee nic already taken'
      });
    }

    //check email taken
    let is_email_exists = await Employee.findOne({email:inputs.email,id:{'!=':inputs.id}});

    if(is_email_exists){
      return exits.otherError({
        status:false,
        message:'Employee email already taken'
      });
    }

    let hired_d = sails.moment(inputs.hired_date).utc().format('YYYY-MM-DD HH:mm:ss');
    let end_d = null;
    if(inputs.end_date){
      end_d = sails.moment(inputs.end_date).utc().format('YYYY-MM-DD HH:mm:ss');
    }
    let birth_d = sails.moment(inputs.birthday).utc().format('YYYY-MM-DD HH:mm:ss');

    //update user
    await Employee.updateOne({id:inputs.id}).set({
      user_id:inputs.user_id,
      is_user_account_exists:inputs.is_user_account_exists?1:0,
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
      message:'Employee updated successfully!'
    });
  }
};
