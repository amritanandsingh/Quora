const Post = require('../models/post');
const User = require('../models/user');

/*
module.exports.home = async function(req, res) {
    try {
        const posts = await Post.find({}).exec();
        return res.render('home', {
            title: 'Quora | Home',
            posts: posts ,
            .sort('-createdAt')
            .populate('user')
                path:'User',
                populate: {
                    path:'name'}
        });
    } catch (err) {
        console.log('Error in finding posts:', err);
        return res.redirect('back');
    }
};
*/
module.exports.home = async function(req, res) {
    try {
      const posts = await Post.find({})
        .sort('-createdAt')
        .populate("user")
        .populate({
          path: 'user',
          populate: {
            path: 'name'
          }
        })
        .exec();
       
      return res.render('home', {
        title: 'Quora | Home',
        posts: posts,
        
      });
    } catch (err) {
      console.log('Error in finding posts:', err);
      return res.redirect('back');
    }
  };
