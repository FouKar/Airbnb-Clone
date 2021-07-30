const dashboardLoader=(req,res)=>{
    if(req.session.userInfo.type==="Admin"){
        res.render("User/adminDashboard.hbs");
    }
    else{
        res.render("User/dashboard.hbs");
    }
};
module.exports=dashboardLoader;