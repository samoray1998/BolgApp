const bolgpost=require('../models/BolgPost')
module.exports=async(req,res)=>{
    const blogpost=await bolgpost.findById(req.params.id).populate('userid')
    res.render('post',{
        blogpost
    })
}