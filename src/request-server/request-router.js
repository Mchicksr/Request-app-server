const { json } = require('express')
const express = require('express')
const { serializeSong } = require('./request-service')

const songsRouter = express.Router()
const songsServices = require('./request-service')
const jsonBodyParser = express.json()

songsRouter

    .route('/songs')
   
    .get((req, res, next) => {
        songsServices.getAllSongs(req.app.get('db')
        )
            .then(songs => res.json(songs))
            console.log(res)
    })
    
songsRouter

.route('/:id')
  
    .get((req, res) => {
        
        songsServices.getById(req.app.get('db'))
        
            .then(songs => res.json(songs.id)
            
            )
            
    })
    
songsRouter
    .route('/songs')
    
    .post(jsonBodyParser, (req, res, next) => {
       
        const { name, title, artist, comment  } = req.body
        const newSong = {
            name, title, artist, comment
        }
       
        for (const [key, value] of Object.entries(newSong))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                })

        songsServices.insertSong(
            req.app.get('db'),
            newSong
        )
            .then(song => {
                
                res
                    .status(201)
                    .location('${http://localhost:8000/api/songs/${id}')
                    .json(songsServices.serializeSong(song))

            })
    }
    )

songsRouter
    .route('/songs/:id')
    .all((req, res, next) => {
        const { id } = req.params
        songsServices.getById(req.app.get('db'), id)
        .then(song => {
            res.song = song
            next()
        })
        .catch(next)
    })
    .get((req, res) => {
        res.json(serializeSong(res.song))
    })
    .delete((req, res, next)=>{
        const { id } = req.params
        songsServices.deleteSong(
            req.app.get('db'),
            id
        )
        .then(song => {
            res.status(204).end()
        })
    })

module.exports = songsRouter 
