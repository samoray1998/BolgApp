const bolgpost=require('../models/BolgPost')
module.exports=async(req,res)=>{
    console.log(req.session)
    const bolgPosts = await bolgpost.find({}).populate('userid')
    res.render('index', {
        bolgPosts
    });
}