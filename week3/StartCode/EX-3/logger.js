
export function log(res,req,next){
    console.log({
        method: req.method,
        path: req.path,
        query: req.query,
        time: new Date
    });
    next();

}