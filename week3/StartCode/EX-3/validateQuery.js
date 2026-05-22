export function validateQuery(req,res,next){
    const { minCredits, maxCredits } = req.query;
    if(minCredits && isNaN(minCredits)){
        return res.status(400);
    }
    if(maxCredits && isNaN(maxCredits)){
        return res.status(400);
    }
    if(minCredits>maxCredits){
        return res.status(400);
    }
    next();
}