
export interface UserResponseWP {
    success: string;
    statusCode: number;
    code: string;
    message: string;
    data: 
    {
      token: string; 
      id: number; 
      email: string; 
      nicename: string; 
      firstName: string; 
      lastName: string; 
      displayName: string
    }
  }