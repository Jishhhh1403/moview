const express=require('express')
const {  movie }=require("./DB.js")
const app=express()


app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello")
})

app.get("/user",async function(req,res) {
    try{
        const movies=await movie.find({});
        res.json({
        movies:movies
        })   
    }
    catch(err){
        res.status(400).send("error while getting movies")
    }
})

app.post("/user/add",async function(req,res) {
    try{
        const moviedetail=req.body
        const newmovie=await movie.create({
        title:moviedetail.title,
        release_date:moviedetail.release_date,
        vote_average:moviedetail.vote_average
    })
    res.status(200).send("movie added")
    }
    catch(err){
        res.status(400).send("error while adding movie")
    }
})

app.delete('/movies', async (req, res) => {
    try {
      const movieId = req.body.id; 
  
      if (!movieId) {
        return res.status(400).json({ message: 'Movie ID is required' });
      }
  
      const deletedMovie = await movie.findByIdAndDelete(movieId);
  
      if (!deletedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
  
      res.status(200).json({ message: 'Movie deleted successfully', movie: deletedMovie });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting movie', error: error.message });
    }
  });

app.listen(3000)