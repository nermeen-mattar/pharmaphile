import Vue from 'vue';

/* eslint-disable */ 

export default {
    getRate(currentRate, numOfCurrentReviews, newRate) {
        currentRate = currentRate || 0;
        return (currentRate * numOfCurrentReviews + newRate)/(numOfCurrentReviews + 1);
      },  
    validateForm(formValue) {
        debugger;
        const keyNames = Object.keys(formValue);
        for(let i=0; i<keyNames.length; i++ ) {
            const value = formValue[keyNames[i]];
            if(value === undefined || value === null || value === '') {
              Vue.$toast.error('You must fill in all the fields');
              return false;
            }
        }
        if (formValue.password !== formValue.confirmPassword) {
            Vue.$toast.error('Password not matched!');
            return false;
        }
        return true;
    },
}