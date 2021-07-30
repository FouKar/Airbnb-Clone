/*customized middleware module*/
const authorized=(req,res,next)=>{
    if(req.session.userInfo){
        next();
    } else{
        res.redirect("/User/login");
    }
};
module.exports = authorized;