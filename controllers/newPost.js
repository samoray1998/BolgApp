module.exports=(req,res)=>{
    let username=""
    let password=""
    const data=req.flash('data')[0];
    if (typeof data != "undefined") {
        username=data.username,
        password=data.password
        
    }

    if (req.session.userId) {
        console.log(req.flash('validationErrors') + 'fuck off')
        res.render('create', {
            createPost: true,
            errors: req.session.validationErrors,
        })
   }else
   res.redirect('/auth/login')
}