
  interface Book {
    id:string,
    author:string,
    title:string,
    subTitle:string,
    imageLink:string,
    audioLink:string,
    totalRating:number,
    averageRating:number,
    keyIdeas:number,
    type:string,
    status:string,
    subscriptionRequired:boolean,
    summary:string,
    tags:[string],
    bookDescription:string,
    authorDescription:string,
    bookDuration:string
  }

  interface User {
    email:string,
    password:string,
    savedBooks:string[],
    finishedBooks:string[],
    premium:boolean
}