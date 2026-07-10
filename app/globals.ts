
  export interface Book {
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

  export interface User {
    email:string,
    password:string,
    savedBooks:string[],
    finishedBooks:string[],
    plan:string
  }

  export function getAudioDuration(url:string): Promise<string> {
    return new Promise((resolve) => {
      const audio = new Audio()
      audio.src = url
      audio.preload = "metadata"

      const loadedMetadata = () => {
        const minutes = Math.floor(audio.duration/60)
        const seconds = Math.floor(audio.duration%60)
        audio.removeEventListener('loadedmetadata', loadedMetadata);
        resolve(`${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`)
      }

      audio.addEventListener('loadedmetadata', loadedMetadata);
    })
  }