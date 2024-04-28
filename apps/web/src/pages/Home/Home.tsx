import Cards from "@web/components/Home/Cards"
import { Discount } from "@web/components/Home/Discount"


const Home = () => {
  return (
    <div className="container mx-auto py-9 md:py-12 px-4 md:px-6">
        <Discount/>
        <Cards/>
    </div>
  )
}

export default Home