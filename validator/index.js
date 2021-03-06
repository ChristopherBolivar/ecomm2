exports.userSignupValidator = (req,res, next) =>{
    req.check('name', 'Name is required').notEmpty()
    req.check('email', 'Email is required').notEmpty()
    req.check('email')
        .matches(/.+\@.+\..+/)
        .withMessage('Email Must contain @')
        .isLength({
            min:4,
            max:32
        })
        req.check('password', 'Password is required').notEmpty()
        req.check('password')
        .isLength({min:6})
        .withMessage("Password must contain atleast 8 charaters")
        .matches(/\d/)
            .withMessage("Password must contain a number")
            const errors = req.validationErrors()
            if(errors){
             const firstError = errors.map(error => error.msg)
             return res.status(400).json({error:firstError})
            }
            next();
}