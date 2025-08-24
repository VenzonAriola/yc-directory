import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import {SearchParams} from "next/dist/server/request/search-params";
import StartupCard from "@/components/StartupCard";


/*searchParams props*/
export default async function Home({searchParams}:{
    searchParams:Promise<{ query?:string }>;
    })  {

    const query=(await searchParams).query;
    const posts =[{
        _createdAt:new Date(),
        views:55,
        author:{_id:1,name:'Vince'},
        _id: 1,
        description: 'This is the description',
        image:'https://as1.ftcdn.net/v2/jpg/05/73/14/38/1000_F_573143889_NVvKlj8AGINKQyT7Pr3tkvCScXShff0F.jpg',
        category: 'Robots',
        title: 'We Robots'

    }]
  return (
    <>
        <section className="pink_container">
            <h1 className="heading">Pitch your startup, <br /> Connect with Entrepeneurs </h1>

            <p className="sub-heading !max-w-3xl">
                Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions
            </p>
            <SearchForm  query={query}/>
        </section>

        <section className="section_container">
            <p className="text-30-semibold">
                {query ? `Search results for "${query}"` : 'All Startups'}
            </p>
            <ul className="nt-7 card_grid">
                {posts?.length > 0 ? (
                    posts.map((post:StartupCardType, index:number ) =>(
                        <StartupCard key={post?._id} post={post} />))
                ):(<p className="no-results">No Startups found</p>)}
            </ul>
        </section>

    </>
  );
}
