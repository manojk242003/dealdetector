"use client"

import { scrapeAndStoreProduct } from "@/lib/actions"
import { FormEvent, useState } from "react"

const isValidAmazonProductLink =(url:string)=>
{
  try {
    const parsedURL = new URL(url)
    const hostname = parsedURL.hostname

    if(hostname.includes('amazon.com') || 
      hostname.includes('amazon.') ||
       hostname.endsWith('amazon'))
    {
      return true;
    }
    else return false
  } catch (error) {
    
  }
}

const Searchbar = () => {
    const [searchPrompt,setSearchPrompt]=useState("")
    const [isLoading,setIsLoading] = useState(false);

    const handleSubmit=async (event : FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      const isValidLink = isValidAmazonProductLink(searchPrompt)
      if(!isValidLink) alert('please provide a valid amazon link ')
       try {
        setIsLoading(true)

        // scrape the product page
        const product = await scrapeAndStoreProduct(searchPrompt)
        

        
       } catch (error) {
        console.log(error)
       }finally{
        setIsLoading(false)
       }
    }
  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
        <input 
        type="text"
        value={searchPrompt}
        onChange={(e)=>setSearchPrompt(e.target.value)}
        placeholder="Enter the product link"
        className="searchbar-input"
        />
        <button  disabled={searchPrompt === ''} type="submit" className="searchbar-btn">
          {isLoading? 'searching ...' : 'Search'}
        </button>

    </form>
  )
}

export default Searchbar