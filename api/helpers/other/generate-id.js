module.exports = {
  friendlyName: 'Generate id',
  description: '',
  inputs: {
    type:{
      type: 'string',
      required: true,
    }
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: async function (inputs,exits) {
    let newNumber = 0;
    let incrementType = null;
    //get current increment value
    let codeIncrementObj = await CodeIncremental.findOne({type:inputs.type});
    if(codeIncrementObj){
      newNumber = ++codeIncrementObj.generated_id;
      incrementType = codeIncrementObj.type;
    }else{
      let newCodeIncrementObj = await CodeIncremental.create({type:inputs.type}).fetch();
      newNumber = ++newCodeIncrementObj.generated_id;
      incrementType = newCodeIncrementObj.type;
    }

    //function to return pad value
    function returnPadValue(val) {
      if(val < 10){
        return 8;
      }else if(10 <= val < 100){
        return 7;
      }else if(100 <= val < 1000){
        return 6;
      }else if( 1000 <= val < 10000){
        return 5;
      }else if(10000 <= val <  100000){
        return 4;
      }else if( 100000 <= val < 1000000){
        return 3;
      }else if( 1000000 <= val < 10000000){
        return 2;
      }else if(10000000 <= val < 100000000){
        return 1;
      }
      else {
        return 0;
      }
    }

    let padValue = returnPadValue(newNumber);

    //make current number to string
    let stringNumber = newNumber.toString();

    //convert number
    let convertedNumber = stringNumber.padStart(padValue,0);

    //adding type before converted number
    let generatedId = incrementType+' : '+convertedNumber;

    //update increment value
    await CodeIncremental.updateOne({type:inputs.type}).set({
      generated_id:newNumber
    });

    return exits.success(generatedId);

  }


};

