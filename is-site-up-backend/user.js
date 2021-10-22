let {mongoose}=require('./connection');

let User = new mongoose.model('User', {
    email: {
        type: String,
    },
    mobileNo: {
        type: Number,
    },
    site: {
        type: String,
        required: true,
        minlength: 1
    }
});

module.exports={User};