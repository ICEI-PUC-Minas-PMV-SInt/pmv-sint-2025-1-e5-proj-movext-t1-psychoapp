import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JSON_SECRET

const auth = (req, res, next) =>{

    const tokenInformado = req.headers.authorization

    if(!tokenInformado)
        res.status(401).json({message: "Acesso negado."})

    try{

        const decoded = jwt.verify(tokenInformado.replace('Bearer ',''), JWT_SECRET)
        console.log(decoded)

        next()


    }catch{
        res.status(401).json({message: "Acesso negado."})
    }

}

export default auth