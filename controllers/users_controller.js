const User = require('../models/user');

// for displaying user profile
module.exports.user=function(req,res){
    
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id)
      .then(user => {
        if (user) {
          return res.render('user',{
              user: user
          });
        } else {
          return res.redirect('back');
        }
      })
      .catch(err => {
        console.log('Error finding user:', err);
        return res.redirect('back');
      });
  } else {
    return res.redirect('/users/sign-in');
  }
}

module.exports.signUp = function(req , res)
{
    return res.render('sign_up');
}


module.exports.signIn = function(req , res)
{
    return res.render('sign_in');
}

// get the sign up data
module.exports.create = async function(req, res) {
    try {
      if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
      }
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        user = await User.create(req.body);
        return res.redirect('/users/sign-in');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.log('Error in signing up:', err);
      return;
    }
  };
  


// get sign in data and create session
module.exports.createSession = async function(req,res){
  try{
      
      let user = await User.findOne({ email: req.body.email });
      if(user)
      {
        if(user.password != req.body.password)
        {
          return res.redirect('back');
        }
        res.cookie('user_id',user.id);
        return res.redirect('/users/profile');
      }
      else{
        return res.redirect('back');
      }
  }
  catch(err)
  {
    console.log('error in create session ');
    return res.redirect('back');
  }
}   
