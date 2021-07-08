var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: { //New code- method of reference to look to username
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});



module.exports = mongoose.model("Comment",commentSchema);