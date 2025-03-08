 class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
 }
 
 export const errorMiddleware =(err,req,res,next) =>{

    err.message = err.message || "Intern Server Error"; //When User no give error message then show this
    err.statusCode = err.statusCode || 500;
    return res.status(404).json({
        success: true,
        message: err.message,
    });
 };

 export default ErrorHandler;