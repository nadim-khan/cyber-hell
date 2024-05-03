export interface UserRegistation  {
        userId?: number;
        firstName: string,
        middleName?: string,
        lastName?: string,
        mobileNo: string,
        emailId: string,
        altMobileNo?: string,
        password: string,
        userAddress?: {
          city: string,
          state: string,
          pincode: string,
          addressLine: string
        },
        userSocialDetails?: {
          facebookProfileUrl: string,
          linkdinProfileUrl: string,
          instagramHandle: string,
          twitterHandle: string
        }
      
}

export interface User {
  [x: string]: any;
  token: string;
  user: {
    username: string;
    email: string;
    mobile:number;
    password: string;
    re_password?: string;
  };
}

export interface AllUsers {
  _id: string;
  index: number;
  username: string;
  mobile:number;
  email: string;
  colcreatedAt: string;
  hashedPassword: string;
}