class AppError extends Error {
   public status: number;
  
    constructor(status: number, public readonly message: string | any) {
      super(message);
      this.status = status;
    }
  }
  
  export default AppError;