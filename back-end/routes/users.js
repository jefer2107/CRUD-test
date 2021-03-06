let NeDb = require("nedb")
let db = new NeDb({
    filename:"users.db",
    autoload:true
})

module.exports = (app)=>{

    let routes = app.route("/users")

    routes.get((req,res)=>{

        db.find({}).sort({name:1}).exec((err,use)=>{

            if(err){
    
                app.utils.error.send(err,req,res)
    
            }else{
    
                res.json(use)
            }
        })
    
    })

    routes.post((req,res)=>{
        req.assert("nome","Prescisa preencer os campos").notEmpty()
        req.assert("email","Email inválido").notEmpty().isEmail()
        req.assert("senha","Senha nao preenchida").notEmpty()

        const errors = req.validationErrors()

        if(errors){

            app.utils.error.send(errors,req,res)
            return false

        }

        db.insert(req.body,(err,use)=>{

            if(err){

                app.utils.error.send(err,req,res)

            }else{

                res.json({...use, senha: ''})
            }
        })
    })

    let routesId = app.route("/users/:id")

    routesId.get((req,res)=>{

        db.findOne({_id:req.params.id}).exec((err,use)=>{

            if(err){

                app.utils.error.send(err,req,res)

            }else{

                res.status(200).json(use)
            }
        })
    })

    routesId.put((req,res)=>{

        db.update({_id:req.params.id},req.body,(err)=>{

            if(err){

                app.utils.error.send(err,req,res)
            }else{

                res.status(200).json(Object.assign(req.body,req.params))
            }
        })
    })

    routesId.delete((req,res)=>{

        db.remove({_id:req.params.id},{},(err)=>{

            if(err){

                app.utils.error.send(err,req,res)

            }else{

                res.status(200).json(req.params)
            }
        })
    })
}