const path = require('path')
const bolgpost=require('../models/BolgPost')

module.exports=(req,res)=>{
    let image = req.files.image;
    
    console.log(req.body)
    // BlogPost.create(req.body,(error,blogPost)=>{
    //     res.redirect('/')
    //     console.log(error,blogPost)

    // })
    image.mv(path.resolve(__dirname,'..','public/img', image.name), async (error) => {

        // await BlogPost.create({req.body,
        //     image: '/img/' + image.name
        // },(error,blogpost) =>{
        //     res.redirect('/')
        //     })
        await bolgpost.create({
            ...req.body,
            image: '/img/' + image.name,
            userid: req.session.userId
        },(err,post)=>{
            console.log(err)
                if (err != null) {
                    const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
                    req.session.validationErrors = validationErrors
                    return  res.redirect('/posts/new')
            }
        })
        res.redirect('/')
    })
}