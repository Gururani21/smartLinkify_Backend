class ResponseData<T>{

public status: string;
public data: T;



  constructor(status: string, data: T) {
    this.status = status;
    this.data = data;
  }

}

export class PaginatedResponse<T>{

    public status: string;
    public data: T;
    public pageSize: Number
    public pageNumber: Number
    
    
    
      constructor(status: string, data: T, pageSize: Number, pageNumber:Number) {
        this.status = status;
        this.data = data;
        this.pageSize= pageSize;
        this.pageNumber = pageNumber;


      }
    
    }


    export class ErrorResponse{
        public errormsg: string;
        public  status:string;
        constructor(status: string,msg :string ) {
            this.status = status;
            this.errormsg = msg;
         
    
    
          }
        
    }


export default ResponseData