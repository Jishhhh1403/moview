const mongoose=require ("mongoose")
const DB_CONNECT=import.meta.env.DB_URL

mongoose.connect(DB_CONNECT)


const movschema=mongoose.Schema({
    title: String,
    release_date: String,
    vote_average : String
})

const movie=mongoose.model("movies",movschema);

module.exports={
    movie
}